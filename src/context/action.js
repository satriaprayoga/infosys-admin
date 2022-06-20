import axios from "axios";
import { API_URL } from "../const";

export async function signIn(dispatch,payload){
    try {
        dispatch({type:'REQUEST_LOGIN'});
        let {data}=await axios.post(`${API_URL}/api/v1/signin`,payload);
       
        console.log(data);
        if(data){
            const expiration = new Date(new Date().getTime() + 1000 * 60 *60 );
            const user={
                token:data.accessToken,
                user:data.principal,
                expirationTime:expiration.toISOString()
            }
            console.log(data);
            localStorage.setItem('currentUser',JSON.stringify(user));
            dispatch({type:'LOGIN_SUCCESS', payload:user});
            console.log(localStorage.getItem('currentUser'))
            return user;
        }
         dispatch({type:'LOGIN_ERROR'})
        return;
    } catch (error) {
        console.log(error.response.data.status);
        dispatch({ type: 'LOGIN_ERROR', error: error.response.data.status });
    }
}

export async function signOut(dispatch){
    dispatch({type: 'LOGOUT'});
    localStorage.removeItem('currentUser');
}