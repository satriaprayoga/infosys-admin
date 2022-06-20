import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';
import { API_URL } from '../../const';
import { useAuthState } from '../../context';

const CustomerEditForm = (props) => {
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
        const customer = props.customer;
        setValue('firstName', customer.firstName);
        setValue('lastName', customer.lastName);
        setValue('country', customer.country);
        setValue('state', customer.state);
        setValue('city', customer.city);
        setValue('address', customer.address);
        setValue('phone', customer.phone);
    }

    const onSubmit=async formData=>{
        try {
           
            let {data}=await axios.put(`${API_URL}/api/v1/customer/${props.customer.id}`,formData,{ headers: { Authorization: `Bearer ${userDetails.token}` }})
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
                        <label htmlFor="firstName" className="col-sm-2 col-form-label">First Name</label>
                        <div className="col-sm-10">
                        <input placeholder="Enter Fisrt Name" {...register("firstName", { required: true })} className="form-control"></input>
                        {errors.firstName && (<span className="error invalid-feedback" style={{ display: 'block' }}>This Field is Required</span>)}
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="lastName" className="col-sm-2 col-form-label">Last Name</label>
                        <div className="col-sm-10">
                        <input placeholder="Enter Last Name" {...register("lastName", { required: true })} className="form-control"></input>
                        {errors.lastName && (<span className="error invalid-feedback" style={{ display: 'block' }}>This Field is Required</span>)}
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="country" className="col-sm-2 col-form-label">Country</label>
                        <div className="col-sm-10">
                        <input placeholder="Enter Last Name" {...register("country")} className="form-control"></input>
                       
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="state" className="col-sm-2 col-form-label">State</label>
                        <div className="col-sm-10">
                        <input placeholder="Enter Last Name" {...register("state")} className="form-control"></input>
                       
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="city" className="col-sm-2 col-form-label">City</label>
                        <div className="col-sm-10">
                        <input placeholder="Enter Last Name" {...register("city")} className="form-control"></input>
                       
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="address" className="col-sm-2 col-form-label">Address</label>
                        <div className="col-sm-10">
                        <textarea {...register("address")} className="form-control"  placeholder="Enter Address" ></textarea>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="phone" className="col-sm-2 col-form-label">Phone</label>
                        <div className="col-sm-10">
                        <input placeholder="Enter Last Name" {...register("phone")} className="form-control"></input>
                       
                        </div>
                    </div>
                    <div className="form-group">
                        <input type="submit" className="btn btn-info" />
                     </div>
                </form>
        </>
    )
}

export default CustomerEditForm
