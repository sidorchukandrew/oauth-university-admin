import React from "react";

import Checkbox from "@material-ui/core/Checkbox";
import ItemActionsMenu from "./components/ItemActionsMenu";
import { Link } from "react-router-dom";
import seriesApi from "./api/series";

export default class SeriesListEntry extends React.Component {
    constructor(props) {
        super(props);

        this.handleChecked = this.handleChecked.bind(this);
        this.handleEditItem = this.handleEditItem.bind(this);
        this.handleDeleteItem = this.handleDeleteItem.bind(this);
        this.handlePublishItem = this.handlePublishItem.bind(this);
        this.handleUnpublishItem = this.handleUnpublishItem.bind(this);

        this.state = {
            series: props.series,
            bulkItems: props.bulkItems,
            actions: [
                {
                    name: "Edit",
                    handler: this.handleEditItem
                },
                {
                    name: "Delete",
                    handler: this.handleDeleteItem
                }
            ]
        }
    }

    handleChecked(event) {
        let checkedEvent = {
            id: this.state.series.id,
            checked: event.target.checked
        };

        this.props.onCheck(checkedEvent);
    }

    handleEditItem() {

    }

    async handleDeleteItem() {
        try {
            let result = await seriesApi.delete(this.props.series.id);
            this.props.onDelete(this.props.series.id);
            console.log(result);
        } catch (error) {
            console.log(error);
        }
    }

    async handlePublishItem() {
        try {
            let result = await seriesApi.publish(this.props.series.id);
            this.props.onPublish(result.data);
            console.log(result);
        } catch (error) {
            console.log(error);
        }
    }

    async handleUnpublishItem() {
        try {
            let result = await seriesApi.unpublish(this.props.series.id);
            this.props.onUnpublish(result.data);
            console.log(result);
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        let actions = this.state.actions.slice();
        if (this.props.series.published) {
            actions.push({
                name: "Unpublish",
                handler: this.handleUnpublishItem
            });
        } else {
            actions.push({
                name: "Publish",
                handler: this.handlePublishItem
            })
        }


        let series = this.props.series;
        let draftingBubble = (
            <span className="rounded-sm font-xs m-horiz-md warning p-sm">
                Drafting
            </span>
        );

        return (
            <div className="p-vertical-md p-horiz-sm border-btm-grey d-flex align-center justify-space-between">
                <div className="no-grow">
                    <Checkbox
                        size="small"
                        onChange={this.handleChecked}
                        checked={this.props.bulkItems.includes(this.props.series.id)}
                    />
                </div>
                <div className="m-horiz-md flex-grow">
                    <div className="bold-5 m-bottom-sm d-flex align-center">
                        <Link to={"/series/" + series.id}>
                            {series.title}
                        </Link>

                        {series.published ? "" : draftingBubble}
                    </div>
                    <div className="grey-text-6 font-sm m-bottom-sm">
                        {series.description}
                    </div>
                    <div className="grey-text-6 font-xs">

                    </div>
                </div>
                <div className="no-grow">
                    <ItemActionsMenu item={series} actions={actions} />
                </div>
            </div>
        );
    }
}