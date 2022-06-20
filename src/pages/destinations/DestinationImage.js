import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useHistory, useLocation } from 'react-router'
import { toast } from 'react-toastify';
import Content from '../../components/Content'
import { API_URL } from '../../const';
import Loading from '../Loading';


const DestinationImage = () => {

    const location = useLocation();
    const history = useHistory();
    const { state } = location
    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);
    const [loading,setLoading]=useState(false);

    const [images, setImages] = useState([]);

    const handleChange = (e) => {
        setSelectedFile(e.target.files[0]);
        setIsFilePicked(true);
    }

    const handleSubmit = async () => {
        if (!selectedFile) {
            toast.error("No file choosen!");
        }
        try {
            setLoading(true);
            const formData = new FormData();
            formData.append('file', selectedFile);
            let { data } = await axios.post(`${API_URL}/api/v1/images/destination/${state.destination.id}`, formData);
            if (!data) {
                toast.error('Error uploading file!');

            } else {
                toast.info('Finished uploading file!');
                history.push('/destinations');
            }
            setLoading(false);

        } catch (error) {
            toast.error('Error uploading file!');
            setLoading(false);
        }
    }

    const fetchImages = async () => {
        try {
            setLoading(true);
            let { data } = await axios.get(`${API_URL}/api/v1/images/destination/all/${state.destination.id}`);
            if (!data) {
               // toast.error('Error retrieve images');
               return;
            } else {
                setImages(data);
            }
            setLoading(false);
        } catch (error) {
            toast.error('Error retrieve images!');
            setLoading(false);
        }
    }

    const handleCover=id=>async() =>{
        try {
            setLoading(true);
            let cover={
                referer:state.destination.id,
                id:id,
                category:'DESTINATION'
            }
            console.log(cover);
            let { data } = await axios.put(`${API_URL}/api/v1/images/changeCover`,cover);
            if (!data) {
                toast.error('Error change cover');
            } else {
                history.push('/destinations');
            }
            setLoading(false);
        } catch (error) {
            toast.error('Error change cover!');
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchImages();
    }, [])

    return (
        <>
             {loading && <Loading />}
            <Content title={`Image Cover for ${state.destination.name}`}
                widget={() => { }}
                >
               
                <div className="row">
                    <div className="col-6">
                        <img className="img-fluid img-thumbnail" src={`${API_URL}/api/v1/images/destination/${state.destination.id}`} alt="User profile picture" />
                        <div className="form-group">
                            <div className="custom-file">
                                <input type="file" className="custom-file-input" id="exampleInputFile" onChange={handleChange} />
                                <label className="custom-file-label" for="exampleInputFile">{isFilePicked ? selectedFile.name : 'Choose File'}</label>
                                {isFilePicked ? (
                                    <>
                                    <div>

                                        <p>Filename: {selectedFile.name}</p>
                                        <p>Filetype: {selectedFile.type}</p>
                                        <p>Size in bytes: {selectedFile.size}</p>
                                        <p>
                                            lastModifiedDate:{' '}
                                            {selectedFile.lastModifiedDate.toLocaleDateString()}
                                        </p>
                                    </div>
                                    <button type="button" className="btn btn-info" onClick={handleSubmit}>Upload</button>
                                    </>
                                ) : (
                                    <p>Select a file to show details</p>
                                )}
                            </div>

                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-8">
                        <h1>Gallery</h1>
                        <div className="row">
                            {images.map((img, index) => {
                                return (
                                    <div className="col-md-4" key={index}>
                                        <div className="thumbnail">
                                                <div className="caption">
                                                    <img src={`${API_URL}/api/v1/images/view/${img.id}`} alt="Nature" style={{width:'100%'}}/>
                                                    <button type="button" className="btn btn-info" onClick={handleCover(img.id)}>Set As Cover</button>
                                                   
                                                </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </Content>

        </>
    )
}

export default DestinationImage
