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


const DestinationEditForm = () => {

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors }
      } = useForm();

    const [countries,setCountries]=useState([]);
    const [data,setData]=useState({});

    const location=useLocation();
    const userDetails=useAuthState();
    const history=useHistory();

    const fetchCountries=async()=>{
        try {
            let {data}=await axios.get(`${API_URL}/api/v1/countrys?sort=asc`);
            if(!data)return;
            setCountries(data);
        } catch (error) {
            
        }
    }

    const onSubmit=async formData=>{
        console.log(formData);
        let destination={
            id:data.id,
            ...formData
        }
        console.log(destination)
        try {
            let {data}=await axios.put(`${API_URL}/api/v1/destinations`,destination,{ headers: { Authorization: `Bearer ${userDetails.token}` }})
            if(!data){
                toast.error("Failed to save destination to the server");
                return ;
            }
            toast.info("Destination Updated");
            history.push('/destinations');
        } catch (error) {
            toast.error("Failed to save destination to the server");
        }
    }

    useEffect(() => {
        fetchCountries();
    }, [])

    useEffect(()=>{
        const {destination}=location.state;
        setData(destination);
        setValue("country",destination.country);
        setValue("name",destination.name);
        setValue("state",destination.state);
        setValue("city",destination.city);
        setValue("company",destination.company);
        setValue("address",destination.address);
        setValue("phone",destination.phone);
        setValue("email",destination.email);
        setValue("description",destination.description);
    },[])

    return (
        <>
        <Content title={`Edit ${data.name}`} widget={()=>{}}>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
                <label htmlFor="country">Country</label>
                <select className="form-control" {...register("country",{required:true})}>
                {
                    countries.map((c,index)=>
                        <option key={index} value={c.name} selected={data.country===c.name}>{c.name}</option>
                    )
                }
                </select>
                {errors.country && (<span className="error invalid-feedback" style={{ display: 'block' }}>This Field is Required</span>)}
            </div>
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input placeholder="Enter Name" {...register("name",{required:true})} className="form-control" ></input>
                {errors.name && (<span className="error invalid-feedback" style={{ display: 'block' }}>This Field is Required</span>)}
            </div>
            <div className="form-group">
                <label htmlFor="state">State/Province</label>
                <input placeholder="Enter State" {...register("state",{required:true})} className="form-control" ></input>
                {errors.state && (<span className="error invalid-feedback" style={{ display: 'block' }}>This Field is Required</span>)}
            </div>
            <div className="form-group">
                <label htmlFor="city">City</label>
                <input {...register("city",{required:true})} className="form-control"  placeholder="Enter City" ></input>
                {errors.city && (<span className="error invalid-feedback" style={{ display: 'block' }}>This Field is Required</span>)}
            </div>
            <div className="form-group">
                <label htmlFor="company">Company</label>
                <input {...register("company",{required:true})} className="form-control" placeholder="Enter Company" ></input>
                {errors.company && (<span className="error invalid-feedback" style={{ display: 'block' }}>This Field is Required</span>)}
            </div>
            <div className="form-group">
                <label htmlFor="address">Address</label>
                <textarea {...register("address")} className="form-control"  placeholder="Enter Address" ></textarea>
            </div>
            <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input {...register("phone",{required:true})} className="form-control"  placeholder="Enter Phone" ></input>
                {errors.phone && (<span className="error invalid-feedback" style={{ display: 'block' }}>This Field is Required</span>)}
            </div>
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" {...register("email",{required:true})} className="form-control"  placeholder="Enter Email" ></input>
                {errors.email && (<span className="error invalid-feedback" style={{ display: 'block' }}>This Field is Required</span>)}
            </div>
            <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea {...register("description")} className="form-control"  placeholder="Enter Description" ></textarea>
                
            </div>
            <div className="form-group">
                <input type="submit" className="btn btn-info" />
            </div>
        </form>
        </Content>
    </>
    )
}

export default DestinationEditForm
