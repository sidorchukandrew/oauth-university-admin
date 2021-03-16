import { capitalizeFirstLetter } from "../utils/StringUtils";

export default function RowPermissionLabel(props) {
    return (
        <div className="p-vertical-sm">
            {capitalizeFirstLetter(props.label)}
        </div>
    );
}