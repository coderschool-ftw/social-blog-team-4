import * as types from '../constants/auth.constants'
const initialState = {
	user: null,
	isAuthenticated: !!localStorage.getItem("token"),
	loading: false,
	error: null,
};

const authReducer = (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
        case types.LOGIN_STARTED:
		case types.REGISTER_STARTED:
            return {...state, loading: true}

		case types.LOGIN_SUCCESS: 
			return {...state, user: payload, isAuthenticated: true, loading: false}			
		case types.REGISTER_SUCCESS:
			return {...state, loading: false}

        case types.LOGIN_FAIL: 
			return {...state, user: null, isAuthenticated: false, error: payload, loading: false}
		case types.REGISTER_FAIL:
			return {...state, loading: false}
			
		case types.LOGOUT: 
			return {...state, user: null, isAuthenticated: false}

		default:
			return state; 
	}
};

export default authReducer;