import axios from 'axios';
import React, { useState } from 'react'
import { useHistory, useLocation } from 'react-router'
import { toast } from 'react-toastify';
import Content from '../../components/Content'
import { API_URL } from '../../const';

const CountryImage = () => {

    const location = useLocation();
    const history = useHistory();
    const { state } = location
    const country=state.country;

    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);

    const handleChange = (e) => {
        setSelectedFile(e.target.files[0]);
        setIsFilePicked(true);
    }

    const handleSubmit = async() => {
        if(!selectedFile){
            toast.error("No file choosen!");
        }
        try {
            const formData=new FormData();
            formData.append('file',selectedFile);
            let {data}=await axios.post(`${API_URL}/api/v1/images/country/${state.country.id}`,formData);
            if(!data){
                toast.error('Error uploading file!');
               
            }else{
                toast.info('Finished uploading file!');
                history.push("/countries");
            }

        } catch (error) {
            toast.error('Error uploading file!');
        }
    }

    return (

        <Content title={`Image Cover for ${state.country.name}`} 
            widget={() => { }}
            footer={()=>(
                <button type="button" class="btn btn-info" onClick={handleSubmit}>Upload</button>
            )}>
            <div className="row mb3">
                <div className="col-sm-6">
                    <img className="img-fluid img-thumbnail" src={`${API_URL}/api/v1/images/country/${state.country.id}`} alt="User profile picture" />
                    <div className="form-group">
                        <div className="custom-file">
                        <input type="file" class="custom-file-input" id="exampleInputFile" onChange={handleChange}/>
                        <label class="custom-file-label" for="exampleInputFile">{isFilePicked?selectedFile.name:'Choose File'}</label>
                            {isFilePicked ? (
                               
                                <div>
                                    
                                    <p>Filename: {selectedFile.name}</p>
                                    <p>Filetype: {selectedFile.type}</p>
                                    <p>Size in bytes: {selectedFile.size}</p>
                                    <p>
                                        lastModifiedDate:{' '}
                                        {selectedFile.lastModifiedDate.toLocaleDateString()}
                                    </p>
                                </div>
                            ) : (
                                <p>Select a file to show details</p>
                            )}
                        </div>
                        
                    </div>
                </div>
            </div>
        </Content>
    )

}

export default CountryImage
