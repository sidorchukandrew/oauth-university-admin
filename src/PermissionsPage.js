import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import rolesApi from "./api/roles";
import PageHeading from "./components/PageHeading";
import CreateRolePanel from "./CreateRolePanel";
import PermissionsTable from "./PermissionsTable";
import { selectUser } from "./store/user/userSlice";
import { hasPermission, PERMISSIONS, getCorrespondingId } from "./utils/PermissionsUtils";
import permissionsApi from "./api/permissions";
import PrimaryButton from "./components/PrimaryButton";

export default function PermissionsPage() {
    const [roles, setRoles] = useState([]);
    const [permissions, setPermissions] = useState([]);
    const [editedRoles, setEditedRoles] = useState([]);
    const [creating, setCreating] = useState(false);
    const currentUser = useSelector(selectUser);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                let rolesResult = await rolesApi.getAll();
                setRoles(rolesResult.data);

                let permissionsResult = await permissionsApi.getAll();
                setPermissions(permissionsResult.data);
            } catch (error) {
                console.log(error);
            }
        }

        if (hasPermission(currentUser, PERMISSIONS.ROLES_LIST)) {
            fetchData();
        }
    }, [currentUser]); // eslint-disable-line react-hooks/exhaustive-deps

    let handlePermissionChange = (checked, permission, role) => {
        let updatedRoles = JSON.parse(JSON.stringify(roles));
        let roleIndex = updatedRoles?.findIndex(roleInList => roleInList.name === role.name);
        let roleToUpdate = roles[roleIndex];
        if (checked) {
            roleToUpdate.permissions.push({ name: permission });
        } else {
            roleToUpdate.permissions = roleToUpdate.permissions.filter(permissionInList => permissionInList.name !== permission);
        }

        updatedRoles[roleIndex] = roleToUpdate;
        setRoles(updatedRoles);

        stageEdits(checked, permission, role);
    }

    let stageEdits = (checked, permission, role) => {
        let editedRolesCopy = JSON.parse(JSON.stringify(editedRoles));
        let indexOfRoleToEdit = editedRolesCopy.findIndex(editedRole => editedRole.id === role.id);

        console.log("Looking for ", role, " in ", editedRolesCopy);
        if (indexOfRoleToEdit > -1) {
            console.log("This role is already staged for edits");

            console.log("Checking if this permission is staged for edits: <" + permission + ">");
            let indexOfPermissionToEdit = editedRolesCopy[indexOfRoleToEdit].permissions_attributes
                .findIndex(permissionInList => permissionInList.name === permission);

            if (indexOfPermissionToEdit > -1) {
                console.log("This permission is already staged for edits");
                let permissionToEdit = editedRolesCopy[indexOfRoleToEdit].permissions_attributes[indexOfPermissionToEdit];
                if (checked) {
                    delete permissionToEdit._destroy;
                    console.log("Ensuring this permission is linked to the role.");
                } else {
                    permissionToEdit._destroy = 1;
                    console.log("Ensuring this permission is UNlinked with the role.");
                }
            } else {
                console.log("Couldn't find this permission in the staged edits.");
                if (checked) {
                    console.log("Linking this permission with the role.");
                    editedRolesCopy[indexOfRoleToEdit].permissions_attributes.push(
                        { name: permission, id: getCorrespondingId(permissions, permission) }
                    );
                } else {
                    console.log("Unlinking this permission with the role.");
                    editedRolesCopy[indexOfRoleToEdit].permissions_attributes.push(
                        { name: permission, _destroy: 1, id: getCorrespondingId(permissions, permission) }
                    );
                }
            }

            console.log("The result : ", editedRolesCopy);
            setEditedRoles(editedRolesCopy);
        } else {
            console.log("Couldn't find this role in the staged edits.");
            let editedRole = { id: role.id };
            if (checked) {
                console.log("Linking a permission to this role.");
                editedRole.permissions_attributes = [{ name: permission, id: getCorrespondingId(permissions, permission) }];
            } else {
                console.log("Unlinking a permission from this role.");
                editedRole.permissions_attributes = [{ name: permission, _destroy: 1, id: getCorrespondingId(permissions, permission) }];
            }

            editedRolesCopy.push(editedRole);
            setEditedRoles(editedRolesCopy);
            console.log("The result : ", editedRole);
        }

        console.log("---------------------------------------------");
    }

    let handleRoleCreated = (newRole) => {
        let updatedRoles = JSON.parse(JSON.stringify(roles));
        updatedRoles.push(newRole);
        setRoles(updatedRoles);
    }

    let handleSaveEdits = async () => {
        setSaving(true);

        editedRoles.forEach(async (editedRole) => {
            try {
                let result = await rolesApi.updateOne(editedRole.id, editedRole);
                console.log(result);
                setEditedRoles([]);
            } catch (error) {
                console.log(error);
            }
        });
        setSaving(false);
    }

    return (
        <div>
            <div className="m-bottom-lg">
                <PageHeading
                    title="Permissions"
                    showActionButton
                    onActionClicked={() => setCreating(true)}
                />
            </div>

            <PermissionsTable
                roles={roles}
                onChange={handlePermissionChange}
            />

            <div className="d-flex justify-end">
                <PrimaryButton
                    name="Save Changes"
                    disabled={editedRoles.length <= 0}
                    onClick={handleSaveEdits}
                    loading={saving}
                />
            </div>

            <CreateRolePanel
                creating={creating}
                onClose={() => setCreating(false)}
                onCreated={(newRole) => handleRoleCreated(newRole)}
            />
        </div>
    );
}