import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';
import Content from '../../components/Content'
import DataTable from 'react-data-table-component';
import { API_URL } from '../../const';
import { useAuthState } from '../../context';
import Loading from '../Loading';

const Destinations = () => {

    const [loading, setLoading] = useState(false);
    const [destinations, setDestinations] = useState([]);

    const userDetails = useAuthState();

    const handleDelete=id=>async()=>{
        try {
            setLoading(true);
            let {data}=await axios.delete(`${API_URL}/api/v1/destinations/${id}`,{ headers: { Authorization: `Bearer ${userDetails.token}` }})
            if(!data){return;}
           
            setLoading(false);
            
        } catch (error) {
            toast.error("Delete failed. This Destination may be has a Tour Packages attached")
            setLoading(false);
        }
        fetchData();
    }

    const fetchData = async () => {
        try {
            setLoading(true);
            let { data } = await axios.get(`${API_URL}/api/v1/destinations?sort=asc`);
            if (data) {
             
                setDestinations(data);
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
            name: 'Name',
            selector: row=>row.name,
            sortable: true,
        },
        {
            name:'Country',
            selector: row=>row.country,
            sortable:true,
        },
        {
            name:'State',
            selector: row=>row.state,
            sortable:true,
        },
        {
            name:'City',
            selector: row=>row.city,
            sortable:true,
        },
        {
            name:'Front Cover',
            cell: row=> <Link to={{pathname:"/imageDestination", state:{destination:row}}}>
            <img className="profile-user-img img-fluid img-thumbnail" src={`${API_URL}/api/v1/images/destination/${row.id}`} alt="User profile picture"/>
        </Link>
        },
        {
            name:'Action',
            cell:row=><div className="btn-group">
            <button type="button" className="btn btn-default btn-flat">Action</button>
            <button type="button" className="btn btn-default btn-flat dropdown-toggle dropdown-icon" data-toggle="dropdown" aria-expanded="false">
                <span className="sr-only">Toggle Dropdown</span>
            </button>
            <div className="dropdown-menu" role="menu">
                <div className="dropdown-item" style={{cursor:'pointer'}} onClick={handleDelete(row.id)}><i className="fas fa-trash-alt mr-2"></i> Delete</div>
                <Link className="dropdown-item" to={{pathname:"/editDestination", state:{destination:row}}}><i className="fas fa-edit mr-2"></i> Edit</Link>
                <Link className="dropdown-item" to={{pathname:"/viewDestination", state:{destination:row}}}><i className="fas fa-eye mr-2"></i> View</Link>
                
            </div>
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
            fontSize:'18px',
          },
        },
        cells: {
          style: {
            fontSize:'14px',
            paddingTop:'1.1rem',
            paddingBottom:'0.5rem'
          },
        },
      };

    return(
        <>
        {loading && <Loading />}
    <Content title="Destinations"
                subtitle="Destinations List"
                widget={() => {
                    return (
                        <Link to="/createDestination" className="btn btn-block bg-gradient-primary">
                            <i className="fas fa-plus"></i>
                        </Link>

                    )
                }}>
                <DataTable
                    data={destinations}
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

export default Destinations
