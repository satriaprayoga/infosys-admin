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

const TourEditForm = () => {

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors }
      } = useForm();

      const userDetails = useAuthState();
      const history=useHistory();

      const location=useLocation();

      const {tour}=location.state;
  
      
    const onSubmit=async formData=>{
        console.log(formData);
        
        let request={
            id:tour.id,
            tourTypeId:tour.tourType.id,
            ...formData
        }
        try {
            let {data}=await axios.put(`${API_URL}/api/v1/tours`,request,{ headers: { Authorization: `Bearer ${userDetails.token}` }})
            if(!data){
                toast.error("Failed to save tour package to the server");
                return ;
            }
            toast.info("Tour Updated!");
            history.push("/tours");
        } catch (error) {
            toast.error("Failed to save tour package to the server");
        }
       
        
    }

    useEffect(() => {
       setValue("name",tour.name);
       setValue("price",tour.price);
       setValue("day",tour.day);
       setValue("night",tour.night);
       setValue("description",tour.description);
       setValue("activity",tour.activity);
       setValue("spots",tour.spots);
    }, [])
    return (
        <>
        <Content title={'Edit' +location.state.tour.name} 
                 widget={()=>{}}>
            <form onSubmit={handleSubmit(onSubmit)}>
                
                <div className="form-group">
                    <label htmlFor="name">Tour Name</label>
                    <input placeholder="Enter Name" {...register("name",{required:true})} className="form-control"></input>
                    {errors.name && (<span className="error invalid-feedback" style={{ display: 'block' }}>This Field is Required</span>)}
                </div>
                <div className="form-group">
                    <label htmlFor="price">Price</label>
                    <input placeholder="Enter price" {...register("price",{required:true, valueAsNumber:true, min:100000})} className="form-control" type="number"></input>
                    {errors.price && (<span className="error invalid-feedback" style={{ display: 'block' }}>This Field is Required</span>)}
                </div>
                <div className="form-group">
                    <label htmlFor="price">Day</label>
                    <input placeholder="Enter price" {...register("day",{required:true, valueAsNumber:true, min:0})} className="form-control" type="number"></input>
                    {errors.day && (<span className="error invalid-feedback" style={{ display: 'block' }}>This Field is Required</span>)}
                </div>
                <div className="form-group">
                    <label htmlFor="price">Night</label>
                    <input placeholder="Enter price" {...register("night",{required:true, valueAsNumber:true, min:0})} className="form-control" type="number"></input>
                    {errors.night && (<span className="error invalid-feedback" style={{ display: 'block' }}>This Field is Required</span>)}
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea {...register("description")} className="form-control"  placeholder="Enter Address"></textarea>
                    
                </div>
                <div className="form-group">
                    <label htmlFor="activity">Activity</label>
                    <textarea {...register("activity")} className="form-control"  placeholder="Enter Address"></textarea>
                    
                </div>
                <div className="form-group">
                    <label htmlFor="spots">Spots</label>
                    <textarea {...register("spots")} className="form-control"  placeholder="Enter Address"></textarea>
                    
                </div>
                <div className="form-group">
                    <input type="submit" className="btn btn-info" />
                </div>
            </form>
            </Content>
        </>
    )
}

export default TourEditForm
