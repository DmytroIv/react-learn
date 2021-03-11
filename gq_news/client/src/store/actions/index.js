import * as api from '../../api';

export const signupUser = (userData) => ({
  type: 'AUTH_USER',
  payload: api.signupUser(userData)
});

export const loginUser = (userData) => ({
  type: 'LOGIN_USER',
  payload: api.loginUser(userData)
});

export const autoSignIn = (userData) => ({
  type: 'AUTOSIGNIN_USER',
  payload: api.autoSignIn(userData)
});

export const logoutUser = () => {
  localStorage.removeItem('X-AUTH');

  return {
    type: 'LOGOUT_USER',
    payload: null
  }
};

export const updateUserEmailPass = (email, password, id) => ({
  type: 'UPDATE_USER_EMAIL_PASS',
  payload: api.updateUserEmailPass(email, password, id)
});

export const getUserStats = (id) => ({
  type: 'GET_USER_STATS',
  payload: api.getUserStats(id)
});

export const createPost = (postData) => ({
  type: 'CREATE_POST',
  payload: api.createPost(postData)
});

export const clearCreatedPost = () => ({
  type: 'CLEAR_CREATE_POST',
  payload: {createdPost: null}
});

export const getUserPosts = (sort, prevState, userId) => ({
  type: 'GET_USER_POSTS',
  payload: api.getUserPosts(sort, prevState, userId)
});

export const updatePostStatus = (status, postId, posts) => ({
  type: 'UPDATE_POST_STATUS',
  payload: api.updatePostStatus(status, postId, posts)
});

export const deletePost = (postId, posts) => ({
  type: 'DELETE_POST',
  payload: api.deletePost(postId, posts)
});

export const getPosts = (sort, posts) => ({
  type: 'GET_POSTS',
  payload: api.getPosts(sort, posts)
});

export const getPost = (id) => ({
  type: 'GET_POST',
  payload: api.getPost(id)
});