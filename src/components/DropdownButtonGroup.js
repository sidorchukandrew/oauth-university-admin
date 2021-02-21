import { MenuItem } from "@material-ui/core";
import Menu from "@material-ui/core/Menu";
import { useState } from "react";
import MoreIcon from "@material-ui/icons/ExpandMore";
import Loader from "react-loader-spinner";

export default function DropdownButtonGroup(props) {

    const [menuAnchor, setMenuAnchor] = useState(null);

    let buttonOptions = props.buttons?.map(button => {
        return (
            <MenuItem
                onClick={() => handleButtonSelected(button)}
                key={button}
            >
                {button}
            </MenuItem>
        );
    });

    const [selectedButton, setSelectedButton] = useState(null);

    if (props.buttons?.length > 0 && !selectedButton) {
        setSelectedButton(props.buttons[0]);
    }

    let handleButtonSelected = (button) => {
        setMenuAnchor(null);
        setSelectedButton(button);
    }

    let styles = "foc-ring white-text secondary-bg hov-lighten pointer no-border rounded-sm"
        + "d-flex justify-center align-center font-sm";

    let loadingIndicator = <Loader type="TailSpin" color="#ffffff" height="25" />;
    return (
        <div className="d-flex align-center">

            <button
                onClick={() => props.onActionClick(selectedButton)}
                className={styles + " m-right-xs rounded-left-sm p-horiz-md"}
                style={{ height: "38px" }}
            >
                {props.loading ? loadingIndicator : selectedButton}
            </button>
            <button
                onClick={(event) => setMenuAnchor(event.currentTarget)}
                className={styles + " rounded-right-sm"}
                style={{ height: "38px" }}
            >
                <MoreIcon style={{ transform: "translateY(1px)" }} />
            </button>
            <Menu
                open={Boolean(menuAnchor)}
                onClose={() => setMenuAnchor(null)}
                anchorEl={menuAnchor}
            >
                {buttonOptions}
            </Menu>
        </div>
    );
}