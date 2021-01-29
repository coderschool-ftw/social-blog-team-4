import * as types from '../constants/blog.constants';
const initialState = {
  blogs: [],
  blog: null,
  totalPages: 1,
  loading: false,
};

const blogReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.GET_BLOGS_REQUEST:
      return { ...state, loading: true };

    case types.GET_BLOGS_SUCCESS:
      return {
        ...state,
        blogs: payload.blogs,
        totalPages: payload.totalPages,
        loading: false,
      };

    case types.GET_BLOGS_FAILURE:
      return { ...state, loading: false };

    case types.GET_BLOG_REQUEST:
      return { ...state, loading: true };

    case types.GET_BLOG_SUCCESS:
      return { ...state, blog: payload, loading: false };

    case types.GET_BLOG_FAILURE:
      return { ...state };
    // TODO

    case types.BLOG_REACTION_REQUEST:
      return { ...state };
    // TODO

    case types.BLOG_REACTION_SUCCESS:
      return { ...state, blog: { ...state.blog, reactions: payload } };

    case types.BLOG_REACTION_FAILURE:
      return { ...state };
    // TODO

    default:
      return state;
  }
};

export default blogReducer;
