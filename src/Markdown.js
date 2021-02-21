import EditIcon from "@material-ui/icons/Edit";
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
                <div className="flex-grow double-height">
                    <ReactMarkdown plugins={[gfm]}>
                        {props.content}
                    </ReactMarkdown>
                </div>

                <span className="m-left-md grey-text-6 hov-secondary-color">
                    <EditIcon style={{ fontSize: "18px" }} onClick={() => setEditing(true)} />
                </span>
            </div>
        )
    }

    return contentComponent;
}