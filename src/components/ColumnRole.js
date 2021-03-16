export default function ColumnRole(props) {
    return (
        <th>
            <div className="p-lg grey-bg-5 bold-5 rounded-sm m-horiz-md">
                {props.name}
            </div>
        </th>
    );
}