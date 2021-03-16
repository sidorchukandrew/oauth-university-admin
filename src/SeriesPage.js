import PageHeading from "./components/PageHeading";
import React from "react";
import CreateSeriesPanel from "./CreateSeriesPanel";
import SeriesList from "./SeriesList";
import SuccessSnackbar from "./components/SuccessSnackbar";

export default class Series extends React.Component {

    constructor(props) {
        super(props);
        document.title = "Series";

        this.openCreatePanel = this.openCreatePanel.bind(this);
        this.closeCreatePanel = this.closeCreatePanel.bind(this);
        this.handleCreated = this.handleCreated.bind(this);
        this.handleSnackbarClose = this.handleSnackbarClose.bind(this);

        this.state = {
            creating: false,
            showSuccess: false,
        }
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

    handleCreated() {
        this.setState({
            showSuccess: true
        });
    }

    handleSnackbarClose() {
        this.setState({
            showSuccess: false
        });
    }

    render() {
        return (
            <div>
                <div className="m-bottom-lg">
                    <PageHeading
                        title="Series"
                        onActionClicked={this.openCreatePanel}
                        showActionButton
                    />
                </div>

                <SeriesList />

                <CreateSeriesPanel
                    creating={this.state.creating}
                    onClose={this.closeCreatePanel}
                    onCreated={this.handleCreated}
                />

                <SuccessSnackbar />

            </div>
        );
    }
}