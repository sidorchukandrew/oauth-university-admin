import Loader from "react-loader-spinner";

export default function TextButton(props) {
    let content = props.loading ? <Loader type="TailSpin" color="#ffffff" height="25" /> : props.children;
    let classes = "no-border rounded-sm p-xs h-40-px w-90-px bold-5 d-flex transparent justify-center align-center font-sm"

    let colorClasses = props.disabled ? "grey-text-6" : "foc-ring grey-text-2 pointer";

    classes = classes + " " + colorClasses;

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
                {content}
            </button >
        );
    }
}