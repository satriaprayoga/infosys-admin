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

const TourPackageForm = () => {

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
      } = useForm();

      const userDetails = useAuthState();
      const history=useHistory();

      const location=useLocation();

      const destination=location.state?location.state.destination:null;
  
      const title=destination===null?'':destination.name;

      const [destinations,setDestinations]=useState([]);

      const fetchDestinations=async()=>{
        try {
            let {data}=await axios.get(`${API_URL}/api/v1/destinations?sort=asc`);
            if(!data)return;
            setDestinations(data);
        } catch (error) {
            
        }
    }

    const onSubmit=async formData=>{
        let request={
            destId:(destination===null)?JSON.parse(formData.destId):destination.id,
            type:formData.type,
            description:formData.description
        }
        try {
            let {data}=await axios.post(`${API_URL}/api/v1/tourTypes`,request,{ headers: { Authorization: `Bearer ${userDetails.token}` }})
            if(!data){
                toast.error("Failed to save tour package to the server");
                return ;
            }
            toast.info("New Tour Package Created!");
            history.push("/tourPackages");
        } catch (error) {
            toast.error("Failed to save tour package to the server");
        }
    }

    useEffect(() => {
       if(destination===null){
            fetchDestinations();
        }
    }, [])

    return (
        <>
        <Content title='Add new Tour Packages ' 
                 subtitle={title}
                 widget={()=>{}}>
            <form onSubmit={handleSubmit(onSubmit)}>
                {destination===null && <div className="form-group">
                    <label htmlFor="destId">Destination</label>
                    <select className="form-control" {...register("destId",{required:true})}>
                    {
                        destinations.map((c,index)=>
                            <option key={index} value={c.id}>{c.name}</option>
                        )
                    }
                    </select>
                    {errors.destId && (<span className="error invalid-feedback" style={{ display: 'block' }}>This Field is Required</span>)}
                </div>}
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

export default TourPackageForm
