import axios from "axios";
import { useForm } from "react-hook-form";
import { useHistory, useLocation } from "react-router";
import { toast } from "react-toastify";
import Content from "../../components/Content";
import { API_URL } from "../../const";
import { useAuthState } from "../../context";

const SocialForm = () => {

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

    const onSubmit=async formData=>{
        try {
            let {data}=await axios.post(`${API_URL}/api/v1/site/socials`,formData,{ headers: { Authorization: `Bearer ${userDetails.token}` }});
            if(!data){
                toast.error("Save social media failed, server error");
                return;
            }
            toast.info("Save a new social media!");
            history.push('/siteInfo');
        } catch (error) {
            toast.error("Save social media failed, server error");
        }
    }

    return (
        <>
            <Content title="Add new Social Media" widget={()=>{}}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <label htmlFor="provider">Provider</label>
                    <select className="form-control" {...register("provider",{required:true})}>
                            <option value="">Select Provider</option>
                            <option value="facebook">Facebook</option>
                            <option value="twitter">Twitter</option>
                            <option value="linkedin">LinkedIn</option>
                            <option value="google">Google</option>
                            <option value="youtube">Google</option>
                            <option value="instagram">Instagram</option>
                    </select>
                    {errors.provider && (<span className="error invalid-feedback" style={{ display: 'block' }}>This Field is Required</span>)}
                </div>
                <div className="form-group">
                    <label htmlFor="link">Link</label>
                    <input placeholder="Enter Link" {...register("link",{required:true})} className="form-control"></input>
                    {errors.link && (<span className="error invalid-feedback" style={{ display: 'block' }}>This Field is Required</span>)}
                </div>
                
                <div className="form-group">
                    <input type="submit" className="btn btn-info" />
                </div>
            </form>
            </Content>
        </>
    )
}

export default SocialForm
