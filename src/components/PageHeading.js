import PrimaryButton from "./PrimaryButton";

export default function PageHeading(props) {

    let createButton = (<PrimaryButton
        onClick={props.onActionClicked}
        name="Create"
    >
    </PrimaryButton>);
    return (
        <div>
            <div className="d-flex justify-space-between m-bottom-md">
                <span className="bold-6 font-lg">{props.title}</span>
                {props.showActionButton ? createButton : ""}

            </div>
        </div>
    );
}