import * as types from '../constants/blog.constants';
import api from '../../apiService';

const getBlogs = (pageNum, limit, query) => async (dispatch) => {
  dispatch({ type: types.GET_BLOGS_REQUEST });
  try {
    let url = `/blogs?page=${pageNum}&limit=${limit}`;
    if (query)
      url += `&title[$regex]=${query}&title[$options]=i&sortBy[title]=1`;
    const response = await api.get(url);
    dispatch({ type: types.GET_BLOGS_SUCCESS, payload: response.data.data });
  } catch (error) {
    dispatch({ type: types.GET_BLOGS_FAILURE, payload: error });
  }
};

const getBlog = (blogId) => async (dispatch) => {
  dispatch({ type: types.GET_BLOG_REQUEST });
  try {
    let url = `/blogs/${blogId}`;
    const response = await api.get(url);
    dispatch({ type: types.GET_BLOG_SUCCESS, payload: response.data.data });
  } catch (error) {
    dispatch({ type: types.GET_BLOG_FAILURE, payload: error });
  }
};

const submitReaction = (targetType, targetId, emoji) => async (dispatch) => {
  dispatch({ type: types.BLOG_REACTION_REQUEST });

  try {
    let url = '/reactions';
    const response = await api.post(url, {
      targetType,
      targetId,
      emoji,
    });

    if (response.data.success) {
      dispatch({
        type: types.BLOG_REACTION_SUCCESS,
        payload: response.data.data,
      });
    }

    if (response.errors) {
      dispatch({
        type: types.BLOG_REACTION_FAILURE,
        payload: response.errors,
      });
    }
  } catch (error) {
    dispatch({ type: types.BLOG_REACTION_FAILURE, payload: error });
  }
};

const submitReview = (submittedReview, blogId) => async (dispatch) => {
  dispatch({ type: types.BLOG_REVIEW_REQUEST });

  try {
    let url = `/reviews/blogs/${blogId}`;
    const response = await api.post(url, {
      content: submittedReview,
    });

    if (response.data.success) {
      dispatch({
        type: types.BLOG_REVIEW_SUCCESS,
        payload: response.data.data,
      });
    }

    if (response.errors) {
      dispatch({
        type: types.BLOG_REVIEW_FAILURE,
        payload: response.errors,
      });
    }
  } catch (error) {
    dispatch({ type: types.BLOG_REVIEW_FAILURE, payload: error });
  }
};

const blogActions = {
  getBlogs,
  getBlog,
  submitReaction,
  submitReview,
};

export default blogActions;
