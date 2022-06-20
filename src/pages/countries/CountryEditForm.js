import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router';
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


const CountryEditForm = () => {
    const [values, setValues] = useState({
        name: ''
    })
    const [errors, setErrors] = useState({ name: '' })
    const userDetails = useAuthState();
    const history = useHistory();
    const location = useLocation();

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: [e.target.value] })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let formErrors = validation(values);
        if (Object.keys(formErrors).length === 0) {
            //console.log(userDetails.token);
            try {
                console.log(values);
                let { data } = await axios.put(`${API_URL}/api/v1/countrys`, { name: values.name, id:location.state.id }, { headers: { Authorization: `Bearer ${userDetails.token}` } });
                if (data) {
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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { id } = location.state;
                let { data } = await axios.get(`${API_URL}/api/v1/countrys/${id}`);
                if (data) {
                    setValues({ name: data.name })
                }
            } catch (error) {
                console.log(error.response);
            }
        }
        fetchData();
    }, [])

    return (
        <Content title="Edit Country" widget={() => { }}>
            <form onSubmit={handleSubmit} noValidate>
                <div className="form-group">
                    <input type="hidden" name="id" value={values.id} noValidate></input>
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name"
                        className={errors.name ? 'form-control is-invalid' : 'form-control'}
                        placeholder="Enter Name"
                        value={values.name} onChange={(e) => setValues({ [e.target.name]: e.target.value })} noValidate></input>
                    {errors.name && (
                        <span className="error invalid-feedback" style={{ display: 'block' }}>{errors.name}</span>
                    )}
                </div>
                <button type="submit" className="btn btn-primary">Save</button>
            </form>
        </Content>
    )
}

export default CountryEditForm
