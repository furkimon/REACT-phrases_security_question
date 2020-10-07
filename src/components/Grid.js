import React, { useState, useEffect } from 'react'
import '../styles/Grid.css'
import { useStateValue } from "../reducer/StateProvider"

var randomFive = []
let order = 0
var controlArray = []
var holder = []
const Grid = () => {
    const [{ ready, flag }, dispatch] = useStateValue();
    const [squares, setSquares] = useState([])

    const phrases = [
        'apple', 'pear', 'mellon', 'cherry', 'watermellon', 'grape',
        'mango', 'banana', 'orange', 'blueberry', 'strawberry', 'date',
        'apricot', 'cantaloupe', 'clementine', 'fig', 'kiwi', 'peach',
        'mulberries', 'nectarine', 'papaya', 'dragonfruit', 'pineapple', 'pomegranate'
    ]

    useEffect(() => {
        dispatch({ type: 'CONTROL_ARRAY', payload: phrases })
        if (ready) setSquares(phrases)
        else {
            chooseRandom()      //randomFive is filled
            dontShowRandom()    //holder is filled with missing spots   
            setSquares(holder)
        }
    }, [ready])

    useEffect(()=>{
        if(flag){
            alert('Correct')
        }
    }, [flag])

    const chooseRandom = () => {
        while (randomFive.length < 5) {
            var createdRandom = Math.floor(Math.random() * 24)
            if (!randomFive.includes(createdRandom)) randomFive.push(createdRandom)
        }
    }

    const dontShowRandom = () => {
        phrases.map((phrase, i) => {
            if (!randomFive.includes(i)) {
                return holder.push(phrase)
            } else {
                return holder.push('')
            }
        })
    }

    const choosePhrase = (number) => {
        var sorted = randomFive.slice().sort((a, b) => a - b)  //sorted ascending, randomFive protected
        if (!controlArray.includes(number)) {
            holder[sorted[order]] = phrases[randomFive[number]]
            if (order < 4) order++
            controlArray.push(number)
        }

        let button =  document.getElementById(`choice${number}`)
        button.classList.add('clicked')
        button.style.cursor = "default"
        
        setSquares([...holder])
        if(controlArray.length === 5) dispatch({ type: 'CHECK_ARRAY', payload: holder })
    }

    const createChoises = () => {
        return randomFive.map((random, i) => {
            return <div id={`choice${i}`} onClick={() => choosePhrase(i)} key={i}>{phrases[random]}</div>
        })
    }

    const showSquares = () => {
        return squares.map((square, i) => {
            return (
                <div key={i}>{square}</div>
            )
        })
    }

   

    return (
        <div className="grid__container">
            <div className="grid__squares">
                {showSquares()}
            </div>
            {!ready ? <div className="grid__choises">{createChoises()}</div> : null}
        </div>
    )
}

export default Grid
