export default function OutlinedButton(props) {

    let classes = "grey-border rounded-sm font-sm"
    let sizeClasses = props.small ? "p-horiz-sm p-vertical-md" : "p-horiz-15 p-vertical-md"
    sizeClasses = props.fullWidth ? sizeClasses + " full-width" : sizeClasses;
    let colorClasses = props.disabled ? "grey-text-6 grey-bg-5" : "foc-ring hov-shade pointer white-bg";

    classes = classes + " " + colorClasses + " " + sizeClasses;
    return (
        <button
            className={classes}
            onClick={props.onClick}
            disabled={props.disabled}
        >
            {props.name}
        </button>
    );
}