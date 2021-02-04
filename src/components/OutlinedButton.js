export default function OutlinedButton(props) {
    return (
        <button
            className="shadow-small grey-border white-bg p-vertical-md rounded-sm p-horiz-lg hov-lighten font-sm pointer"
            onClick={props.onClick}
        >
            {props.name}
        </button>
    );
}