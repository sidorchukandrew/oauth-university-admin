export default function OutlinedTextarea(props) {
    return (
        <textarea
            className="foc-ring rounded-sm p-md main-font grey-border flex-grow" rows={props.rows ? props.rows : 3}
        ></textarea>
    );
}