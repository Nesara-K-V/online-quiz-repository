import React, { useState } from 'react';
import '../App.css';
import { useDispatch } from "react-redux";
import {
  handleCategoryChange,
  handleDifficultyChange,
  handleTypeChange,
} from "../redux/actions";


const SelectFields = (props) => {
    const { label, options } = props;
    const dispatch = useDispatch();
    const [isActive, setIsActive] = useState(false);
    const [value, setValue] = useState("");

    const handleChange = (id) => {
        switch(label) {
          case "Select Category":
            console.log("category")
            dispatch(handleCategoryChange(id));
            break;
          case "Select Difficulty":
            dispatch(handleDifficultyChange(id));
            break;
          case "Type":
            console.log("type")
            dispatch(handleTypeChange(id));
            break;
          default:
            return;
        }
        // Close dropdown after selection

    };
         // Close dropdown after selection

    const handleClick= (id,name)=>{
        setIsActive(!isActive);
        setValue(name);
        handleChange(id);
    }



    return (
        <div className="dropdown">
            <div className="dropdown-btn" onClick={() => setIsActive(!isActive)}>
                {value || label} {/* Show selected option or label */}
                <span className="fa fa-caret-down"></span>
            </div>
            {isActive && (
                <div className="dropdown-content">
                    {options.map(({ id, name }) => (
                        <div
                            value={name}
                            key={id}
                            className="dropdown-item"
                            onClick={()=>handleClick(id,name)}
                            
                         // Handle selection
                        >
                            {name}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SelectFields;
