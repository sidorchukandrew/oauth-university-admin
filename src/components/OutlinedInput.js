import { useState } from "react";

export default function OutlinedInput(props) {

    const [element, setElement] = useState();

    let classes = "p-md flex-grow main-font grey-border";

    if (props.rounded?.length > 0) {
        props.rounded.forEach(roundedSide => {
            let lowercased = roundedSide.toLowerCase();
            if (lowercased === "left") {
                classes = classes + " rounded-left-sm";
            } else if (lowercased === "right") {
                classes = classes + " rounded-right-sm";
            } else if (lowercased === "top") {
                classes = classes + " rounded-top-sm";
            } else if (lowercased === "bottom") {
                classes = classes + " rounded-bottom-sm";
            }
        });

    } else {
        classes = classes + "foc-ring rounded-sm";
    }

    let handleKeyUp = (event) => {
        if (enterWasPressed(event) && enterPressIsBeingTracked(props)) {
            props.onEnter(event.target.value);
            element.value = "";
        }
    }

    return (
        <input
            className={classes}
            onChange={props.onChange}
            onKeyUp={handleKeyUp}
            name={props.name}
            value={props.value}
            placeholder={props.placeholder}
            ref={el => setElement(el)}
            type={props.type ? props.type : "text"}
        />
    );
}

function enterWasPressed(event) {
    const ENTER_KEY_CODE = 13;
    return event.key === "Enter" || event.keyCode === ENTER_KEY_CODE;
}

function enterPressIsBeingTracked(props) {
    return Boolean(props.onEnter);
}