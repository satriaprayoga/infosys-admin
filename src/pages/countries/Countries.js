import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import Content from '../../components/Content'
import DataTable from 'react-data-table-component';
import { API_URL } from '../../const'
import { useAuthState } from '../../context'
import Loading from '../Loading'

const Countries = () => {

    const [loading, setLoading] = useState(false);
    const [countries, setCountries] = useState([]);

    const userDetails = useAuthState();

    const handleDelete = id => async () => {
        try {
            setLoading(true);
            let { data } = await axios.delete(`${API_URL}/api/v1/countrys/${id}`, { headers: { Authorization: `Bearer ${userDetails.token}` } })
            if (!data) { return; }

            setLoading(false);

        } catch (error) {
            toast.error("Delete failed. This Country may be has a Destination attached")
            setLoading(false);
        }
        fetchData();
    }

    const fetchData = async () => {
        try {
            setLoading(true);
            let { data } = await axios.get(`${API_URL}/api/v1/countrys?sort=desc`);
            if (data) {

                setCountries(data);
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
            name:'Front Cover',
            cell: row=> <Link to={{pathname:"/imageCountry", state:{country:row}}}>
            <img className="profile-user-img img-fluid img-thumbnail" src={`${API_URL}/api/v1/images/country/${row.id}`} alt="User profile picture"/>
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
                <Link className="dropdown-item" to={{pathname:"/editCountry", state:{id:row.id}}}><i className="fas fa-edit mr-2"></i> Edit</Link>
                
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
            fontSize:'16px',
            paddingTop:'1.1rem',
            paddingBottom:'0.5rem'
          },
        },
      };
      

    return (
        <>
            {loading && <Loading />}

            <Content title="Countries"
                subtitle="Countries List"
                widget={() => {
                    return (
                        <Link to="/createCountry" className="btn btn-block bg-gradient-primary">
                            <i className="fas fa-plus"></i>
                        </Link>

                    )
                }}>
                <DataTable
                    data={countries}
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

export default Countries
