import React from 'react'

export default function Card() {
    return (
        <div className="card">
            <div className="card-img">
                <img 
                    src="https://thumbs.dreamstime.com/b/artist-s-workshop-items-children-s-creativity-wooden-background-acrylic-paint-brushes-white-wooden-background-pi-89795313.jpg"
                    width="100%" height="auto"/>
            </div>
            <div className="card-title">
                Card title
            </div>
            <div className="card-content">
                <p>I am a very simple card. I am good at containing small bits of information.
                I am convenient because I require little markup to use effectively.</p>
                <a href="/" className="right"> <i className="material-icons pink-text text-lighten-2"> more_horiz </i> </a>
            </div>
        </div>
    )
}
