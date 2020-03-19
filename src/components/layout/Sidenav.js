import React, { useState, useEffect, useContext } from 'react'
import { NavLink } from "react-router-dom"
import { SidenavContext } from '../../contexts/SidenavContext';

function NavItem(props) {
    return (
        <div className="container">
            <b> { props.screenName } </b>
        </div>
    )
}

function Sidenav() {
    const {isOpen, windowDimensions, updateWindowDimensions, changeIsOpen} = useContext(SidenavContext)

    useEffect(() => {
        window.addEventListener("resize", updateWindowDimensions)
        return () => {
            window.removeEventListener("resize", updateWindowDimensions)
        }
    }, [])

    useEffect(() => {
        if (windowDimensions.width <= 768) {
            changeIsOpen(false);
        } else {
            changeIsOpen(true);
        }
    }, [windowDimensions])

    const screenNames = ["Dashboard", "Your Todo", "Create New Todo", "What Todo?"]

    const [activeScreen, setActiveScreen] = useState(screenNames[0]);

    const logout = () => {
        console.log("log out");
    }

    return isOpen ? (
        <div className="white lighten-4 col l3 m4 s8 side-nav">

            <div className="hide-on-med-and-up right close-icon">
                <i className="material-icons" onClick={() => {changeIsOpen(false)}}> close </i>
            </div>

            <div className="container">
                <div className="initials-container">
                    <NavLink to="/" className="btn btn-floating pink lighten-2 initials"> YN </NavLink>
                </div>
                <section className="section">
                    <div className="section">
                        <div> <b> Username: </b> </div>
                        <div> yoninja1234 </div>
                    </div>
                    <div className="section"> 
                        <div> <b> Email </b> </div>
                        <div> yoninja1234@gmail.com </div>
                    </div>
                </section>
            </div>

            <div className="divider" />
            
            <section className="section">
                {screenNames.map(screenName => {
                    const activeClass = (activeScreen === screenName) ? "current-screen-name" : "";
                    return ( 
                        <div className={`screen-name ${activeClass}`} key={screenName} onClick={setActiveScreen}>
                            <NavItem
                                screenName={screenName}/>
                        </div>
                    )
                })}
            </section>

            <div className="divider" />

            <section className="section" onClick={() => {logout()}}>
                <div className="container logout">
                    <div className="red-text text-darken-2"> Log out </div>
                </div>
            </section>
        </div>
    ) : (
        <div/>
    )
}

export default Sidenav
