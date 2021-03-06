
import React from "react";
import DeleteIcon from "@material-ui/icons/DeleteOutline";
import IconButton from "@material-ui/core/IconButton";

export default class ImageUploader extends React.Component {

    constructor(props) {
        super(props);
        this.hiddenFileLoader = React.createRef();
        this.state = {
            imageUrl: props.imageUrl,
            showImageActions: false
        };

        this.handleUploadClick = this.handleUploadClick.bind(this);
        this.handleRemoveClick = this.handleRemoveClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.createEvent = this.createEvent.bind(this);
    }

    handleUploadClick() {
        this.hiddenFileLoader.current.click();
    }

    handleRemoveClick() {
        this.setState({
            imageUrl: ""
        });

        this.props.onImageChange(this.createEvent(null));
    }

    createEvent(value) {
        let event = {
            target: {
                name: this.props.name,
                value: value
            }
        };

        return event;
    }

    handleChange(event) {
        if (event.target?.files[0]) {
            let file = event.target?.files[0];

            if (file.type === "image/png" || file.type === "image/jpeg") {

                this.props.onImageChange(this.createEvent(file));

                let reader = new FileReader();
                reader.onload = () => this.setState({
                    imageUrl: reader.result
                });

                reader.readAsDataURL(file);
            }
        }
    }

    render() {

        let imageUrl = null;
        if (this.state.imageUrl) {
            imageUrl = this.state.imageUrl;
        }

        else if (this.props.imageUrl) {
            imageUrl = this.props.imageUrl;
        }
        else {
            imageUrl = null;
        }

        let imagePreview = <div style={{ position: "relative" }}>
            <img
                src={imageUrl}
                className="full-width pointer"
                alt="Series"
                onClick={this.handleUploadClick}
                accept="image/png, image/jpeg"
                style={{ height: "200px", minheight: "200px", maxHeight: "200px" }}
            />

            {this.state.showImageActions ? (
                <div className="d-flex justify-end">
                    <IconButton onClick={this.handleRemoveClick} >
                        <DeleteIcon />
                    </IconButton>
                </div>
            ) : ""}
        </div>;

        let uploadButton = <div
            onClick={this.handleUploadClick}
            className="pointer d-flex justify-center f-column align-center hov-secondary-color grey-bg-5"
            style={{ height: "200px" }}
        >
            <span>Upload an Image</span>
        </div>
        return (
            <div>
                <input
                    type="file"
                    ref={this.hiddenFileLoader}
                    onChange={this.handleChange}
                    style={{ display: 'none' }}
                />

                {imageUrl ? imagePreview : uploadButton}
            </div>
        );
    }
}