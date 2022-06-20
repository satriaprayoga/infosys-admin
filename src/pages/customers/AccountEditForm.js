import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';
import { API_URL } from '../../const';
import { useAuthState } from '../../context';

const AccountEditForm = (props) => {
    const {
        register,
        handleSubmit,
        getValues,
        setValue,
        setError,
        watch,
        formState: { errors }
    } = useForm();

    const userDetails=useAuthState();
    const history=useHistory();

    const fetchCustomerForm = () => {
        const appUser = props.appUser;
        setValue('email', appUser.email);
        setValue('enabled', appUser.enabled);
    }

    const onSubmit=async formData=>{
        try {
            let request={
                id:props.appUser.id,
                email:formData.email,
                enabled:formData.enabled
            }
            console.log(request);
            let {data}=await axios.put(`${API_URL}/api/v1/account/${props.appUser.id}`,request,{ headers: { Authorization: `Bearer ${userDetails.token}` }})
            if(!data){
                toast.error("Server Busy. Try again later");
                return ;
            }
            toast.info("Profile Successfully Updated!");
            history.push('/customers');
           
        } catch (error) {
            toast.error("Server Busy. Try again later");
        }
    }

    useEffect(() => {
        fetchCustomerForm();
    }, [])
    return (
        <>
        <form className="form-horizontal" onSubmit={handleSubmit(onSubmit)} >
                <div className="form-group row">
                        <label htmlFor="email" className="col-sm-2 col-form-label">Account's Email</label>
                        <div className="col-sm-10">
                        <input placeholder="email" type="email" {...register("email", { required: true })} className="form-control"></input>
                        {errors.email && (<span className="error invalid-feedback" style={{ display: 'block' }}>This Field is Required</span>)}
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="enabled" className="col-sm-2 col-form-label">Account Active</label>
                        <div className="col-sm-10">
                        <input placeholder="Active" type="checkbox" {...register("enabled", {})}></input>
                       
                        </div>
                    </div>
                    
                    <div className="form-group">
                        <input type="submit" className="btn btn-info" />
                     </div>
                </form>
        </>
    )
}

export default AccountEditForm
