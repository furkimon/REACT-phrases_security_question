import React, { useState, useEffect } from 'react'
import '../styles/Grid.css'
import { useStateValue } from "../Reducer/StateProvider"

const Grid = () => {
    const [{ ready }, dispatch] = useStateValue();
    
    const toggle = () => {
        dispatch({ type: 'TOGGLE_NAVBAR', payload: ready });
    }

    const phrases = [
        'apple', 'pear', 'mellon', 'cherry', 'watermellon', 'grape',
        'mango', 'banana', 'orange', 'blueberry', 'strawberry', 'date',
        'apricot', 'cantaloupe', 'clementine', 'fig', 'kiwi', 'peach',
        'mulberries', 'nectarine', 'papaya', 'dragonfruit', 'pineapple', 'pomegranate'
    ]
    
    const [squares, setSquares] = useState([])

    useEffect(() => {
        if(ready) setSquares(phrases)
        else {
            chooseRandom()
            setSquares(holder)
        }
    }, [ready])

    const showSquares = () => {
        return squares.map((square, i) => {
            return (
                <div key={i}>{square}</div>
            )
        })
    }
    
    var holder = []
    var randomFive = []
    const chooseRandom = () => {
        while (randomFive.length < 5) {
            var createdRandom = Math.floor(Math.random() * 24)
            if (!randomFive.includes(createdRandom)) randomFive.push(createdRandom)
        }
        phrases.map((phrase, i) => {
            if (!randomFive.includes(i)) {
                return holder.push(phrase)
            }else{
                return holder.push('')
            }
        })
       
    }
    
    const createChoises = () => {
        randomFive.map((random, i) => {
            return (
                <div key={i} onClick={choosePhrase()}>{phrases[randomFive[i]]}</div>
            )
        })
    }

    const choosePhrase = () => {

    }

    return (
        <div className="grid__container">
            {showSquares()}
            {!ready ? <div className="grid__choises"></div> : null}
        </div>
    )
}

export default Grid
