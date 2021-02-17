
import OutlinedInput from "./components/OutlinedInput";
import OutlinedTextarea from "./components/OutlinedTextarea";
import ImageUploader from "./components/ImageUploader";
import React from "react";
import CreatePanel from "./components/CreatePanel";

import seriesApi from "./api/series";
import awsApi from "./api/aws";

export default class CreateSeriesPanel extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            title: "",
            description: "",
            image: null,
            loading: false,
            formValid: false
        };

        this.constructCreatePanel = this.constructCreatePanel.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
        this.uploadImage = this.saveImage.bind(this);
    }

    render() {
        let newSeries = this.constructCreatePanel();
        return (
            <CreatePanel
                onClose={this.props.onClose}
                open={this.props.creating}
                title="New Series"
                onCreate={this.handleCreate}
                loading={this.state.loading}
                disabled={!this.state.formValid}
            >
                {newSeries}
            </CreatePanel>
        );
    }

    constructCreatePanel() {
        return (
            <div>
                <div>
                    <ImageUploader
                        onImageChange={this.handleChange}
                        name="image"
                    />
                </div>

                <div className="p-lg">
                    <div className="d-flex f-column m-bottom-md">
                        <span className="m-bottom-sm font-sm bold-5">
                            Title
                        </span>
                        <OutlinedInput
                            onChange={this.handleChange}
                            name="title"
                        />
                    </div>

                    <div className="d-flex f-column">
                        <span className="m-bottom-sm font-sm bold-5">
                            Description
                        </span>
                        <OutlinedTextarea
                            rows={6}
                            onChange={this.handleChange}
                            name="description"
                        />
                    </div>
                </div>
            </div>
        );
    }

    async handleCreate() {
        this.setState({
            loading: true
        });

        let imageUrl = null;
        if (this.state.image) {
            imageUrl = await this.saveImage(this.state.image);
        }


        let series = {
            title: this.state.title,
            description: this.state.description,
            imageUrl: imageUrl
        };

        try {
            let result = await seriesApi.create(series);
            this.props.onClose();
            this.props.onCreated(result.data);
        } catch (error) {
            console.log(error);
        } finally {
            this.setState({
                loading: false
            });
        }
    }

    async saveImage(image) {
        if (image) {
            try {
                let uploadConfig = await this.getUploadConfig();
                await awsApi.uploadImage(uploadConfig.presignedUrl, image);
                return uploadConfig.imageUrl;
            } catch (error) {
                console.log(error);
            }
        }
    }

    async getUploadConfig() {
        try {
            let response = await awsApi.getUploadConfig();
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        }, () => {
            if (this.state.description && this.state.title) {
                this.setState({
                    formValid: true
                });
            }
            else {
                this.setState({
                    formValid: false
                });
            }
        });


    }
}