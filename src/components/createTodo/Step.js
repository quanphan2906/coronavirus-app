import React from "react";

function Step(props) {
    const step = props.step
        ? {
              content: props.step.content,
              imgUrl: props.step.content
          }
        : {
              content: "",
              imgUrl: "https://via.placeholder.com/150"
          };
    return (
        <div className="step-item row">
            {props.isAuthor ? (
                <div className="input-field col l6 offset-l1">
                    <textarea
                        type="text"
                        id="step"
                        index={props.index}
                        className="materialize-textarea"
                        value={step.content}
                        onChange={props.onChange}
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
                <img src={step.imgUrl} alt="" />
            </div>
        </div>
    );
}

export default Step;
