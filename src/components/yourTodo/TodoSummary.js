import React from "react";
import { Link, withRouter } from "react-router-dom";

function TodoSummary(props) {
    const handleSeeMore = () => {
        props.history.push(`/tododetail/created/${props.todo.id}`);
    };
    return (
        <div className="card">
            <div className="card-content-wrapper">
                <div className="card-content-container">
                    <div className="card-title pink-text text-darken-2">
                        Card title
                    </div>
                    <div className="card-topic"> Type: Crafting</div>
                    <div className="card-content">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Suscipit omnis molestiae rerum vero est id fuga.
                        Voluptates delectus iure, culpa non nam tempora labore,
                        repellendus odio molestiae, quaerat amet doloribus.
                    </div>
                    <div
                        className="card-see-more pink-text text-darken-2"
                        onClick={handleSeeMore}
                    >
                        See more
                    </div>
                </div>
                <div className="card-image">
                    <img
                        src="https://thumbs.dreamstime.com/b/artist-s-workshop-items-children-s-creativity-wooden-background-acrylic-paint-brushes-white-wooden-background-pi-89795313.jpg"
                        alt="beautiful-pic"
                    />
                </div>
            </div>
        </div>
    );
}

export default withRouter(TodoSummary);
