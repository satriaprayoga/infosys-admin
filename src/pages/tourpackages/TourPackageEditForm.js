import React, { useEffect, useState } from 'react'
import Content from '../../components/Content'
//import ReactQuill from 'react-quill';
//import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { API_URL } from '../../const';
import { useForm } from 'react-hook-form';
import { useAuthState } from '../../context';
import { toast } from 'react-toastify';
import { useHistory, useLocation } from 'react-router';

const TourPackageEditForm = () => {
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors }
    } = useForm();
    const userDetails = useAuthState();
    const history = useHistory();

    const location = useLocation();
    const {tourType}=location.state;

    const onSubmit=async formData=>{
        let request={
            id:tourType.id,
            destId:tourType.destination.id,
            type:formData.type,
            description:formData.description
        }
        try {
            let {data}=await axios.put(`${API_URL}/api/v1/tourTypes`,request,{ headers: { Authorization: `Bearer ${userDetails.token}` }})
            if(!data){
                toast.error("Failed to save tour package to the server");
                return ;
            }
            toast.info("Tour Package Updated!");
            history.push("/tourPackages");
        } catch (error) {
            toast.error("Failed to save tour package to the server");
        }
    }

    useEffect(() => {
       setValue("type",tourType.type);
       setValue("description",tourType.description);
    }, [])
    return (
        <>
        <Content title={'Edit' +location.state.tourType.type} 
                 widget={()=>{}}>
            <form onSubmit={handleSubmit(onSubmit)}>
               
                <div className="form-group">
                    <label htmlFor="type">Type</label>
                    <input placeholder="Enter Type" {...register("type",{required:true})} className="form-control"></input>
                    {errors.type && (<span className="error invalid-feedback" style={{ display: 'block' }}>This Field is Required</span>)}
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea {...register("description")} className="form-control"  placeholder="Enter Address"></textarea>
                    
                </div>
                <div className="form-group">
                    <input type="submit" className="btn btn-info" />
                </div>
            </form>
            </Content>
        </>
    )
}

export default TourPackageEditForm
