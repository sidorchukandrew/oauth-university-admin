import Dialog from "@material-ui/core/Dialog";
import { useState } from "react";
import PrimaryButton from "./PrimaryButton";
import OutlinedButton from "./OutlinedButton";
import Checkbox from "@material-ui/core/Checkbox";
import NoContent from "./NoContent";

export default function UnlinkedGuidesDialog(props) {

    let [selectedGuides, setSelectedGuides] = useState([]);

    let handleCheckedChange = (checked, guideId) => {

        let updatedSelection = [];
        if (checked) {
            updatedSelection = selectedGuides.slice();
            updatedSelection.push(guideId);
        } else {
            updatedSelection = selectedGuides.filter(id => guideId !== id);
        }
        setSelectedGuides(updatedSelection);
    }

    let handleClose = () => {
        setSelectedGuides([]);
        props.onClose();
    }

    let handleAdd = () => {
        props.onAdd(selectedGuides);
        handleClose();
    }

    let unlinkedGuides = (<div>
        <div className="bold-4 font-sm p-vertical-sm border-btm-grey d-flex align-center">
            <Checkbox
                size="small"
                checked={selectedGuides.includes(1)}
                onChange={($event) => handleCheckedChange($event.target.checked, 1)}
            />
                        Login with Facebook
                    </div>
        <div className="bold-4 font-sm p-vertical-sm border-btm-grey d-flex align-center">
            <Checkbox
                size="small"
                checked={selectedGuides.includes(2)}
                onChange={($event) => handleCheckedChange($event.target.checked, 2)}
            />
                        Login with Google
                    </div>
        <div className="bold-4 font-sm p-vertical-sm border-btm-grey d-flex align-center">
            <Checkbox
                size="small"
                checked={selectedGuides.includes(3)}
                onChange={($event) => handleCheckedChange($event.target.checked, 3)}
            />
                Login with LinkedIn
            </div>
    </div>
    )

    return (
        <Dialog open={props.open} onClose={handleClose}>
            <div className="main-font p-lg" style={{ width: "400px" }}>
                <div className="font-regular bold-5 m-bottom-md">
                    Unlinked Guides
                    <span className="grey-text-6 font-sm m-left-md">
                        {selectedGuides.length > 0 ? selectedGuides.length + " selected" : ""}
                    </span>
                </div>
                {unlinkedGuides.length > 0 ? unlinkedGuides : <NoContent text="No unlinked guides available" />}
                <div className="d-flex justify-end p-horiz-lg p-vertical-md align-center main-font">
                    <span className="m-horiz-md">
                        <OutlinedButton name="Cancel" onClick={handleClose} />
                    </span>
                    <span>
                        <PrimaryButton name="Add" onClick={handleAdd} />
                    </span>
                </div>
            </div>
        </Dialog>
    );
}