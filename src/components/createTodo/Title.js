import React from "react";

function Title(props) {
    const { todoInfo, handleFormChange } = props;
    return (
        <div className="container todo-title-wrapper white lighten-3 z-depth-2">
            <div className="input-field">
                <textarea
                    id="title"
                    className="materialize-textarea"
                    placeholder="Set the title of your todo here"
                    value={todoInfo.title}
                    onChange={handleFormChange}
                />
            </div>
        </div>
    );
}

export default Title;
