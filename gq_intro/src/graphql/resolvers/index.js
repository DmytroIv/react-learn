import axios from "axios";
//
const dbHost = 'http://localhost:3004';

//
const Query = {
  agent: async (parent, args, context, info) => {
    const response = await axios.get(`${dbHost}/users/${args.id}`);
    return response.data;
  },
  agents: async (parent, args) => {
    const name = args.name ? `name=${args.name}` : '';
    const age = args.age ? `age=${args.age}` : '';

    const response = await axios.get(`${dbHost}/users?${name}&${age}`);
    return response.data;
  },
  posts: async (parent, args, context, info) => {
    const response = await axios.get(`${dbHost}/posts`);
    return response.data;
  },
  post: async (parent, args) => {
    const response = await axios.get(`${dbHost}/posts/${args.id}`);
    return response.data;
  },
  pictures: async (parent, args) => {
    const response = await axios.get(`${dbHost}/pictures`);
    return response.data;
  },
  getAnimal: async (parent, args, context, info) => {
    let response;

    let random = Math.floor(Math.random() * 6) + 1;

    if (random > 3) {
      return response = {
        name: 'Duke',
        animal: 'DOG',
        hair: 'lots'
      }
    } else {
      return response = {
        name: 'Citty',
        animal: 'CAT',
        paws: 'sharp'
      }
    }
  },
};

const Mutation = {
  createAgent: async (parent, args, context, info) => {

    console.log(args);

    const response = await axios.post(`${dbHost}/users`, {
      ...args.data,
      average: 0,
      status: args.data.status || "guest"
    });

    return response.data;
  },
  deleteAgent: async (parent, args, context, info) => {
    try {
      const response = await axios.delete(`${dbHost}/users/${args.id}`);
      return Object.keys(response.data).length === 0;
    } catch (e) {
      return false;
    }
  },
  updateAgent: async (parent, args, context, info) => {
    const data = {
      ...args.data
    };

    const response = await axios.patch(`${dbHost}/users/${args.id}`, data);
    return response.data;
  },
  createPost: async (parent, args, context, info) => {
    const response = await axios.post(`${dbHost}/posts`, {
      title: args.title,
      content: args.content,
      author: args.author,
      picture: args.picture,
      status: args.status
    });

    return response.data;
  },
  deletePost: async (parent, args, context, info) => {
    try {
      const response = await axios.delete(`${dbHost}/posts/${args.id}`);
      return Object.keys(response.data).length === 0;
    } catch (e) {
      return false;
    }
  },
};

const Picture = {
  author: async (parent, args, context, info) => {
    const response = await axios.get(`${dbHost}/users/${parent.author}`);
    return response.data;
  },
  post: async (parent, args, context, info) => {
    const response = await axios.get(`${dbHost}/posts/${parent.post}`);
    return response.data;
  }
};

const Post = {
  author: async (parent, args, context, info) => {
    try {
      const response = await axios.get(`${dbHost}/users/${parent.author}`);
      return response.data;
    } catch (e) {
      return null;
    }
  },
  picture: async (parent, args, context, info) => {
    const response = await axios.get(`${dbHost}/pictures/${parent.picture}`);
    return response.data;
  }
};

const User = {
  posts: async (parent, args) => {
    const response = await axios.get(`${dbHost}/posts?author=${parent.id}`);
    return response.data;
  },
  pictures: async (parent, args, context, info) => {
    const response = await axios.get(`${dbHost}/pictures?author=${parent.id}`);
    return response.data;
  }
};

//
const AnimalUnion = {
  __resolveType(object, context, info) {
    if (object.animal === 'DOG') {
      return 'Dog'
    }

    if (object.animal === 'CAT') {
      return 'Cat'
    }
  }
};

const AnimalInterface = {
  __resolveType(object, context, info) {
    if (object.animal === 'DOG') {
      return 'Dog'
    }

    if (object.animal === 'CAT') {
      return 'Cat'
    }
  }
};

//
export default {
  Query,
  Picture,
  Post,
  User,
  Mutation,

  // AnimalUnion,
  AnimalInterface
};