import React from 'react'
import { Redirect, Route } from 'react-router';
import { useAuthState } from '../context';

const AppRoutes = ({ component: Component, path, isPrivate, ...rest }) => {

    const userDetails = useAuthState();

    console.log(Boolean(userDetails.token));
    return (
        <Route
            path={path}
            render={(props) =>
                isPrivate && !Boolean(userDetails.token) ? (
                    <Redirect to={{ pathname: '/signin' }} />
                ) : (
                    <Component {...props} />
                )
            }
            {...rest}
        />
    )
}

export default AppRoutes;
