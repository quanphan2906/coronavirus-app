import React, { useEffect } from 'react'
import M from "materialize-css"

function FilterBar(props) {
    useEffect(() => {
        var elems = document.querySelectorAll('select');
        M.FormSelect.init(elems);   
    })

    var title = "";
    switch(props.title){
        case "topics":
            title = "Choose your topic";
            break;
        case "filterBy":
            title = "Filter By";
            break;
        default:
            break;  
    }

    return (
        <select multiple={props.multiple}>
            <option value="" disabled default> {title} </option>
            {
                props.options.map(option => {
                    return (
                        <option value={option} key={option}> {option} </option>
                    )   
                })
            }
        </select>
    )
}

export default FilterBar
