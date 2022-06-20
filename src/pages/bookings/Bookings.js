import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';
import Content from '../../components/Content'
import DataTable from 'react-data-table-component';
import { API_URL } from '../../const';
import { useAuthState } from '../../context';
import Loading from '../Loading';
import moment from 'moment';

const Bookings = () => {

    const [loading, setLoading] = useState(false);
    const [bookings, setBookings] = useState([]);

    const userDetails = useAuthState();

    const fetchData = async () => {
        try {
            setLoading(true);
            let { data } = await axios.get(`${API_URL}/api/v1/booking?sort=asc`,{ headers: { Authorization: `Bearer ${userDetails.token}` }});
            if (data) {
                console.log(data);
                setBookings(data);
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    const columns = [
        {
            name: '#',
            selector: (row,index)=>index+1,
            sortable: true,
        },
        {
            name: 'code',
            selector: row=>row.code,
            sortable: true,
        },
        {
            name:'Book Date',
            selector: row=>row.createdAt,
            sortable:true,
            format: row=>moment(row.createdAt).format("DD-MM-YYYY")
        },
        {
            name:'Check In',
            selector: row=>row.checkin,
            sortable:true,
        },
        {
            name:'Check Out',
            selector: row=>row.checkout,
            sortable:true,
        },
        {
            name:'Status',
            selector: row=>row.status,
            sortable:true,
        },
        {
            name:'Amount',
            selector: row=>row.grossAmount,
            sortable:true,
            format:row=>row.grossAmount.toString().replace(/(.)(?=(\d{3})+$)/g, '$1.')
        },
        {
            name:'Action',
            cell:row=><div className="btn-group">
             <Link className="dropdown-item" to={{pathname:"/viewBooking", state:{booking:row}}}><i className="fas fa-eye mr-2"></i></Link>
        </div>
        }

    ];

    const customStyles = {
        header: {
          style: {
           marginTop:'0'
          },
        },
        headRow: {
          style: {
            padding:'0.3rem'
          },
        },
        headCells: {
          style: {
            fontSize:'16px',
          },
        },
        cells: {
          style: {
            fontSize:'12px',
            paddingTop:'1.1rem',
            paddingBottom:'0.5rem'
          },
        },
      };

    return (
        <>
        {loading && <Loading />}
    <Content title="Booking"
                subtitle="Books List"
                widget={() => {
                }}>
                <DataTable
                    data={bookings}
                    columns={columns}
                    customStyles={customStyles}
                    pagination 
                    paginationPerPage={5}
                    paginationRowsPerPageOptions={[5, 10, 15, 20, 25]}
                    />

            </Content>
        </>
    )
}

export default Bookings
