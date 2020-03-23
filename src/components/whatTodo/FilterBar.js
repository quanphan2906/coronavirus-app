import React, { useEffect } from "react";
import M from "materialize-css";

function FilterBar(props) {
    useEffect(() => {
        var elems = document.querySelectorAll("select");
        var instance = M.FormSelect.init(elems);
    });

    var title = "";
    switch (props.title) {
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
        <select
            id={props.id}
            onChange={props.onChange}
            value={props.value ? props.value.toLowerCase() : ""}
        >
            <option value="" disabled selected>
                {title}
            </option>
            {props.options.map(option => {
                return (
                    <option value={option.toLowerCase()} key={option}>
                        {option}
                    </option>
                );
            })}
        </select>
    );
}

export default FilterBar;
