import React from "react";

function Topic(props) {
    return (
        <section className="summary-wrapper row section">
            <div className="title pink-text text-darken-2 col l4 offset-l1">
                Choose your topic
            </div>
            <div className="col l4 offset-l1">{props.children}</div>
        </section>
    );
}

export default Topic;
