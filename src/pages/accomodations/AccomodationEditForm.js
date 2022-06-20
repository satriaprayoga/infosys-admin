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

const AccomodationEditForm = () => {

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

      const {accomodation}=location.state;
  
      
    const onSubmit=async formData=>{
        console.log(formData);
        
        let request={
            id:accomodation.id,
            accomodationTypeId:accomodation.accomType.id,
            ...formData
        }
        try {
            let {data}=await axios.put(`${API_URL}/api/v1/accomodations`,request,{ headers: { Authorization: `Bearer ${userDetails.token}` }})
            if(!data){
                toast.error("Failed to save accomodation to the server");
                return ;
            }
            toast.info("Accomodation Updated!");
            history.push("/accomodations");
        } catch (error) {
            toast.error("Failed to save accomodation to the server");
        }
       
        
    }

    useEffect(() => {
       setValue("name",accomodation.name);
       setValue("price",accomodation.price);
       setValue("description",accomodation.description);
       setValue("facility",accomodation.facility);
    }, [])
    return (
        <>
        <Content title={'Edit' +location.state.accomodation.name} 
                 widget={()=>{}}>
            <form onSubmit={handleSubmit(onSubmit)}>
                
                <div className="form-group">
                    <label htmlFor="name">Accomodation Name</label>
                    <input placeholder="Enter Name" {...register("name",{required:true})} className="form-control"></input>
                    {errors.name && (<span className="error invalid-feedback" style={{ display: 'block' }}>This Field is Required</span>)}
                </div>
                <div className="form-group">
                    <label htmlFor="price">Price</label>
                    <input placeholder="Enter price" {...register("price",{required:true, valueAsNumber:true, min:100000})} className="form-control" type="number"></input>
                    {errors.price && (<span className="error invalid-feedback" style={{ display: 'block' }}>This Field is Required</span>)}
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea {...register("description")} className="form-control"  placeholder="Enter Address"></textarea>
                    
                </div>
                <div className="form-group">
                    <label htmlFor="facility">Facility</label>
                    <textarea {...register("facility")} className="form-control"  placeholder="Enter Address"></textarea>
                    
                </div>
                <div className="form-group">
                    <input type="submit" className="btn btn-info" />
                </div>
            </form>
            </Content>
        </>
    )
}

export default AccomodationEditForm
