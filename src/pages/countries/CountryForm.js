import axios from 'axios';
import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router';
import Content from '../../components/Content'
import { API_URL } from '../../const';
import { useAuthState } from '../../context';

const validation = (values) => {
    let errors = {};
    if (!values.name || values.name.length === 0 || values.name === '') {
        errors.name = "Name is Required"
    }

    return errors;
}

const CountryForm = () => {

    const [values, setValues] = useState({
            name: '',
    })
    const [errors, setErrors] = useState({ name: '' })
    const userDetails = useAuthState();
    const history=useHistory();

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: [e.target.value] })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let formErrors = validation(values);
        if (Object.keys(formErrors).length === 0) {
            //console.log(userDetails.token);
           try {
            let {data}=await axios.post(`${API_URL}/api/v1/countrys`,{name:values.name[0]},{ headers: { Authorization: `Bearer ${userDetails.token}` }});
            if(data){
                console.log(data);
                history.push('/countries');
            }
           } catch (error) {
               console.log(error.response.data);
           }
            
        } else {
            setErrors(formErrors);
        }
        console.log(formErrors);
    }

    return (
        <Content title="Add New Country" widget={() => { }}>
            <form onSubmit={handleSubmit} noValidate>
                <div className="form-group">
                    <label for="name">Name</label>
                    <input type="text" name="name"
                        className={errors.name ? 'form-control is-invalid' : 'form-control'}
                        placeholder="Enter Name"
                        value={values.name} onChange={handleChange} noValidate></input>
                    {errors.name && (
                        <span className="error invalid-feedback" style={{ display: 'block' }}>{errors.name}</span>
                    )}
                </div>
                <button type="submit" className="btn btn-primary">Add</button>
            </form>
        </Content>
    )
}

export default CountryForm
