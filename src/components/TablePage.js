import axios from 'axios';
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import { API_URL } from '../const';

const TablePage = (props) => {

    const [items,setItems]=useState([]);
    const [current,setCurrent]=useState(1);
    const [perPage,setPerPage]=useState(5);
    const [totalPage,setTotalPage]=useState(0);
    const [total,setTotal]=useState(0);

    const fetchInitalData=async()=>{
       try {
        const {sortParam,fetchUrl}=props;
        const {data}=await axios.get(`${API_URL}/api/v1/countrys?sort=desc`);//await axios.get(`${fetchUrl}?pageNo=${current-1}&pageSize=${perPage}&sort=${sortParam}`);
        if(!data){
            return ;
        }
        //console.log(data)
        setItems(data.content);
        setCurrent(data.number+1)
        setPerPage(data.size);
        setTotalPage(data.totalpages);
        setTotal(data.totalElements);
       } catch (error) {
           
       }
    }

    useEffect(() => {
        fetchInitalData();
    }, [])

    return (
        <>
        <DataTable
          data={items}
          columns={props.columns}
          pagination/>
        </>
    )
}

export default TablePage
