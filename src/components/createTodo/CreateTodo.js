import React, { useState, useEffect } from "react";
import FilterBar from "../whatTodo/FilterBar";
import Step from "./Step";
import services from "../../services";

function CreateTodo(props) {
    const topics = ["Learning websites", "Craft", "Cooking"];
    const [todoInfo, setTodoInfo] = useState({
        title: "",
        type: "",
        description: "",
        imgUrl: "",
        steps: [],
        author: "",
        createdAt: "",
        users: []
    });
    const [isTodoInfoReady, setIsTodoInfoReady] = useState(false);
    useEffect(() => {
        const todoId = props.match.params.todoId;
        const fetchData = async () => {
            const todoInfoRes = await services.render("todos", todoId);
            if (todoInfoRes) {
                setTodoInfo(todoInfoRes);
                setIsTodoInfoReady(true);
            } else {
                props.history.push("/yourtodos/created/1");
            }
        };
        if (todoId) fetchData();
    }, []);
    const handleFormChange = e => {
        console.log(e.target.getAttribute("name"));
        // setTodoInfo({
        //     ...todoInfo,
        //     [e.target.value]:
        // })
        console.log(e.target.value);
        // TODO: tackle this handleFormChange
    };
    return isTodoInfoReady ? (
        <div className="create-todo col s10 offset-m1 offset-l1">
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

            <section className="summary-wrapper row section">
                <div className="title pink-text text-darken-2 col l4 offset-l1">
                    Choose your topic
                </div>
                <div className="col l4 offset-l1">
                    <FilterBar
                        title={"topics"}
                        options={topics}
                        multiple={false}
                        id={"type"}
                        onChange={handleFormChange}
                    />
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
                            id="description"
                            value={todoInfo.description}
                            onChange={handleFormChange}
                        />
                    </div>
                </div>
                <div className="col l1 offset-l1">
                    <img
                        src="https://thumbs.dreamstime.com/b/artist-s-workshop-items-children-s-creativity-wooden-background-acrylic-paint-brushes-white-wooden-background-pi-89795313.jpg"
                        value="https://thumbs.dreamstime.com/b/artist-s-workshop-items-children-s-creativity-wooden-background-acrylic-paint-brushes-white-wooden-background-pi-89795313.jpg"
                        alt=""
                        id="imgUrl"
                    />
                    {/* TODO: tackle img tags for the users to upload photos */}
                </div>
            </section>

            <div className="divider"></div>

            <section className="steps-wrapper section">
                <div className="title pink-text text-darken-2 col l4 offset-l1">
                    {" "}
                    Steps{" "}
                </div>
                <div className="steps-container">
                    {todoInfo.steps.length ? (
                        <>
                            {todoInfo.steps.map((step, index) => (
                                <Step
                                    isAuthor={true}
                                    step={step}
                                    index={index}
                                    onChange={handleFormChange}
                                />
                            ))}
                        </>
                    ) : (
                        <Step
                            isAuthor={true}
                            index={1}
                            onChange={handleFormChange}
                        />
                    )}
                </div>
                <div className="container btn-add-container">
                    <button className="btn btn-floating pink right">
                        <i className="material-icons"> add </i>
                    </button>
                </div>
            </section>

            <div className="section center">
                <button className="btn pink">
                    Publish <i className="material-icons right">send</i>
                </button>
            </div>
        </div>
    ) : (
        <div className="loading-container">
            <div className="lds-roller">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
}

export default CreateTodo;
