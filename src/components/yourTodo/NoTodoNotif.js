import React from "react";
import { withRouter } from "react-router-dom";

function NoTodoNotif(props) {
    const redirectToCreateTodo = () => {
        props.history.push("/createtodo");
    };
    const imgLink =
        "https://ichef.bbci.co.uk/news/660/cpsprodpb/C6DC/production/_107080905_gettyimages-654239286.jpg";
    return (
        <div className="no-todo-notif-wrapper">
            <div className="no-todo-notif-container">
                <div className="no-todo-notif">
                    <div className="no-todo-image">
                        <img src={imgLink} alt="" />
                    </div>
                    <div className="no-todo-title">
                        You haven't had any Todo yet!
                    </div>
                    <div className="no-todo-content">
                        <p> You haven't had any Todo for the CoronaVibes! </p>
                    </div>
                    <div className="divider"></div>
                    <div className="create-button">
                        <p> But you can create some Todos right now! </p>
                        <div className="button-container">
                            <button
                                className="btn"
                                onClick={redirectToCreateTodo}
                            >
                                Create Todo
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default withRouter(NoTodoNotif);
