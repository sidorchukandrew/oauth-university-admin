export default function Bubble(props) {
    let classes = "rounded-sm font-xs p-sm bold-5";

    if (props.type === "warning" || props.type === "warn") {
        classes = classes + " warning";
    }
    else if (props.type === "primary") {
        classes = classes + " secondary-bg-light secondary-color"
    }
    else {
        classes = classes + " grey-bg-5"
    }
    let bubble = (
        <span className={classes}>
            {props.children}
        </span>
    );
    return bubble;
}