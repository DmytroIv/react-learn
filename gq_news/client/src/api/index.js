import axios from "axios";

axios.defaults.baseURL = '/graphql';
axios.defaults.method = 'POST';
axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('X-AUTH');
axios.defaults.headers.post['Content-Type'] = 'application/json';

export const signupUser = async (userData) => {
  try {
    const {data} = await axios({
      data: {
        query: `mutation {
          signUp(
            fields: {
              email: "${userData.email}"
              password: "${userData.password}"
            }
          ) {
            _id
            email
            token
          }
        }`
      }
    });

    return {
      auth: data.data ? data.data.signUp : null,
      errors: data.errors
    }

  } catch (err) {
    console.error(err);
  }
};

export const loginUser = async (userData) => {
  try {

    const {data} = await axios({
      data: {
        query: `mutation {
          authUser(
            fields: {
              email: "${userData.email}"
              password: "${userData.password}"
            }
          ) {
            _id
            email
            token
          }
        }`
      }
    });

    return {
      auth: data.data ? data.data.authUser : null,
      errors: data.errors
    }

  } catch (err) {
    console.error(err);
  }
};

export const autoSignIn = async () => {
  try {
    const {data} = await axios({
      data: {
        query: `query {
          isAuth {
            _id
            email
            token
          }
        }`
      }
    });

    if (data.errors) localStorage.removeItem('X-AUTH');
    return {
      auth: data.data ? data.data.isAuth : null
    }

  } catch (err) {
    console.error(err);
  }
};

export const updateUserEmailPass = async (email, password, id) => {
  try {
    const {data} = await axios({
      data: {
        query: `mutation {
          updateUserEmailPass(
            email: "${email}"
            password: "${password}"
            _id: "${id}"
          ) {
            _id
            email
            token
          }
        }`
      }
    });

    if (data.errors) {
      return {errors: data.errors};
    } else {
      localStorage.setItem('X-AUTH', data.data.updateUserEmailPass.token);
    }

    return {
      auth: data.data ? data.data.updateUserEmailPass : null
    }
  } catch (err) {
    console.error(err);
  }
};

export const getUserStats = async (id) => {
  try {

    const body = {
      query: `
        query User ($id:ID!, $sort: SortInput) {
          user (id: $id) {
            name
            lastname
            posts(sort: $sort) {
              _id
              title
            }
            categories {
              name
            }
          }
        }
      `,
      variables: {
        id,
        sort: {
          sortBy: "_id",
          order: "desc",
          limit: 3
        }
      }
    }

    const {data} = await axios({
      data: JSON.stringify(body)
    });

    return {
      stats: data.data ? data.data.user : null
    }

  } catch (err) {
    console.error(err);
  }
};

export const getCategories = async (id) => {
  try {

    const body = {
      query: `
        query GetCategories {
          categories {
            _id
            name
          }
        }
      `
    }

    const {data} = await axios({
      data: JSON.stringify(body)
    });

    return {
      categories: data.data ? data.data.categories : null
    }

  } catch (err) {
    console.error(err);
  }
};

export const createPost = async (postData) => {
  try {

    const body = {
      query: `
        mutation CreatePost($fields: PostInput!) {
          createPost(fields: $fields) {
            _id
            title
          }
        }
      `,
      variables: {
        fields: {
          ...postData
        }
      }
    }

    const {data} = await axios({
      data: JSON.stringify(body)
    });

    return {
      createdPost: {
        post: data.data ? data.data.post : null,
        error: data.errors
      }
    }

  } catch (err) {
    console.error(err);
  }
};

export const getUserPosts = async (sort, prevState, userId) => {
  try {
    const body = {
      query: `
        query GetUserPosts($sort: SortInput, $queryBy: QueryByInput){
          posts(sort: $sort, queryBy: $queryBy){
            _id
            title
            status
            categories { name }
          }
        }
      `,
      variables: {
        queryBy: {key: "author", value: userId},
        sort: sort
      }
    };
    const {data} = await axios({data: JSON.stringify(body)});
    let newState;
    let newPosts = data.data ? data.data.posts : null
    if (newPosts) {
      newState = [...prevState, ...newPosts];
    }

    return {
      posts: data.data ? newState : null
    }
  } catch (err) {
    console.error(err);
  }
};

export const updatePostStatus = async (status, postId, posts) => {
  try {
    const body = {
      query: `
        mutation UpdatePosts($fields: PostInput!, $postId: ID!) {
          updatePost(fields: $fields, postId: $postId) {
            _id
            title
            status
            categories { name }
          }
        }
      `,
      variables: {
        fields: {status},
        postId
      }
    };

    const {data} = await axios({data: JSON.stringify(body)});
    let newState = null;
    let updPost = data.data ? data.data.updatePost : null;
    if (updPost) {
      newState = posts.map((oldObj) => {
        return [updPost].find((newObj) => newObj._id === oldObj._id) || oldObj;
      });
    }

    return {
      posts: newState ? newState : posts
    }
  } catch (err) {
    console.error(err);
  }
};

export const deletePost = async (postId, posts) => {

  try {
    const body = {
      query: `
        mutation DeletePost($postId: ID!) {
          deletePost(postId: $postId) {
            _id
          }
        }
      `,
      variables: {
        postId
      }
    };

    const {data} = await axios({data: JSON.stringify(body)});
    let deletedPost = data.data ? data.data.deletePost : null;
    const newPosts = posts.filter((post) => (deletedPost && (post._id !== deletedPost._id)));

    return {
      posts: [...newPosts]
    }
  } catch (err) {
    console.error(err);
  }
};

export const getPosts = async (sort, prevPosts) => {
  try {
    const body = {
      query: `
        query GetPosts($sort: SortInput, $queryBy: QueryByInput){
          posts(sort: $sort, queryBy: $queryBy){
            _id
            title
            status
            categories { name }
            content
            excerpt
            author { 
              name
              lastname 
            }
          }
        }
      `,
      variables: {
        queryBy: {key: "status", value: 'PUBLIC'},
        sort: sort
      }
    };
    const {data} = await axios({data: JSON.stringify(body)});
    let newState;
    let newPosts = data.data ? data.data.posts : null
    if (newPosts) {
      newState = [...prevPosts, ...newPosts];
    }

    return {
      homePosts: data.data ? newState : null
    }

  } catch (err) {
    console.error(err);
  }
};

export const getPost = async (id) => {
  try {
    const body = {
      query: `
        query GetPost($id: ID!){
          post(id: $id){
            title
            content
            categories {
              _id 
              name
            }
            author { 
              name
              lastname 
            }
            related (sort: {limit: 4}) {
              _id
              title
              excerpt 
              author { 
                name
                lastname 
              }  
            }
          }
        }
      `,
      variables: {
        id
      }
    };
    const {data} = await axios({data: JSON.stringify(body)});

    return {
      singlePost: {
        post: data.data ? data.data.post : null,
        error: data.errors
      }
    }

  } catch (err) {
    console.error(err);
  }
};

