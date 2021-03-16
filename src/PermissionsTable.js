import { PERMISSIONS, roleHasPermission } from "./utils/PermissionsUtils";
import { useEffect, useState } from "react";
import Checkbox from "@material-ui/core/Checkbox";
import RowPermissionLabel from "./components/RowPermissionLabel";
import ColumnRoleLabel from "./components/ColumnRoleLabel";
import ColumnRole from "./components/ColumnRole";

export default function PermissionsTable(props) {
    let [permissionCategories, setPermissionCategories] = useState([]);

    useEffect(() => {
        let categories = {};

        for (let permissionKey in PERMISSIONS) {
            let [category, permission] = PERMISSIONS[permissionKey].split(".");

            if (!categories[category]) {
                categories[category] = [permission];
            } else {
                categories[category].push(permission);
            }
        }

        let categoriesArray = [];
        for (let [category, permissions] of Object.entries(categories)) {
            categoriesArray.push({ category: category, permissions: permissions });
        }

        setPermissionCategories(categoriesArray);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    let headerColumns = props.roles?.map(role => <ColumnRole key={role.name} name={role.name} />);

    let categories = permissionCategories?.map(permissionCategory => {
        let permissions = permissionCategory.permissions?.map(permission => {
            return (
                <tr key={permission} className="striped-bg">
                    <td className="grey-text-6 font-sm">
                        <RowPermissionLabel label={permission} />
                    </td>
                    {props.roles?.map(role => (
                        <td key={role.name + permission} >
                            <div className="d-flex justify-center" style={{ whiteSpace: "no-wrap" }}>
                                <Checkbox checked={roleHasPermission(role, permissionCategory.category + "." + permission)}
                                    color="secondary"
                                    onChange={($event) => props.onChange($event.target.checked, permissionCategory.category + "." + permission, role)}
                                />
                            </div>
                        </td>
                    ))}
                    <td style={{ width: "99%" }}>

                    </td>
                </tr>
            )
        });

        return (
            <tbody key={permissionCategory?.category}>
                <tr>
                    <td>
                        <ColumnRoleLabel label={permissionCategory?.category} />
                    </td>
                    {props.roles?.map(role => (<td key={role.name + permissionCategory?.category}></td>))}
                </tr>
                {permissions}
            </tbody>
        )
    });

    return (
        <table>
            <thead>
                <tr>
                    <th></th>
                    {headerColumns}
                </tr>
            </thead>
            {categories}

        </table>
    );
}