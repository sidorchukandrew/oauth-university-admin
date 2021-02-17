import { useState } from "react";
import CreatePanel from "./components/CreatePanel";
import OutlinedInput from "./components/OutlinedInput";
import OutlinedTextarea from "./components/OutlinedTextarea";
import guidesApi from "./api/guides";
import ErrorAlert from "./components/ErrorAlert";

export default function CreateGuidePanel(props) {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [formValid, setFormValid] = useState(false);
    const [saving, setSaving] = useState(false);
    const [creationErrors, setCreationErrors] = useState([]);

    let handleTitleChanged = (newTitle) => {
        setTitle(newTitle);
        setFormValid(Boolean(title) && Boolean(description));
    }

    let handleDescriptionChanged = (newDescription) => {
        setDescription(newDescription);
        setFormValid(Boolean(title) && Boolean(description));
    }

    let handleCreate = async () => {
        setSaving(true);

        let newGuide = {
            title: title,
            description: description
        };

        try {
            let result = await guidesApi.create(newGuide);
            console.log(result);
            setCreationErrors([]);
            props.onCreated(result.data);
            props.onClose();
        } catch (error) {
            console.log(error);
        } finally {
            setSaving(false);
        }
    }

    return (
        <CreatePanel
            title="New Guide"
            open={props.open}
            onClose={props.onClose}
            disabled={!formValid}
            onCreate={handleCreate}
            loading={saving}
        >
            <div className="p-lg">
                <div className="d-flex f-column m-bottom-md">
                    <span className="m-bottom-sm font-sm bold-5">
                        Title
                    </span>
                    <OutlinedInput
                        onChange={(event) => handleTitleChanged(event.target.value)}
                    />
                </div>

                <div className="d-flex f-column">
                    <span className="m-bottom-sm font-sm bold-5">
                        Description
                        </span>
                    <OutlinedTextarea
                        rows={6}
                        onChange={(event) => handleDescriptionChanged(event.target.value)}
                    />
                </div>

                {creationErrors.length > 0 ? <ErrorAlert errors={creationErrors} /> : ""}
            </div>
        </CreatePanel>
    );
}