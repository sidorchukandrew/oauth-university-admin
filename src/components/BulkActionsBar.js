import Loader from "react-loader-spinner";
import Snackbar from "@material-ui/core/Snackbar";

export default function BulkActionsBar(props) {
    let actions = props.actions.map(action => (
        <button
            className="transparent grey-text-2 no-border p-horiz-lg foc-lighten p-vertical-md hov-lighten bold-5 pointer"
            key={action.name}
            onClick={action.handler}
        >
            {action.name}
        </button>));

    let loader = (
        <div
            style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
            className="d-flex justify-center align-center rounded-sm lighten"
        >
            <Loader type="TailSpin" color="#ffffff" height="25" />
        </div>
    )
    return (
        <Snackbar open={props.open}>

            <div className="d-flex align-center primary-bg shadow-md rounded-sm">
                {props.loading ? loader : ""}
                {actions}
                <div className="grey-text-4 font-xs p-horiz-md">
                    {props.items?.length} selected
                </div>
            </div>
        </Snackbar>
    );
}