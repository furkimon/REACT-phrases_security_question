import React from 'react'
import '../styles/NavBar.css'
import {useStateValue} from "../Reducer/StateProvider"


const NavBar = () => {
    const [{ready}, dispatch] = useStateValue();

    const toggle = () => {
        dispatch({type : 'TOGGLE_NAVBAR', payload : ready});
    }

    const check = () => {
        dispatch({type : 'CHECK_WORDS', payload : ''})
    }
    

    const initialNavBar = () => {
        return (
            <div className="navBar__initial" >
                <div className="navBar__downloadButton">Download</div>
                <div className="navBar__testButton" onClick={toggle}>Ready</div>
            </div>
        )
    }

    const secondaryNavBar = () => {
        return (
            <div className="navBar__secondary">
                <div className="navBar__uploadButton">Upload</div>
                <div className="navBar__checkButton">Check</div>
            </div>
        )
    }

    return (
        <div className="navBar">
            {ready
                ? initialNavBar()
                : secondaryNavBar()
            }
        </div>
    )
}

export default NavBar
