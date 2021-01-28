import api from '../../apiService'
import * as types from '../constants/auth.constants'

export const login = (email, password) => async (dispatch) => {
	dispatch({ type: types.LOGIN_STARTED});
	try {
        const response = await api.post('/auth/login', {
            email,
            password
        });
        if(response.data.success){
            dispatch({ type: types.LOGIN_SUCCESS, payload: response.data.data.user}); 
        }
	} catch (error) {
		dispatch({type: types.LOGIN_FAIL, payload: error.message})
	}
};

export const logout = () => (dispatch) => {
    localStorage.removeItem("token");
    dispatch({type: types.LOGOUT});
}

export const register = (name, email, password) => async (dispatch) => {
    dispatch({type: types.REGISTER_STARTED})
	try {
        const response = await api.post('/users', {
            name,
            email,
            password
        });
        if(response.data.success){
            console.log('success', response.data.message)
            dispatch({type: types.REGISTER_SUCCESS, payload: response.data.message})
        }
	} catch (error) {
        console.log('error register', error)
        dispatch({type: types.REGISTER_FAIL, payload: error})
	}
};