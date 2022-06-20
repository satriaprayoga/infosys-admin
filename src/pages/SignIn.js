import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';
import {signIn, useAuthDispatch} from '../context';


const emailRegex = RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const validation = (values) => {
    let errors = {};
    if (!values.email || values.email.length === 0) {
        errors.email = "Email is Required"
    } else if (!emailRegex.test(values.email)) {
        errors.email = "Email is not valid"
    }

    if (!values.password || values.password.length === 0) {
        errors.password = "Password is required"
    }

    return errors;
}

const SignIn = (props) => {

    const [values, setValues] = useState({
        email: '',
        password: '',
        rememberMe:false
    })

    const history=useHistory();

    const dispatch=useAuthDispatch();

     const [errors, setErrors] = useState({ email: '', password: '' })

    const handleChange = (e) => {
        // e.preventDefault();
        setValues({ ...values, [e.target.name]: [e.target.value] })

    }
    const handleSubmit = async(e) => {
        e.preventDefault();
        let formErrors = validation(values);
        if (Object.keys(formErrors).length === 0) {
            let data = { email: values.email[0], password: values.password[0], rememberMe: false }
            console.log({ data });
            console.log('No error')
            let response=await signIn(dispatch,data);
            if(!response){
                toast.error("Your email or password was not found");
                return;
            }
            history.push('/');
            onLeavePage();
            toast.info("Welcome back!");
        } else {
            console.log('Error')
            setErrors(formErrors);
          
        }
        console.log(formErrors);

    }

    const onEnterPage=()=>{
        const body = document.body;
        body.classList.remove('sidebar-mini');
        body.classList.add('login-page')

        // const nav = document.getElementById("nav")
        // nav.style.display = 'none';

        // const aside = document.getElementById("aside")
        // aside.style.display = 'none';

        const root = document.getElementById('root')
        root.classList.remove('wrapper');
        root.classList.add('login-box');
    }

    const onLeavePage=()=>{
        const body = document.body;
            body.classList.add('sidebar-mini');
            body.classList.remove('login-page')
    
            const root = document.getElementById('root')
            root.classList.add('wrapper');
            root.classList.remove('login-box');
    }

    useEffect(() => {
        onEnterPage();

        return()=>{
           onLeavePage();
        }

        // const footer = document.getElementById("footer")
        // footer.style.display = 'none';

    }, [])

    return (
        <>
            <div className="card card-outline card-primary">
                <div className="card-header text-center">
                    <a href="../../index2.html" className="h1"><b>InfoSys</b></a>
                </div>
                <div className="card-body">
                    <p className="login-box-msg">Sign in to start your session</p>
                    <form onSubmit={handleSubmit} noValidate>
                        <div className="input-group mb-3">
                            <input type="email"
                                name="email"
                                className={errors.email ? 'form-control is-invalid' : 'form-control'}
                                placeholder="Email"
                                onChange={handleChange}
                                noValidate />
                            <div className="input-group-append">
                                <div className="input-group-text">
                                    <span className="fas fa-envelope"></span>
                                </div>
                            </div>
                            {errors.email && (<span className="error invalid-feedback" style={{ display: 'block' }}>{errors.email}</span>)}
                        </div>
                        <div className="input-group mb-3">
                            <input type="password"
                                name="password"
                                className={errors.email ? 'form-control is-invalid' : 'form-control'}
                                placeholder="Password"
                                onChange={handleChange}
                                noValidate />
                            <div className="input-group-append">
                                <div className="input-group-text">
                                    <span className="fas fa-lock"></span>
                                </div>
                            </div>
                            {errors.password && (<span className="error invalid-feedback" style={{ display: 'block' }}>{errors.password}</span>)}
                        </div>
                        <div className="row">
                            <div className="col-12">

                                <button type="submit" className="btn btn-primary btn-block">Sign In</button>

                            </div>
                        </div>

                    </form>
                </div>
            </div>
        </>
    )
}

export default SignIn;
