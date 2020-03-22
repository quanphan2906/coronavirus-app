import React from "react";

function Step(props) {
    return (
        <div className="step-item row">
            {props.isAuthor ? (
                <div className="input-field col l6 offset-l1">
                    <textarea
                        type="text"
                        id="step"
                        className="materialize-textarea"
                    />
                    <label htmlFor="step"> Step 1 </label>
                </div>
            ) : (
                <div className="col l6 offset-l1">
                    <div className="step-label"> Step 1 </div>
                    <p>
                        {" "}
                        Lorem ipsum dolor sit, amet consectetur adipisicing
                        elit. Dicta quis, animi deleniti adipisci vel quasi
                        quibusdam, cum perferendis amet nisi officia ab quia
                        beatae ad accusantium impedit delectus error fuga?{" "}
                    </p>
                </div>
            )}
            <div className="col l4 offset-l1">
                <img
                    src="https://thumbs.dreamstime.com/b/artist-s-workshop-items-children-s-creativity-wooden-background-acrylic-paint-brushes-white-wooden-background-pi-89795313.jpg"
                    alt=""
                />
            </div>
        </div>
    );
}

export default Step;
