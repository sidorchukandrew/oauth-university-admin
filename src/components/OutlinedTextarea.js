export default function OutlinedTextarea(props) {
    return (
        <textarea
            className="foc-ring rounded-sm p-md main-font grey-border flex-grow font-sm"
            rows={props.rows ? props.rows : 3}
            onChange={props.onChange}
            name={props.name}
            value={props.value}
        ></textarea>
    );
}