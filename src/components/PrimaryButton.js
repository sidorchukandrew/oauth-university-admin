export default function PrimaryButton(props) {
    return (
        <button
            className="no-border shadow-small p-vertical-md rounded-sm white-text p-horiz-lg hov-lighten font-sm pointer secondary-bg"
            onClick={props.onClick}
        >
            {props.name}
        </button>
    );
}