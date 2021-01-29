import * as types from "../constants/blog.constants";
import api from "../../apiService";

const blogActions = {
  getBlogs: (pageNum, limit, query) => async (dispatch) => {
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
  },
};

export default blogActions;
