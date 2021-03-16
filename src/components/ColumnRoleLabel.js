import { capitalizeFirstLetter } from "../utils/StringUtils";

export default function ColumnRoleLabel(props) {
    return (
        <div className="m-top-lg bold-5">
            {capitalizeFirstLetter(props.label)}
        </div>
    );
}