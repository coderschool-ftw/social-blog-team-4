import * as types from '../constants/blog.constants';
const initialState = {
  blogs: [],
  blog: null,
  totalPages: 1,
  loading: false,
  error: null,
};

const blogReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    /************************ BLOGS ************************/
    case types.GET_BLOGS_REQUEST:
      return { ...state, loading: true, error: null };

    case types.GET_BLOGS_SUCCESS:
      return {
        ...state,
        blogs: payload.blogs,
        totalPages: payload.totalPages,
        loading: false,
        error: null,
      };

    case types.GET_BLOGS_FAILURE:
      return { ...state, loading: false, error: payload, blogs: [] };

    /************************ BLOG ************************/
    case types.GET_BLOG_REQUEST:
      return { ...state, loading: true, error: null };

    case types.GET_BLOG_SUCCESS:
      return { ...state, loading: false, error: null, blog: payload };

    case types.GET_BLOG_FAILURE:
      return { ...state, loading: false, error: payload };

    /************************ REACTION ************************/
    case types.BLOG_REACTION_REQUEST:
      return { ...state };
    // TODO

    case types.BLOG_REACTION_SUCCESS:
      return { ...state, blog: { ...state.blog, reactions: payload } };

    case types.BLOG_REACTION_FAILURE:
      return { ...state };
    // TODO

    /************************ REVIEW ************************/
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

    default:
      return state;
  }
};

export default blogReducer;
