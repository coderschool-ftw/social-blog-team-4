import * as types from '../constants/blog.constants';
import api from '../../apiService';

const getBlogs = (pageNum, limit) => async (dispatch) => {
  dispatch({ type: types.GET_BLOGS_REQUEST });
  try {
    let url = `/blogs?page=${pageNum}&limit=${limit}`;
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
const blogActions = {
  getBlogs,
  getBlog,
};

export default blogActions;
