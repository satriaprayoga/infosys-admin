import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Content from '../../components/Content';
import { API_URL } from '../../const';
import { useAuthState } from '../../context';
import Loading from '../Loading';


const SiteInfo = () => {
    const [siteInfo, setSiteInfo] = useState({});
    const [socials, setSocials] = useState([]);
    const [loading, setLoading] = useState(false);

    const userDetails=useAuthState();

    const fetchSiteInfo = async () => {
        setLoading(true);
        try {
            let { data } = await axios.get(`${API_URL}/api/v1/site`)
            if (!data) { setLoading(false); return; }
            setSiteInfo(data);
            setLoading(false)
        } catch (error) {
            setLoading(false);
        }
        fetchSocials();
    }

    const fetchSocials = async () => {
        try {
            let { data } = await axios.get(`${API_URL}/api/v1/site/socials`);
            if (!data) {
                return;
            }
            setSocials(data);
        } catch (error) {

        }
    }

    const onDeleteSocial=async id=>{
        try {
            let {data}=await axios.delete(`${API_URL}/api/v1/site/socials/${id}`,{ headers: { Authorization: `Bearer ${userDetails.token}` }})
            if(!data){
                toast.error("Delete Social Media failed");
                return;
            }
            toast.info("Delete Social Media success");
            fetchSocials();
        } catch (error) {
            
        }
    }

    useEffect(() => {
        fetchSiteInfo();
    }, [])


    return (
        <>
            {loading && <Loading />}
            <Content title="Site Information"
                subtitle={siteInfo.uniqueIdentifier + ' site'}
                widget={() => {
                    return (
                        <>
                            <ul className="nav">
                                <li> <Link to={{ pathname: '/editSiteInfo', state: { siteInfo: siteInfo } }} className="btn btn-tool btn-sm">
                                    <i className="fas fa-edit"></i>
                                </Link></li>
                                <li> <Link to={{ pathname: '/imageSiteInfo', state: { siteInfo: siteInfo } }} className="btn btn-tool btn-sm">
                                    <i className="fas fa-camera"></i>
                                </Link></li>

                            </ul>
                        </>

                    )
                }}>
                <div className="row">
                    <div className="col-12 col-md-12 col-lg-4 order-1 order-md-2">
                        <h3 className="text-primary"><i className="fas fa-globe"></i>{siteInfo.companyName}</h3>
                        <p className="text-muted">{siteInfo.shortDescription}</p>

                        <div className="text-muted">
                            <p className="text-sm">Description
                            <b className="d-block">{siteInfo.description}</b>
                            </p>
                            <p className="text-sm">email
                            <b className="d-block">{siteInfo.email}</b>
                            </p>

                        </div>

                        <div className="text-muted">
                            <p className="text-sm">phone
                            <b className="d-block">{siteInfo.phone}</b>
                            </p>
                            <p className="text-sm">mobile
                            <b className="d-block">{siteInfo.mobile}</b>
                            </p>
                            <p className="text-sm">address
                            <b className="d-block">{siteInfo.address}</b>
                            </p>
                            <p className="text-sm">Terms & Conditions
                            <b className="d-block">{siteInfo.toc}</b>
                            </p>
                            <p className="text-sm">about
                            <b className="d-block">{siteInfo.about}</b>
                            </p>
                        </div>


                    </div>

                </div>
                <div className="row">
                    <div className="col-12 col-md-12 col-lg-4 order-1 order-md-2">
                        <h3>Social Media</h3>
                        {socials.map((item, index) => {
                            return (
                                <div className="text-muted" key={index}>
                                    <p className="text-sm">{item.provider}
                            <b className="d-block">{item.link} <i onClick={()=>onDeleteSocial(item.id)} className="fas fa-trash-alt mr-2"></i></b>
                           
                                    </p>
                                    
                                </div>
                            )
                        })}
                        <Link to="/createSocial" className="btn btn-info">Add</Link>
                    </div>

                </div>
            </Content>

        </>
    )
}

export default SiteInfo
