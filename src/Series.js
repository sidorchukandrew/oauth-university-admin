import PageHeading from "./components/PageHeading";
import CreatePanel from "./components/CreatePanel";
import React from "react";
import OutlinedInput from "./components/OutlinedInput";
import OutlinedTextarea from "./components/OutlinedTextarea";
import ImageUploader from "./components/ImageUploader";

export default class Series extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            creating: false
        }

        this.openCreatePanel = this.openCreatePanel.bind(this);
        this.closeCreatePanel = this.closeCreatePanel.bind(this);
        this.constructCreatePanel = this.constructCreatePanel.bind(this);
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

        let newSeries = this.constructCreatePanel();
        return (
            <div>
                <PageHeading title="Series" actionClicked={this.openCreatePanel} />
                <CreatePanel closeCreatePanel={this.closeCreatePanel} open={this.state.creating} title="New Series">
                    {newSeries}
                </CreatePanel>
            </div>
        );
    }

    constructCreatePanel() {
        return (
            <div>
                <div>
                    <ImageUploader />

                </div>

                <div className="p-lg">
                    <div className="d-flex f-column m-bottom-md">
                        <span className="m-bottom-sm font-sm bold-5">
                            Title
                        </span>
                        <OutlinedInput />
                    </div>

                    <div className="d-flex f-column">
                        <span className="m-bottom-sm font-sm bold-5">
                            Description
                        </span>
                        <OutlinedTextarea rows={6} />
                    </div>
                </div>
            </div>
        );
    }
}