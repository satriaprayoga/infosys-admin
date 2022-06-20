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


const AccomPackages = () => {

    const location=useLocation();
    const userDetails = useAuthState();

    const destination=location.state?location.state.destination:null;

    const title=destination===null?'':destination.name;
    const param=destination===null?'':'?destId='+destination.id;

    const [accomTypes,setAccomPackage]=useState([]);
    const [loading,setLoading]=useState(false);

    const handleDelete=id=>async()=>{
        try {
            setLoading(true);
            let {data}=await axios.delete(`${API_URL}/api/v1/accomTypes/${id}`,{ headers: { Authorization: `Bearer ${userDetails.token}` }})
            if(!data){return;}
           
            setLoading(false);
            
        } catch (error) {
            toast.error("Delete failed. This Destination may be has a Accomodation Packages attached")
            setLoading(false);
        }
        fetchData();
    }

    const fetchData=async()=>{
        try {
            setLoading(true);
           let api=API_URL+'/api/v1/accomTypes'.concat(param);
           let {data}=await axios.get(api);
           if (data) {
             
             setAccomPackage(data);
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    }

    const columns = [
        {
            name: '#',
            selector: (row,index)=>index+1,
            sortable: true,
        },
        {
            name: 'Name',
            selector: row=>row.type,
            sortable: true,
        },
        {
            name:'Destination',
            selector: row=>row.destination.name,
            sortable:true,
        },
        {
            name:'Front Cover',
            cell: row=> <Link to={{pathname:"/imageAccomPackage", state:{accomType:row}}}>
            <img className="profile-user-img img-fluid img-thumbnail" src={`${API_URL}/api/v1/images/accomType/${row.id}`} alt="User profile picture"/>
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
                <Link className="dropdown-item" to={{pathname:"/editAccomPackage", state:{accomType:row}}}><i className="fas fa-edit mr-2"></i> Edit</Link>
                <Link className="dropdown-item" to={{pathname:"/viewAccomPackage", state:{accomType:row}}}><i className="fas fa-eye mr-2"></i> View</Link>
                
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


    useEffect(() => {
        fetchData();
    }, [])

    return (
        <>
         {loading && <Loading />}
        <Content title={`Accomodation Packages ${title}`}
                subtitle="Accomodation Packages"
                widget={() => {
                    return(
                        <Link to={{pathname:"/createAccomPackage",state:{destination:(destination===null?null:destination)}}} className="btn btn-block bg-gradient-primary">
                            <i className="fas fa-plus"></i>
                        </Link>
                    )
                }}>
                 <DataTable
                    data={accomTypes}
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
                            <th>Type</th>
                            <th>Destination</th>
                            <th>Front Cover</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {accomTypes.length === 0 && <tr><td>Data Empty</td></tr>}
                        {accomTypes.map((accomType, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{accomType.type}</td>
                                    <td>{accomType.destination.name}</td>
                                    <td>
                                        <Link to={{pathname:"/imageAccomPackage", state:{accomType:accomType}}}>
                                            <img className="profile-user-img img-fluid img-thumbnail" src={`${API_URL}/api/v1/images/accomType/${accomType.id}`} alt="User profile picture"/>
                                        </Link>
                                    </td>
                                    <td>
                                        <div className="btn-group">
                                            <button type="button" className="btn btn-default btn-flat">Action</button>
                                            <button type="button" className="btn btn-default btn-flat dropdown-toggle dropdown-icon" data-toggle="dropdown" aria-expanded="false">
                                                <span className="sr-only">Toggle Dropdown</span>
                                            </button>
                                            <div className="dropdown-menu" role="menu">
                                                <div className="dropdown-item" style={{cursor:'pointer'}} onClick={handleDelete(accomType.id)}><i className="fas fa-trash-alt mr-2"></i> Delete</div>
                                                <Link className="dropdown-item" to={{pathname:"/editAccomPackage", state:{accomType:accomType}}}><i className="fas fa-edit mr-2"></i> Edit</Link>
                                                <Link className="dropdown-item" to={{pathname:"/viewAccomPackage", state:{accomType:accomType}}}><i className="fas fa-eye mr-2"></i> View</Link>
                                            </div>
                                        </div>
                                    </td>
                                    
                                </tr>
                            )
                        })}
                    </tbody>
                </table> */}
                

            </Content>
        </>
    )
}

export default AccomPackages
