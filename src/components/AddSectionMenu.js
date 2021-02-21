import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import OutlinedButton from "./OutlinedButton";
import { useState } from "react";

export default function AddSectionMenu(props) {

    const [menuAnchor, setMenuAnchor] = useState(false);

    return (
        <div className="d-flex justify-end m-vertical-lg">
            <OutlinedButton name="Add Section" onClick={(event) => setMenuAnchor(event.currentTarget)} />
            <Menu
                anchorEl={menuAnchor}
                open={Boolean(menuAnchor)}
                onClose={() => setMenuAnchor(null)}
            >
                <MenuItem onClick={() => props.onAdd("markdown")}>
                    Markdown
                </MenuItem>
                <MenuItem>
                    Button Generator
                </MenuItem>
            </Menu>
        </div>
    );
}