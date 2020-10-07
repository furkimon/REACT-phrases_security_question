import React, { useEffect } from 'react'
import '../styles/NavBar.css'
import { useStateValue } from "../reducer/StateProvider"
import { jsPDF } from "jspdf";
import 'jspdf-autotable'

const NavBar = () => {
    const [{ ready, controlArray, flag, checkArray }, dispatch] = useStateValue();
    
    const toggle = () => {
        dispatch({ type: 'TOGGLE_NAVBAR', payload: ready });
    }

    const check = () => {
        dispatch({ type: 'COMPARE_ARRAYS' })
        if (JSON.stringify(controlArray) !== JSON.stringify(checkArray)) alert('Wrong')
    }

    useEffect(() => {
        if (flag) alert('Correct')
    }, [flag])


    const downloadPdf = () => {

        var firstRow = []
        var secondRow = []
        var thirdRow = []
        var fourthRow = []

        controlArray.forEach((phrase, i) => {
            if (i < 6) firstRow.push(phrase)
            else if (i < 12) secondRow.push(phrase)
            else if (i < 18) thirdRow.push(phrase)
            else if (i < 24) fourthRow.push(phrase)
        })

        const doc = new jsPDF({
            orientation: "landscape",
            unit: "in",
            format: [8, 3]
        })

        doc.autoTable({
            head: [['', '', '', '', '', '']],
            body: [firstRow, secondRow, thirdRow, fourthRow]
        })

        doc.save('phrases.pdf')
    }

    const uploadPdf = () => {
        let input = document.getElementById('file-input')
        input.click()
    }

    const inputChange = (e) => {
        var reader = new FileReader();
        reader.onload = async function () {
            var text = reader.result;
            var lines = await text.split(/[\r\n]+/g)
            var holder = []
          
            for (let i = 99; i <= 375; i += 12) {
                holder.push(await lines[i].split('(')[1].split(')')[0])
            }
            dispatch({type: 'UPLOAD_ARRAY', payload : holder})

        }
        reader.readAsText(e.target.files[0], "UTF-8");
    }

    const initialNavBar = () => {
        return (
            <div className="navBar__initial">
                <div className="navBar__downloadButton" onClick={() => downloadPdf()}>Download</div>
                <div className="navBar__testButton" onClick={() => toggle()}>Ready</div>
            </div>
        )
    }

    const secondaryNavBar = () => {
        return (
            <div className="navBar__secondary">
                <div className="navBar__uploadButton" onClick={() => uploadPdf()}>Upload</div>
                <div className="navBar__checkButton" onClick={() => check()}>Check</div>
            </div>
        )
    }


    return (
        <div className="navBar">
            {ready
                ? initialNavBar()
                : secondaryNavBar()
            }
            <input
                style={{ display: "none" }}
                type="file"
                accept='application/pdf'
                id="file-input"
                onChange={(e) => inputChange(e)}
            />
        </div>
    )
}

export default NavBar
