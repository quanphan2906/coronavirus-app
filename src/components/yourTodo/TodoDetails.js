import React, { useState, useEffect } from "react";
import Step from "../createTodo/Step";
import services from "../../services";
import Loader from "../layout/Loader";

function TodoDetails(props) {
    const [todoInfo, setTodoInfo] = useState({
        title: "",
        type: "",
        description: "",
        imgUrl: "",
        steps: {
            1: {
                content: "",
                imgUrl: ""
            }
        },
        author: "",
        createdAt: "",
        users: []
    });
    const [isTodoInfoReady, setIsTodoInfoReady] = useState(false);
    console.log(props.history);
    useEffect(() => {
        const todoId = props.match.params.todoId;
        const fetchData = async () => {
            const todoInfoRes = await services.render("todos", todoId);
            if (todoInfoRes) {
                setTodoInfo(todoInfoRes);
                setIsTodoInfoReady(true);
            } else {
                props.history.push("/whattodo/1");
            }
        };
        fetchData();
    }, [props.match.params.todoId, props.history]);

    return isTodoInfoReady ? (
        <div className="create-todo col s10 offset-m1 offset-l1">
            <div className="container todo-title-wrapper white lighten-3 z-depth-2">
                {todoInfo.title}
            </div>

            <section className="summary-wrapper row section">
                <div className="title pink-text text-darken-2 col l4 offset-l1">
                    Summary
                </div>
                <div className="col l4 offset-l1">Topic: {todoInfo.type} </div>
            </section>

            <div className="divider"></div>

            <section className="description-wrapper row section">
                <div className="col l5 offset-l1">
                    <div className="title pink-text text-darken-2 section">
                        {" "}
                        Description{" "}
                    </div>
                    <div className="">{todoInfo.description}</div>
                </div>
                <div className="col l1 offset-l1">
                    <img src={todoInfo.imgUrl} alt="" />
                </div>
            </section>

            <div className="divider"></div>

            <section className="steps-wrapper section">
                <div className="title pink-text text-darken-2 col l4 offset-l1">
                    Steps
                </div>
                <div className="steps-container">
                    {Object.entries(todoInfo.steps).map(([key, value]) => (
                        <Step
                            key={key}
                            isAuthor={false}
                            step={value}
                            index={key}
                        />
                    ))}
                </div>
            </section>
        </div>
    ) : (
        <Loader />
    );
}

export default TodoDetails;
