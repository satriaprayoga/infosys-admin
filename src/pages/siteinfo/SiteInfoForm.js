import axios from 'axios';
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useHistory, useLocation } from 'react-router'
import { toast } from 'react-toastify';
import Content from '../../components/Content';
import { API_URL } from '../../const';
import { useAuthState } from '../../context';

const SiteInfoForm = () => {

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors }
    } = useForm();

    const location = useLocation();
    const history = useHistory();
    const userDetails = useAuthState();

    const {siteInfo}=location.state;

    const onSubmit=async formData=>{
         try {
            let {data}= await axios.put(`${API_URL}/api/v1/site`,formData,{ headers: { Authorization: `Bearer ${userDetails.token}` }})
            if(!data){
              toast.error("Error update site info");
            }
            toast.info("Update Site Info Succeeded")
            history.push('/siteInfo');
        } catch (error) {
             
         }
    }

    useEffect(() => {
        setValue("uniqueIdentifier",siteInfo.uniqueIdentifier);
        setValue("companyName",siteInfo.companyName);
        setValue("description",siteInfo.description);
        setValue("shortDescription",siteInfo.shortDescription);
        setValue("email",siteInfo.email);
        setValue("phone",siteInfo.phone);
        setValue("address",siteInfo.address);
        setValue("toc",siteInfo.toc);
        setValue("about",siteInfo.about);

    }, [])

    return (
        <>
            <Content title={'Edit '+siteInfo.uniqueIdentifier} widget={()=>{}}>
            <form onSubmit={handleSubmit(onSubmit)}>
        
                <div className="form-group">
                    <label htmlFor="companyName">Company Name</label>
                    <input placeholder="Enter Name" {...register("companyName",{required:true})} className="form-control"></input>
                    {errors.name && (<span className="error invalid-feedback" style={{ display: 'block' }}>This Field is Required</span>)}
                </div>
                <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <textarea {...register("address")} className="form-control"  placeholder="Enter Address"></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Phone</label>
                    <input {...register("phone",{required:true})} className="form-control"  placeholder="Enter Phone"></input>
                    {errors.phone && (<span className="error invalid-feedback" style={{ display: 'block' }}>This Field is Required</span>)}
                </div>
                <div className="form-group">
                    <label htmlFor="mobile">Mobile</label>
                    <input {...register("mobile",{required:true})} className="form-control"  placeholder="Enter Phone"></input>
                    {errors.phone && (<span className="error invalid-feedback" style={{ display: 'block' }}>This Field is Required</span>)}
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" {...register("email",{required:true})} className="form-control"  placeholder="Enter Email"></input>
                    {errors.email && (<span className="error invalid-feedback" style={{ display: 'block' }}>This Field is Required</span>)}
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea {...register("description")} className="form-control"  placeholder="Enter Address"></textarea>
                    
                </div>
                <div className="form-group">
                    <label htmlFor="shortDescription">Short Description</label>
                    <textarea {...register("shortDescription")} className="form-control"  placeholder="Enter Address"></textarea>
                    
                </div>
                <div className="form-group">
                    <label htmlFor="about">About</label>
                    <textarea {...register("about")} className="form-control"  placeholder="Enter Address"></textarea>
                    
                </div>
                <div className="form-group">
                    <label htmlFor="toc">TOC</label>
                    <textarea {...register("toc")} className="form-control"  placeholder="Enter Address"></textarea>
                    
                </div>
                <div className="form-group">
                    <input type="submit" className="btn btn-info" />
                </div>
            </form>
            </Content>
        </>
    )
}

export default SiteInfoForm
