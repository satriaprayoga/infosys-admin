import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import Content from '../../components/Content'
import DataTable from 'react-data-table-component';
import { API_URL } from '../../const'
import { useAuthState } from '../../context'
import Loading from '../Loading'

const Customers = () => {
    const [loading, setLoading] = useState(false);
    const [customers, setCustomers] = useState([]);

    const userDetails = useAuthState();

    const fetchData = async () => {
        try {
            setLoading(true);
            let { data } = await axios.get(`${API_URL}/api/v1/customer/all`,{ headers: { Authorization: `Bearer ${userDetails.token}` }});
            if (data) {

                setCustomers(data);
            }
            console.log(data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const columns = [
        {
            name: '#',
            selector: (row,index)=>index+1,
            sortable: true,
        },
        {
            name: 'First Name',
            selector: row=>row.firstName,
            sortable: true,
        },
        {
            name: 'Last Name',
            selector: row=>row.lastName,
            sortable: true,
        },
        {
            name: 'Email',
            selector: row=>row.appUser.email,
            sortable: true,
        },
        {
            name: 'Phone',
            selector: row=>row.phone,
            sortable: true,
        },
        {
            name: 'Active',
            selector: row=>row.appUser.enabled?"yes":"no",
            sortable: true,
        },
        {
            name:'View',
            cell:row=><div className="btn-group">
            <button type="button" className="btn btn-default btn-flat">Action</button>
            <button type="button" className="btn btn-default btn-flat dropdown-toggle dropdown-icon" data-toggle="dropdown" aria-expanded="false">
                <span className="sr-only">Toggle Dropdown</span>
            </button>
            <div className="dropdown-menu" role="menu">
              
                <Link className="dropdown-item" to={{pathname:"/viewCustomer", state:{customer:row}}}><i className="fas fa-eye mr-2"></i> View</Link>
                
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
            fontSize:'16px',
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

        <Content title="Customers"
            subtitle="Customers List"
            widget={() => {
                return (
                    <Link to="/createCustomer" className="btn btn-block bg-gradient-primary">
                        <i className="fas fa-plus"></i>
                    </Link>

                )
            }}>
            <DataTable
                data={customers}
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

export default Customers
