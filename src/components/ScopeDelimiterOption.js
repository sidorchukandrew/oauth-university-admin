export default function ScopeDelimiterOption(props) {
    let classes = "font-xs rounded-sm shadow-sm p-horiz-md p-vertical-sm pointer";
    if (props.selected) {
        classes = classes + " hov-lighten secondary-bg white-text";
    } else {
        classes = classes + " hov-shade grey-border";
    }
    return (
        <div className={classes} onClick={props.onClick}>
            {props.delimiter}
        </div>
    );
}