import React from "react";
import Loader from "../layout/Loader";
import UploadResult from "./UploadResult";

function Publish(props) {
    const { handleFormSubmit, uploading, uploadResult } = props;
    return (
        <div className="section center">
            <button className="btn pink" onClick={handleFormSubmit}>
                {!uploading ? (
                    <>
                        Publish <i className="material-icons right">send</i>
                    </>
                ) : (
                    <>Loading...</>
                )}
            </button>
            <UploadResult uploadResult={uploadResult} />
            {uploading ? <Loader /> : false}
        </div>
    );
}

export default Publish;
