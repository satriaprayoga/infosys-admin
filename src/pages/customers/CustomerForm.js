import React, { useEffect, useState } from 'react'
import Content from '../../components/Content'
import axios from 'axios';
import { API_URL } from '../../const';
import { useForm } from 'react-hook-form';
import { useAuthState } from '../../context';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router';

const CustomerForm = () => {

    const {
        register,
        handleSubmit,
        getValues,
        setError,
        watch,
        formState: { errors }
      } = useForm();
    
    const [loading, setLoading] = useState(false);
    const userDetails = useAuthState();
    const history = useHistory();

    const onSubmit = async formData => {
        console.log(formData);
        if(getValues('confirmPassword')!==getValues('password')){
          setError("confirmPassword",{types:"manual",message:'Password do not macth'})
          return;
        }
        try {
          let request = {
            firstName:formData.firstName,
            lastName:formData.lastName,
            username:formData.firstName,
            email:formData.email,
            password:formData.password,
            repassword:formData.confirmPassword
          }
          setLoading(true);
          let { data } = await axios.post(`${API_URL}/api/v1/registration/`, request);
          if (!data) {
            setLoading(false);
            toast.error('Registration failed, please try again');
            return;
          }
          console.log(data);
          setLoading(false);
          toast.info('Registration success, Your activation email has been sent');
          history.push('/customers');
        } catch (error) {
          setLoading(false);
          toast.error('Registration failed, please try again');
        }
      }

    return (
        <>
            <Content title="Add new Customer" widget={() => { }}>
                <form onSubmit={e => e.preventDefault()}>
                    <div className="form-group">
                        <label htmlFor="firstName">First Name</label>
                        <input placeholder="Enter Fisrt Name" {...register("firstName", { required: true })} className="form-control"></input>
                        {errors.name && (<span className="error invalid-feedback" style={{ display: 'block' }}>This Field is Required</span>)}
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastName">Last Name</label>
                        <input placeholder="Enter Last Name" {...register("lastName", { required: true })} className="form-control"></input>
                        {errors.state && (<span className="error invalid-feedback" style={{ display: 'block' }}>This Field is Required</span>)}
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input placeholder="Email" type="email" className="form-control" {...register("email", { required: "This field is required", pattern: /^\S+@\S+$/i })}></input>
                        {errors.email && (
                            <span className="error invalid-feedback" style={{ display: 'block' }}>{errors.email.message}</span>
                        )}
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            className="form-control"
                            type="password"
                            {...register("password", {
                                required: "You must specify a password",
                                minLength: {
                                    value: 8,
                                    message: "Password must have at least 8 characters"
                                }
                            })}
                        />
                         {errors.password && (
                            <span className="error invalid-feedback" style={{ display: 'block' }}>{errors.password.message}</span>
                        )}
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            className="form-control"
                            type="password"
                            {...register("confirmPassword", {
                                required: true,
                            })}
                        />
                        {errors.confirmPassword && (
                            <span className="error invalid-feedback" style={{ display: 'block' }}>{errors.confirmPassword.message}</span>
                        )}
                    </div>
                    
                    <div className="form-group">
                        <button type="submit" onClick={handleSubmit(onSubmit)} className="btn btn-info">Submit</button>
                    </div>
                </form>
            </Content>
        </>
    )
}

export default CustomerForm
