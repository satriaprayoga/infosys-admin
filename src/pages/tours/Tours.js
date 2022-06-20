import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Content from '../../components/Content';
import DataTable from 'react-data-table-component';
import { API_URL } from '../../const';
import { useAuthState } from '../../context';
import Loading from '../Loading';

const Tours = () => {
    const location=useLocation();
    const userDetails = useAuthState();

    const tourType=location.state?location.state.tourType:null;

    const title=tourType===null?'':tourType.type;
    const param=tourType===null?'':'?tourTypeId='+tourType.id;

    const [tours,setTours]=useState([]);
    const [loading,setLoading]=useState(false);
    const fetchData=async()=>{
        try {
            setLoading(true);
           let api=API_URL+'/api/v1/tours'.concat(param);
           let {data}=await axios.get(api);
           if (data) {
             
             setTours(data);
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    }

    const handleDelete=id=>async()=>{
        try {
            setLoading(true);
            let {data}=await axios.delete(`${API_URL}/api/v1/tours/${id}`,{ headers: { Authorization: `Bearer ${userDetails.token}` }})
            if(!data){return;}
           
            setLoading(false);
            
        } catch (error) {
            toast.error("Delete failed")
            setLoading(false);
        }
        fetchData();
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
            name: 'Type',
            selector: row=>row.tourType.type,
            sortable: true,
        },
        {
            name:'Destination',
            selector: row=>row.destination,
            sortable:true,
        },
        {
            name:'Front Cover',
            cell: row=> <Link to={{pathname:"/imageTour", state:{tour:row}}}>
            <img className="profile-user-img img-fluid img-thumbnail" src={`${API_URL}/api/v1/images/tour/${row.id}`} alt="User profile picture"/>
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
                <Link className="dropdown-item" to={{pathname:"/editTour", state:{tour:row}}}><i className="fas fa-edit mr-2"></i> Edit</Link>
                <Link className="dropdown-item" to={{pathname:"/viewTour", state:{tour:row}}}><i className="fas fa-eye mr-2"></i> View</Link>
                
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



    return (
        <>
        {loading && <Loading />}
       <Content title={`Tours ${title}`}
               subtitle="Tours"
               widget={() => {
                return(
                    <Link to={{pathname:"/createTour",state:{tourType:(tourType===null?null:tourType)}}} className="btn btn-block bg-gradient-primary">
                        <i className="fas fa-plus"></i>
                    </Link>
                )
            }}>
                <DataTable
                    data={tours}
                    columns={columns}
                    customStyles={customStyles}
                    pagination 
                    paginationPerPage={5}
                    paginationRowsPerPageOptions={[5, 10, 15, 20, 25]}
                    />
               {/* <table className="table table-hover text-nowrap">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Destination</th>
                            <th>Front Cover</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tours.length === 0 && <tr><td>Data Empty</td></tr>}
                        {tours.map((tour, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{tour.name}</td>
                                    <td>{tour.tourType.type}</td>
                                    <td>{tour.destination}</td>
                                    <td>
                                        <Link to={{pathname:"/imageTour", state:{tour:tour}}}>
                                            <img className="profile-user-img img-fluid img-thumbnail" src={`${API_URL}/api/v1/images/tour/${tour.id}`} alt="User profile picture"/>
                                        </Link>
                                    </td>
                                    <td>
                                        <div className="btn-group">
                                            <button type="button" className="btn btn-default btn-flat">Action</button>
                                            <button type="button" className="btn btn-default btn-flat dropdown-toggle dropdown-icon" data-toggle="dropdown" aria-expanded="false">
                                                <span className="sr-only">Toggle Dropdown</span>
                                            </button>
                                            <div className="dropdown-menu" role="menu">
                                            <div className="dropdown-item" style={{cursor:'pointer'}} onClick={handleDelete(tour.id)}><i className="fas fa-trash-alt mr-2"></i> Delete</div>
                                                <Link className="dropdown-item" to={{pathname:"/editTour", state:{tour:tour}}}><i className="fas fa-edit mr-2"></i> Edit</Link>
                                                <Link className="dropdown-item" to={{pathname:"/viewTour", state:{tour:tour}}}><i className="fas fa-eye mr-2"></i> View</Link>
                                            </div>
                                        </div>
                                    </td>
                                    
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                 */}

           </Content>
       </>
    )
}

export default Tours
