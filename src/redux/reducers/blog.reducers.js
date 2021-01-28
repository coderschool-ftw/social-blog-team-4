import * as types from '../constants/blog.constants';
const initialState = {
	blogs: [],
	totalPages: 1,
	loading: false
};

const blogReducer = (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
        case types.GET_BLOGS_REQUEST:
			return { ...state, loading: true };

		case types.GET_BLOGS_SUCCESS:
			return { ...state, blogs: payload.blogs, totalPages: payload.totalPages, loading: false };

		case types.GET_BLOGS_FAILURE:
			return { ...state, loading: false };

		default:
			return state;
	}
};

export default blogReducer;