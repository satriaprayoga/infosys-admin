
import React, { useEffect } from 'react'
import { Redirect, Route, useHistory } from 'react-router'
import { useAuthDispatch, useAuthState, signOut } from '../context'

const PrivateRoute = ({ component: Component, path, isPrivate, ...rest }) => {

    const userDetails = useAuthState();
	const dispatch=useAuthDispatch();
	const history=useHistory();

	useEffect(() => {
		console.log(userDetails);
		//console.log(!!(userDetails.token));
		//const expTime=userDetails.expirationTime;
		if(!Boolean(userDetails.expirationTime)){
			signOut(dispatch);
			history.push('/signin');
		}else{
			const exp=new Date(userDetails.expirationTime);
			console.log("exp: "+exp.toISOString());
			if(new Date(exp) < new Date()){
				console.log("Basi: "+exp+", sekarang: "+new Date());
				signOut(dispatch);
				history.push('/signin');
			}
		}
		
	}, [])
    return (
        <Route
		path={path}
		render={props =>
			isPrivate && !Boolean(userDetails.token) ? (
				<Redirect
					to={{ pathname: "/signin" }}
				/>
			) : (
					<Component {...props} />
				)
		}
		{...rest}
        />
    )
}
export default PrivateRoute
