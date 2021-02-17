import Loader from "react-loader-spinner";

export default function PrimaryButton(props) {

    let content = props.loading ? <Loader type="TailSpin" color="#ffffff" height="15" /> : props.name;
    let classes = "no-border rounded-sm p-xs d-flex justify-center align-center font-sm"
    let sizeClasses = props.small ? "p-horiz-md p-vertical-sm" : "p-horiz-15 p-vertical-md"
    let colorClasses = props.disabled ? "grey-text-6 grey-bg-4" : "foc-ring white-text secondary-bg hov-lighten pointer";

    classes = classes + " " + colorClasses + " " + sizeClasses;

    if (props.disabled) {
        return (
            <button
                className={classes}
            >
                { content}
            </button >
        );
    }
    else {
        return (
            <button
                className={classes}
                onClick={props.onClick}
            >
                {props.children} {content}
            </button >
        );
    }
}