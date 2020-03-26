import React from "react";

function Description(props) {
    const {
        todoInfo,
        handleFormChange,
        validation,
        handleImgChange,
        files
    } = props;
    return (
        <section className="description-wrapper row section">
            <div className="col l5 offset-l1">
                <div className="title pink-text text-darken-2 section">
                    Description
                </div>
                <div className="input-field">
                    <textarea
                        className="content materialize-textarea"
                        placeholder="Some words to describe your brilliant idea"
                        id="description"
                        value={todoInfo.description}
                        onChange={handleFormChange}
                    />
                </div>
                <div className="red-text">{validation.description}</div>
            </div>
            <div className="col l1 offset-l1">
                <input type="file" onChange={handleImgChange} />
                <img
                    src={
                        todoInfo.imgUrl
                            ? todoInfo.imgUrl
                            : files.img
                            ? URL.createObjectURL(files.img)
                            : "https://via.placeholder.com/150"
                    }
                    alt=""
                />
            </div>
        </section>
    );
}

export default Description;
