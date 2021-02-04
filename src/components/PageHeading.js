import PrimaryButton from "./PrimaryButton";

export default function PageHeading(props) {
    return (
        <div className=" border-btm-grey">
            <div className="d-flex justify-space-between m-bottom-md">
                <span className="bold-6 font-lg">{props.title}</span>
                <PrimaryButton
                    className="no-border shadow-small rounded-sm white-text p-horiz-lg hov-lighten font-sm pointer secondary-bg"
                    onClick={props.actionClicked}
                    name="Create"
                >
                </PrimaryButton>
            </div>
        </div>
    );
}  