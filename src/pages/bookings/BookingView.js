import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router';
import BookingContent from '../../components/BookingContent'
import { API_URL } from '../../const';
import { useAuthState } from '../../context';

const BookingView = () => {
    const location = useLocation();
    const userDetails = useAuthState();
    const history=useHistory();
    const booking = location.state.booking;

    const [siteInfo,setSiteInfo]=useState({});
    const [items,setItems]=useState([]);
    const [loading,setLoading]=useState(false);

    const fetchSiteInfo=async()=>{
        setLoading(true);
        try {
            let {data}=await axios.get(`${API_URL}/api/v1/site`)
            if(!data){setLoading(false);return;}
            setSiteInfo(data);
            fetchItems();
            setLoading(false)
        } catch (error) {
            setLoading(false);
        }
    }

    const fetchItems=async()=>{
        setLoading(true);
        try {
            let {data}=await axios.get(`${API_URL}/api/v1/booking/details/${booking.id}`,{ headers: { Authorization: `Bearer ${userDetails.token}` }})
            if(!data){setLoading(false);return;}
            console.log(data);
            setItems(data);
            setLoading(false)
        } catch (error) {
            setLoading(false);
        }
       
    }

    useEffect(() => {
        fetchSiteInfo();
        
    }, [])

    return (
        <div>
            <BookingContent booking={booking} siteInfo={siteInfo} items={items}/>
        </div>
    )
}

export default BookingView
