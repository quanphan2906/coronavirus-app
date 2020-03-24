import React, { useEffect } from "react";
import M from "materialize-css";

function FilterBar(props) {
    useEffect(() => {
        var elems = document.querySelectorAll("select");
        M.FormSelect.init(elems);
    });

    return (
        <select
            id={props.id}
            onChange={props.onChange}
            value={props.value.toLowerCase()}
        >
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
