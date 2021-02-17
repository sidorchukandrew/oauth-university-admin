import PrimaryButton from "./PrimaryButton";

export default function PageHeading(props) {
    return (
        <div>
            <div className="d-flex justify-space-between m-bottom-md">
                <span className="bold-6 font-lg">{props.title}</span>
                <PrimaryButton
                    onClick={props.onActionClicked}
                    name="Create"
                >
                </PrimaryButton>
            </div>
        </div>
    );
}  