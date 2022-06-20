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

const TourForm = () => {

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
      } = useForm();

      const userDetails = useAuthState();
      const history=useHistory();

      const location=useLocation();

      const tourType=location.state?location.state.tourType:null;
  
      const title=tourType===null?'':tourType.type;

      const [tourTypes,setTourTypes]=useState([]);

      const fetchTourTypes=async()=>{
        try {
            let {data}=await axios.get(`${API_URL}/api/v1/tourTypes`);
            console.log(data);
            if(!data)return;
            setTourTypes(data);
        } catch (error) {
            
        }
    }

    const onSubmit=async formData=>{
        console.log(formData);
        if(tourType!=null){
            formData.tourTypeId=tourType.id;
        }
        let request={
            ...formData
        }
        try {
            let {data}=await axios.post(`${API_URL}/api/v1/tours`,request,{ headers: { Authorization: `Bearer ${userDetails.token}` }})
            if(!data){
                toast.error("Failed to save tour package to the server");
                return ;
            }
            toast.info("New Tour Package Created!");
            history.push("/tours");
        } catch (error) {
            toast.error("Failed to save tour package to the server");
        }
        console.log(request);
        
    }

    useEffect(() => {
       if(tourType===null){
            fetchTourTypes();
        }
    }, [])
    return (
        <>
        <Content title='Add new Tour Packages ' 
                 subtitle={title}
                 widget={()=>{}}>
            <form onSubmit={handleSubmit(onSubmit)}>
                {tourType===null && <div className="form-group">
                    <label htmlFor="tourTypeId">Tour Packages</label>
                    <select className="form-control" {...register("tourTypeId",{required:true})}>
                    {
                        tourTypes.map((c,index)=>
                            <option key={index} value={c.id}>{c.type}</option>
                        )
                    }
                    </select>
                    {errors.tourTypeId && (<span className="error invalid-feedback" style={{ display: 'block' }}>This Field is Required</span>)}
                </div>}
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
                    <label htmlFor="activity">Description</label>
                    <textarea {...register("description")} className="form-control"  placeholder="Enter Address"></textarea>
                    
                </div>
                <div className="form-group">
                    <label htmlFor="activity">Activity</label>
                    <textarea {...register("activity")} className="form-control"  placeholder="Enter Address"></textarea>
                    
                </div>
                <div className="form-group">
                    <label htmlFor="activity">Spots</label>
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

export default TourForm
