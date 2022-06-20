
let user = localStorage.getItem('currentUser')
? JSON.parse(localStorage.getItem('currentUser')).user
: '';
let token = localStorage.getItem('currentUser')
? JSON.parse(localStorage.getItem('currentUser')).token
: '';
let exp= localStorage.getItem('currentUser')
? JSON.parse(localStorage.getItem('currentUser')).expirationTime
:'';


export const initialState = {
    user:  ''||user,
	token: ''||token,
	loading: false,
	expirationTime: ''||exp,
	errorMessage: null,
};

export const SIGN_IN_REQUEST="SIGN_IN_REQUEST";
export const SIGN_IN_SUCCESS="SIGN_IN_SUCCESS";
export const SIGN_OUT="SIGN_OUT";
export const SIGN_IN_ERROR="SIGN_IN_ERROR";

export const AuthReducer = (initialState, action) => {
    switch (action.type) {
		case 'REQUEST_LOGIN':
			return {
				...initialState,
				loading: true,
			};
		case 'LOGIN_SUCCESS':
			return {
				...initialState,
				user: action.payload.user,
				token: action.payload.token,
				expirationTime: action.payload.expirationTime,
				loading: false,
			};
		case 'LOGOUT':
			return {
				...initialState,
				user: '',
				token: '',
				expirationTime:''
			};

		case 'LOGIN_ERROR':
			return {
				...initialState,
				loading: false,
				errorMessage: action.error,
			};

		default:
			throw new Error(`Unhandled action type: ${action.type}`);
	}
}