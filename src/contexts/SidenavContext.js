import React, { useState, createContext } from 'react'

export const SidenavContext = createContext();

function SidenavContextProvider(props) {
    const [isOpen, setIsOpen] = useState(true);
    const [windowDimensions, setWindowDimensions] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    })
    const updateWindowDimensions = () => {
        setWindowDimensions({
            width: window.innerWidth,
            height: window.innerHeight
        })
    }
    const changeIsOpen = (boolean) => {
        setIsOpen(boolean);
    }
    return (
        <SidenavContext.Provider value={{isOpen, windowDimensions, updateWindowDimensions, changeIsOpen}}>
            {props.children}
        </SidenavContext.Provider>
    )
}

export default SidenavContextProvider
