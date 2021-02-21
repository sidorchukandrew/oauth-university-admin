import { useState } from "react";

export default function ClickEditField(props) {
    const [editing, setEditing] = useState(false);
    const [editingCopy, setEditingCopy] = useState(props.content);

    let handleEditsMade = (edits) => {
        setEditingCopy(edits);
    }

    let handleCommitEdits = () => {
        props.onChange(editingCopy);
    }

    let component = null;

    if (editing) {
        component = (
            <div>

                <div
                    contentEditable={true}
                    onInput={(event) => handleEditsMade(event.target.innerText)}
                    suppressContentEditableWarning={true}
                    onBlur={handleCommitEdits}
                    className="foc-ring rounded-sm p-sm no-border"
                    style={{ whiteSpace: "pre-wrap" }}
                >
                    {props.content}
                </div>
            </div>
        );
    } else {
        component = (
            <div
                onClick={() => setEditing(true)}
                className="p-sm"
            >
                {props.content}
            </div>
        );
    }

    return component;
}