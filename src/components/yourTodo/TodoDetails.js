import React from "react";
import Step from "../createTodo/Step";

function TodoDetails(props) {
    return (
        <div className="create-todo col s10 offset-m1 offset-l1">
            <div className="container todo-title-wrapper white lighten-3 z-depth-2">
                Create a React app
            </div>

            <section className="summary-wrapper row section">
                <div className="title pink-text text-darken-2 col l4 offset-l1">
                    {" "}
                    Summary{" "}
                </div>
                <div className="col l4 offset-l1">Topic: Crafting</div>
            </section>

            <div className="divider"></div>

            <section className="description-wrapper row section">
                <div className="col l5 offset-l1">
                    <div className="title pink-text text-darken-2 section">
                        {" "}
                        Description{" "}
                    </div>
                    <div className="">
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit. Consectetur ratione quibusdam, quaerat distinctio
                        nemo sunt culpa tempora labore eligendi accusamus, quam
                        dolorum! Nihil, error aut libero natus animi voluptas
                        illum?
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
                    <Step isAuthor={false} />
                    <Step isAuthor={false} />
                    <Step isAuthor={false} />
                    <Step isAuthor={false} />
                </div>
            </section>
        </div>
    );
}

export default TodoDetails;
