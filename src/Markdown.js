import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Clear";
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import gfm from "remark-gfm";
import OutlinedButton from "./components/OutlinedButton";
import PrimaryButton from "./components/PrimaryButton";

export default function Markdown(props) {
    const [editing, setEditing] = useState(false);
    const [editingCopy, setEditingCopy] = useState(props.content);

    let contentComponent = null;

    let handleEditsMade = (edits) => {
        setEditingCopy(edits);
    }

    let handleCommitEdits = () => {
        setEditing(false);
        props.onChange(editingCopy);
    };

    let handleCancelEdits = () => {
        setEditingCopy(props.content);
        setEditing(false);
    }

    let editButtons = (
        <div className="m-top-md d-flex justify-end">
            <OutlinedButton name="Cancel" onClick={() => handleCancelEdits()} />
            <span className="m-left-md">
                <PrimaryButton name="Done" onClick={() => handleCommitEdits()} />
            </span>
        </div>
    );

    if (editing) {
        contentComponent = (
            <div>
                <div
                    contentEditable
                    className="no-border grey-bg-5 double-height m-vertical-md monospace foc-ring rounded-sm p-md"
                    suppressContentEditableWarning={true}
                    onInput={(event) => handleEditsMade(event.target.innerText)}
                    style={{ whiteSpace: "pre-wrap" }}
                >
                    {props.content}
                </div>

                {editButtons}
            </div>
        );
    } else {
        contentComponent = (
            <div className="d-flex justify-space-between align-center">
                <div className="flex-grow double-height markdown">
                    <ReactMarkdown plugins={[gfm]}>
                        {props.content}
                    </ReactMarkdown>
                </div>

                <div className="d-flex f-column">
                    <span className="m-left-lg grey-text-6 hov-secondary-color m-bottom-md">
                        <EditIcon style={{ fontSize: "18px" }} onClick={() => setEditing(true)} />
                    </span>
                    <span className="m-left-lg grey-text-6 hov-error-color">
                        <DeleteIcon style={{ fontSize: "22px" }} onClick={() => setEditing(true)} />
                    </span>
                </div>
            </div>
        )
    }

    return contentComponent;
}