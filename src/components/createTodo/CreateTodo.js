import React from "react";
import FilterBar from "../whatTodo/FilterBar";
import Step from "./Step";

function CreateTodo() {
    const topics = ["Learning websites", "Craft", "Cooking"];
    return (
        <div className="create-todo col s10 offset-m1 offset-l1">
            <div className="container todo-title-wrapper white lighten-3 z-depth-2">
                <div className="input-field">
                    <textarea
                        id="todo-title-input"
                        className="materialize-textarea"
                        placeholder="Set the title of your todo here"
                    />
                </div>
            </div>

            <section className="summary-wrapper row section">
                <div className="title pink-text text-darken-2 col l4 offset-l1">
                    {" "}
                    Choose your topic{" "}
                </div>
                <div className="col l4 offset-l1">
                    {" "}
                    <FilterBar
                        title={"topics"}
                        options={topics}
                        multiple={false}
                    />{" "}
                </div>
            </section>

            <div className="divider"></div>

            <section className="description-wrapper row section">
                <div className="col l5 offset-l1">
                    <div className="title pink-text text-darken-2 section">
                        {" "}
                        Description{" "}
                    </div>
                    <div className="input-field">
                        <textarea
                            className="content materialize-textarea"
                            placeholder="Some words to describe your brilliant idea"
                        />
                    </div>
                </div>
                <div className="col l1 offset-l1">
                    <img
                        src="https://thumbs.dreamstime.com/b/artist-s-workshop-items-children-s-creativity-wooden-background-acrylic-paint-brushes-white-wooden-background-pi-89795313.jpg"
                        alt=""
                    />
                </div>
            </section>

            <div className="divider"></div>

            <section className="steps-wrapper section">
                <div className="title pink-text text-darken-2 col l4 offset-l1">
                    {" "}
                    Steps{" "}
                </div>
                <div className="steps-container">
                    <Step isAuthor={true} />
                    <Step isAuthor={true} />
                    <Step isAuthor={true} />
                    <Step isAuthor={true} />
                </div>
                <div className="container btn-add-container">
                    <button className="btn btn-floating pink right">
                        <i className="material-icons"> add </i>
                    </button>
                </div>
            </section>

            <div className="divider"></div>
            <div className="section center">
                <button className="btn pink">
                    Publish <i class="material-icons right">send</i>
                </button>
            </div>
        </div>
    );
}

export default CreateTodo;
