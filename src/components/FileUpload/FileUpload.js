import React from 'react'

const FileUpload = () => {
    return (
        <div className="row">
                <div className="col-md-6">
                        <div className="form-group files color">
                            <label>Upload Your File </label>
                            <input type="file" className="form-control" name="file"/>
                        </div>
                </div>
            </div>
    )
}

export default FileUpload
