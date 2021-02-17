
import OutlinedButton from "./OutlinedButton";
import PrimaryButton from "./PrimaryButton";
import EditIcon from "@material-ui/icons/Edit";
import OutlinedTextarea from "./OutlinedTextarea";
import OutlinedInput from "./OutlinedInput";
import { useState } from "react";

export default function Detail(props) {
    let [editing, setEditing] = useState(false);
    let [edits, setEdits] = useState(props.value);
    let value = null;

    if (props.editable) {

        let editButtons = (
            <div className="m-top-md d-flex justify-end">
                <OutlinedButton name="Cancel" onClick={() => { setEdits(props.value); setEditing(false); }} />
                <span className="m-left-md">
                    <PrimaryButton name="Done" onClick={() => { props.onCommitEdits(edits); setEditing(false); }} />
                </span>
            </div>
        );

        let inputField = null;
        if (props.inputType === 'textarea') {
            inputField = (
                <div className="d-flex f-column full-width">
                    <OutlinedTextarea value={edits} onChange={($event) => setEdits($event.target.value)} />
                    {editButtons}
                </div>
            );
        } else {
            inputField = (
                <div className="d-flex f-column full-width">
                    <OutlinedInput value={edits} onChange={($event) => setEdits($event.target.value)} />
                    {editButtons}
                </div>
            );
        }

        value = (
            <div className="font-sm d-flex align-center">
                {editing ? inputField : props.value}
                <span className="m-left-md grey-text-6 hov-secondary-color">
                    {editing ? "" : <EditIcon style={{ fontSize: "18px" }} onClick={() => setEditing(true)} />}
                </span>
            </div>
        );
    } else {
        value = (<div className="font-sm d-flex align-center">
            {props.value}
        </div>);
    }


    return (
        <div>
            <div className="font-xs bold-5 grey-text-6 m-bottom-sm">
                {props.label}
            </div>
            {value}
        </div>
    );
}
