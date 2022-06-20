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

const AccomodationForm = () => {

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
      } = useForm();

      const userDetails = useAuthState();
      const history=useHistory();

      const location=useLocation();

      const accomType=location.state?location.state.accomType:null;
  
      const title=accomType===null?'':accomType.type;

      const [accomTypes,setAccomTypes]=useState([]);

      const fetchAccomTypes=async()=>{
        try {
            let {data}=await axios.get(`${API_URL}/api/v1/accomTypes`);
            console.log(data);
            if(!data)return;
            setAccomTypes(data);
        } catch (error) {
            
        }
    }

    const onSubmit=async formData=>{
        console.log(formData);
        if(accomType!=null){
            formData.accomTypeId=accomType.id;
        }
        let request={
            ...formData
        }
        try {
            let {data}=await axios.post(`${API_URL}/api/v1/accomodations`,request,{ headers: { Authorization: `Bearer ${userDetails.token}` }})
            if(!data){
                toast.error("Failed to save accomodation to the server");
                return ;
            }
            toast.info("New Accomodation Package Created!");
            history.push("/accomodations");
        } catch (error) {
            toast.error("Failed to save accomodation to the server");
        }
        console.log(request);
        
    }

    useEffect(() => {
       if(accomType===null){
            fetchAccomTypes();
        }
    }, [])
    return (
        <>
        <Content title='Add new Accomodation ' 
                 subtitle={title}
                 widget={()=>{}}>
            <form onSubmit={handleSubmit(onSubmit)}>
                {accomType===null && <div className="form-group">
                    <label htmlFor="accomTypeId">Accomodation Packages</label>
                    <select className="form-control" {...register("accomTypeId",{required:true})}>
                    {
                        accomTypes.map((c,index)=>
                            <option key={index} value={c.id}>{c.type}</option>
                        )
                    }
                    </select>
                    {errors.accomTypeId && (<span className="error invalid-feedback" style={{ display: 'block' }}>This Field is Required</span>)}
                </div>}
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

export default AccomodationForm
