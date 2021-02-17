export default function OutlinedInput(props) {
    return (
        <input
            className="foc-ring rounded-sm p-md main-font grey-border flex-grow"
            onChange={props.onChange}
            name={props.name}
            value={props.value}
        />
    );
}