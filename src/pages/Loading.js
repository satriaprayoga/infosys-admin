import React, { useEffect, useState } from 'react'

const Loading = () => {

    const [loading,setLoading]=useState(false);
    const [data,setData]=useState([]);

    const loadData=async()=>{
        try{
            setLoading(true);
        }catch(error){

        }
    }
    
    return (
        <>
        <div className="card card-outline card-primary">
                <div className="card-header text-center">
                <b>Loading...</b>
                </div>
                
            </div>
        </>
    )
}

export default Loading
