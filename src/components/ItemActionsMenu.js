
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import MoreIcon from "@material-ui/icons/MoreVert";
import React from "react";

export default class ItemActionsMenu extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            menuAnchor: null
        };

        this.handleOpenMenu = this.handleOpenMenu.bind(this);
        this.handleCloseMenu = this.handleCloseMenu.bind(this);
    }

    handleOpenMenu(event) {
        this.setState({
            menuAnchor: event.currentTarget
        });
    }

    handleCloseMenu() {
        this.setState({
            menuAnchor: null,
        });
    }

    render() {
        let menuItems = this.props.actions.map(action => {
            return (<MenuItem key={action.name} onClick={action.handler}>{action.name}</MenuItem>)
        });
        return (
            <div>

                <IconButton onClick={this.handleOpenMenu}>
                    <MoreIcon />
                </IconButton>
                <Menu
                    anchorEl={this.state.menuAnchor}
                    open={Boolean(this.state.menuAnchor)}
                    onClose={this.handleCloseMenu}
                >
                    {menuItems}
                </Menu>
            </div>
        );
    }
}