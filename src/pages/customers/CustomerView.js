import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { Link, useHistory, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify';
import Content from '../../components/Content'
import ProfileContent from '../../components/ProfileContent';
import { API_URL } from '../../const';
import { useAuthState } from '../../context';
import Loading from '../Loading';
import AccountEditForm from './AccountEditForm';
import CustomerEditForm from './CustomerEditForm';

const CustomerView = () => {
    const {
        register,
        handleSubmit,
        getValues,
        setValue,
        setError,
        watch,
        formState: { errors }
    } = useForm();

    const [bookCount, setBookCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const userDetails = useAuthState();
    const history=useHistory();
    const customer = location.state.customer;

    const fetchBookCount = async () => {
        try {
            setLoading(true);
            let { data } = await axios.get(`${API_URL}/api/v1/booking/countCustomers/${location.state.customer.id}`);
            if (!data) {
                setLoading(false);
                return;
            }
            console.log(data);
            setBookCount(data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    }

    const fetchCustomerForm = () => {
        const customer = location.state.customer;
        setValue('firstName', customer.firstName);
        setValue('lastName', customer.lastName);
        setValue('country', customer.country);
        setValue('state', customer.state);
        setValue('city', customer.city);
        setValue('address', customer.address);
        setValue('phone', customer.phone);
    }

    const handleDelete=async()=>{
       try {
           let {data}=await axios.delete(`${API_URL}/api/v1/customer/${customer.id}`,{ headers: { Authorization: `Bearer ${userDetails.token}` }})
           if(!data){
               toast.info("Delete Customer Success");
               history.push("/customers")
           }
           toast.error("Delete Customer Failed");
           history.push("/customers")
        
        } catch (error) {
            toast.error("Delete Failed. This customer has booking(s) going on");
       }
    }

    useEffect(() => {
        fetchBookCount();
        fetchCustomerForm();
    }, [])

    return (
        <>
            <ProfileContent title="Profile"
                id={location.state.customer.id}
                firstName={customer.firstName}
                lastName={customer.lastName}
                handleDelete={handleDelete}
                bookingCount={bookCount}
                customerForm={<CustomerEditForm customer={customer}/>}
                accountForm={<AccountEditForm appUser={customer.appUser}/>}>
            
                
            </ProfileContent>
        </>
    )
}

export default CustomerView
