import PageHeading from "./components/PageHeading";
import React from "react";
import CreatePanel from "./components/CreatePanel";

class Guides extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            creating: false
        }

        this.openCreatePanel = this.openCreatePanel.bind(this);
        this.closeCreatePanel = this.closeCreatePanel.bind(this);
    }

    openCreatePanel() {
        this.setState({
            creating: true
        });
    }

    closeCreatePanel() {
        this.setState({
            creating: false
        });
    }

    render() {
        return (
            <div>
                <PageHeading title="Guides" actionClicked={this.openCreatePanel} />
                <CreatePanel closeCreatePanel={this.closeCreatePanel} open={this.state.creating} title="New Guide" />
            </div >
        );
    }
}

export default Guides;