import * as types from "../constants/blog.constants";
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
    case types.GET_OWNER_BLOGS_REQUEST:
      return { ...state, loading: true };

    case types.GET_BLOGS_SUCCESS:
    case types.GET_OWNER_BLOGS_SUCCESS:
      return {
        ...state,
        blogs: payload.blogs,
        totalPages: payload.totalPages,
        loading: false,
      };

    case types.GET_BLOGS_FAILURE:
    case types.GET_OWNER_BLOGS_FAILURE:
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

    case types.BLOG_REVIEW_REQUEST:
      return { ...state };
    // TODO

    case types.BLOG_REVIEW_SUCCESS:
      return {
        ...state,
        blog: { ...state.blog, reviews: [...state.blog.reviews, payload] },
      };

    case types.BLOG_REVIEW_FAILURE:
      return { ...state };
    // TODO

    case types.DELETE_BLOG_SUCCESS:
      return { ...state, blogs: state.blogs.filter((b) => b._id !== payload) };

    default:
      return state;
  }
};

export default blogReducer;
