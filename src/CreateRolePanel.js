import { useState } from "react";
import CreatePanel from "./components/CreatePanel";
import OutlinedInput from "./components/OutlinedInput";
import OutlinedTextarea from "./components/OutlinedTextarea";
import rolesApi from "./api/roles";

export default function CreateRolePanel(props) {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [saving, setSaving] = useState(false);

    let handleCreate = async () => {
        setSaving(true);
        try {
            let result = await rolesApi.create({ name, description });
            props.onCreated(result.data);
            handleClose();
        } catch (error) {
            console.log(error);
        } finally {
            setSaving(false);
        }
    }

    let fieldsAreSet = () => {
        return Boolean(name) && Boolean(description);
    }

    let handleClose = () => {
        setName("");
        setDescription("");
        props.onClose();
    }

    return (
        <CreatePanel
            open={props.creating}
            title="New Role"
            onClose={handleClose}
            onCreate={handleCreate}
            disabled={!fieldsAreSet()}
            loading={saving}
        >
            <div className="p-lg">
                <div className="d-flex f-column m-bottom-md">
                    <span className="m-bottom-sm font-sm bold-5">
                        Role Name
                        </span>
                    <OutlinedInput
                        onChange={($event) => setName($event.target.value)}
                        name="name"
                        value={name}
                    />
                </div>

                <div className="d-flex f-column">
                    <span className="m-bottom-sm font-sm bold-5">
                        Description
                        </span>
                    <OutlinedTextarea
                        rows={6}
                        onChange={($event) => setDescription($event.target.value)}
                        name="description"
                        value={description}
                    />
                </div>
            </div>
        </CreatePanel>
    );
}