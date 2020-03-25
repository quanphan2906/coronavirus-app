import React, { useContext } from "react";
import { withRouter } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

function Card(props) {
    const { auth } = useContext(AuthContext);
    const { todo } = props;
    const toTodoDetail = () => {
        if (!auth) {
            props.history.push(`/tododetail/guest/${todo.id}`);
        } else {
            if (auth.id === todo.author) {
                props.history.push(`/tododetail/created/${todo.id}`);
            } else {
                props.history.push(`/tododetail/guest/${todo.id}`);
            }
        }
    };
    return (
        <div className="card">
            <div className="card-img">
                <img src={todo.imgUrl} width="100%" height="auto" />
            </div>
            <div className="card-title"> {todo.title} </div>
            <div className="card-content">
                <p>{todo.description}</p>
                <i
                    className="material-icons pink-text text-lighten-2 right"
                    onClick={toTodoDetail}
                >
                    more_horiz
                </i>
            </div>
        </div>
    );
}

export default withRouter(Card);
