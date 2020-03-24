import React from "react";
import { Link, withRouter } from "react-router-dom";

function TodoSummary(props) {
    const { todo } = props;
    const handleSeeMore = () => {
        props.history.push(`/tododetail/created/${todo.id}`);
    };
    return (
        <div className="card">
            <div className="card-content-wrapper">
                <div className="card-content-container">
                    <div className="card-title pink-text text-darken-2">
                        {todo.title}
                    </div>
                    <div className="card-topic"> Type: {todo.type} </div>
                    <div className="card-content"> {todo.description}</div>
                    <div
                        className="card-see-more pink-text text-darken-2"
                        onClick={handleSeeMore}
                    >
                        See more
                    </div>
                </div>
                <div className="card-image">
                    <img src={todo.imgUrl} alt="" />
                </div>
            </div>
        </div>
    );
}

export default withRouter(TodoSummary);
