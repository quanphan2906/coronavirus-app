import React, { useEffect } from 'react'
import M from "materialize-css"

function FilterBar() {
    useEffect(() => {
        var elems = document.querySelectorAll('select');
        var instances = M.FormSelect.init(elems);
    })
    return (
        <div class="input-field row filter-bar">
            <div className="filter col s4 m4 l3">
                <select multiple>
                    <option value="" disabled selected> Choose a topic </option>
                    <option value="1"> Learning websites </option>
                    <option value="2"> Craft </option>
                    <option value="3"> Cooking </option>
                </select>
            </div>
        </div>
    )
}

export default FilterBar
