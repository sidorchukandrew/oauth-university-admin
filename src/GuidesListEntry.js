import { Link, useHistory } from "react-router-dom";
import ItemActionsMenu from "./components/ItemActionsMenu";
export default function GuidesListEntry(props) {
    let routeHistory = useHistory();

    let guide = props.guide;

    let actions = [
        {
            name: "Edit",
            handler: () => routeHistory.push("/guides/" + guide?.id)
        },
        {
            name: "Delete",
            handler: () => props.onDeleteGuide(guide?.id)
        }
    ]

    return (
        <div className="p-vertical-md p-horiz-sm border-btm-grey d-flex align-center justify-space-between">
            <div className="m-horiz-md flex-grow">
                <div className="bold-5 m-bottom-sm d-flex align-center">
                    <Link to={"/guides/" + guide.id}>
                        {guide.title}
                    </Link>
                </div>
                <div className="grey-text-6 font-sm m-bottom-sm">
                    {guide.description}
                </div>
            </div>
            <div className="no-grow">
                <ItemActionsMenu item={guide} actions={actions} />
            </div>
        </div>
    );
}