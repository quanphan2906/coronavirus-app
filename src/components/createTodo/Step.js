import React from "react";

function Step(props) {
    const step = {
        content: props.step.content,
        imgUrl: props.file
            ? URL.createObjectURL(props.file)
            : props.step.imgUrl !== ""
            ? props.step.imgUrl
            : "https://via.placeholder.com/150"
    };
    return (
        <div className="step-item row">
            <div className="right close-icon">
                <i
                    className="material-icons"
                    onClick={() => {
                        props.deleteStep(props.index);
                    }}
                >
                    {" "}
                    close{" "}
                </i>
            </div>
            {props.isAuthor ? (
                <div className="input-field col l6 offset-l1">
                    <textarea
                        type="text"
                        id="step"
                        index={props.index}
                        className="materialize-textarea"
                        value={step.content}
                        onChange={e => {
                            props.onStepChange(e, props.index);
                        }}
                    />
                    <label htmlFor="step"> Step {props.index} </label>
                </div>
            ) : (
                <div className="col l6 offset-l1">
                    <div className="step-label"> Step {props.index} </div>
                    <p>{step.content}</p>
                </div>
            )}
            <div className="col l4 offset-l1">
                {props.isAuthor ? (
                    <input
                        type="file"
                        onChange={e => {
                            props.onImgChange(e, props.index);
                        }}
                    />
                ) : (
                    false
                )}

                <img src={step.imgUrl} alt="" />
            </div>
        </div>
    );
}

export default Step;
