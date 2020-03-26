import React, { useState, useEffect } from "react";

function UploadResult({ uploadResult }) {
    const [display, setDisplay] = useState("none");
    useEffect(() => {
        if (uploadResult) setDisplay("");
    }, [uploadResult]);

    const closeModal = () => {
        setDisplay("none");
    };

    const imgUrl =
        "https://www.pngitem.com/pimgs/m/23-230510_ok-check-todo-agenda-icon-symbol-tick-to.png";
    return (
        <div className="upload-result-wrapper" style={{ display: display }}>
            <div className="upload-result-container">
                <div>
                    <div className="close" onClick={closeModal}>
                        &times;
                    </div>
                </div>
                {uploadResult ? (
                    <>
                        <div className="upload-result-image">
                            <img src={imgUrl} alt="" />
                        </div>
                        <div className="upload-result">
                            {uploadResult === true ? (
                                <>Upload succeed</>
                            ) : (
                                <>Upload fail</>
                            )}
                        </div>
                    </>
                ) : (
                    false
                )}
            </div>
        </div>
    );
}

export default UploadResult;
