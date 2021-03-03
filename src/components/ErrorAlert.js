import CancelIcon from "@material-ui/icons/Cancel";

export default function ErrorAlert(props) {
    let errors = props.errors?.map(error => {
        return (
            <li className="font-sm bold-3" key="error">
                {error}
            </li>
        );
    });
    return (
        <div className="rounded-sm error p-15">
            <div className="d-flex align-center">
                <span className="red-3 d-flex align-center">
                    <CancelIcon style={{ fontSize: "18px" }} />
                </span>
                <div className="bold-5 font-sm m-left-md">Some errors occured: </div>
            </div>
            <ul className="m-vertical-md">
                {errors}
            </ul>
        </div>
    );
}