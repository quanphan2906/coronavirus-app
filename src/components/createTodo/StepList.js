import React, { Fragment } from "react";
import Step from "./Step";

function StepList(props) {
    const {
        todoInfo,
        validation,
        addStep,
        deleteStep,
        files,
        handleStepChange,
        handleImgChange
    } = props;
    return (
        <section className="steps-wrapper section">
            <div className="title pink-text text-darken-2 col l4 offset-l1">
                Steps
            </div>
            <div className="steps-container">
                {Object.entries(todoInfo.steps).map(([key, value]) => (
                    <Fragment key={key}>
                        <Step
                            isAuthor={true}
                            step={value}
                            index={key}
                            file={files.steps[key]}
                            onStepChange={handleStepChange}
                            onImgChange={handleImgChange}
                            deleteStep={deleteStep}
                            validation={validation.steps[key]}
                        />
                    </Fragment>
                ))}
            </div>
            <div className="container btn-add-container">
                <button
                    className="btn btn-floating pink right"
                    onClick={addStep}
                >
                    <i className="material-icons"> add </i>
                </button>
            </div>
        </section>
    );
}

export default StepList;
