import React from "react";
import seriesApi from "./api/series";
import BulkActionsBar from "./components/BulkActionsBar";
import SeriesListEntry from "./SeriesListEntry";
import Loader from "react-loader-spinner";


export default class SeriesList extends React.Component {
    constructor(props) {
        super(props);

        this.componentDidMount = this.componentDidMount.bind(this);
        this.addToBulkItems = this.addToBulkItems.bind(this);
        this.handleCloseBulkActions = this.handleCloseBulkActions.bind(this);
        this.handlePublishBulk = this.handlePublishBulk.bind(this);
        this.handleUnpublishBulk = this.handleUnpublishBulk.bind(this);
        this.handleDeleteBulk = this.handleDeleteBulk.bind(this);
        this.handleDeleteItem = this.handleDeleteItem.bind(this);
        this.handleUpdateItem = this.handleUpdateItem.bind(this);

        this.state = {
            allSeries: [],
            bulkItems: [],
            bulkActions: [{
                name: "Delete",
                handler: this.handleDeleteBulk
            },
            {
                name: "Publish",
                handler: this.handlePublishBulk
            },
            {
                handler: this.handleUnpublishBulk,
                name: "Unpublish",
            },
            {
                handler: this.handleCloseBulkActions,
                name: "Cancel",
            },
            ],
            loadingFromApi: false
        }
    }

    async componentDidMount() {
        this.setState({ loadingFromApi: true });
        try {
            let response = await seriesApi.getAll();
            this.setState({
                allSeries: response.data
            });
        } catch (error) {
            if (error.response.status === 401) {

            }
        } finally {
            this.setState({ loadingFromApi: false });
        }
    }


    handleCloseBulkActions() {
        this.setState({
            bulkItems: [],
        });
    }

    addToBulkItems(event) {
        let bulkItems = JSON.parse(JSON.stringify(this.state.bulkItems));
        if (event.checked) {
            bulkItems.push(event.id);
        } else {
            bulkItems = bulkItems.filter(id => id !== event.id);
        }

        this.setState({
            bulkItems: bulkItems
        });
    }

    async handlePublishBulk() {
        this.setState({
            bulkActionLoading: true
        });

        try {
            let result = await seriesApi.publishBulk(this.state.bulkItems);
            this.updateCurrentState(result.data);
            this.handleCloseBulkActions();
            this.setState({
                showSuccess: true
            });
        } catch (error) {
            console.log(error);
        } finally {
            this.setState({
                bulkActionLoading: false
            });
        }
    }

    async handleUnpublishBulk() {
        this.setState({
            bulkActionLoading: true
        });
        try {

            let result = await seriesApi.unpublishBulk(this.state.bulkItems);
            this.updateCurrentState(result.data);
            this.handleCloseBulkActions();
            this.setState({
                showSuccess: true
            });
        } catch (error) {
            console.log(error);
        } finally {
            this.setState({
                bulkActionLoading: false
            })
        }
    }

    async handleDeleteBulk() {
        this.setState({
            bulkActionLoading: true
        });
        try {

            await seriesApi.deleteBulk(this.state.bulkItems);
            let remainingSeries = this.state.allSeries.filter(series => {
                return !this.state.bulkItems.includes(series.id);
            });
            this.setState({
                allSeries: remainingSeries
            })
            this.handleCloseBulkActions();
            this.setState({
                showSuccess: true
            });
        } catch (error) {
            console.log(error);
        } finally {
            this.setState({
                bulkActionLoading: false
            })
        }
    }

    updateCurrentState(newSeries) {
        let currentSeriesState = this.state.allSeries.slice();

        newSeries.forEach(series => {
            let index = currentSeriesState.findIndex(currentSeries => currentSeries.id === series.id);
            if (index !== -1) {
                currentSeriesState[index] = series;
            }
        });

        this.setState({
            allSeries: currentSeriesState
        });
    }

    handleDeleteItem(seriesId) {
        let remainingSeries = this.state.allSeries.filter(series => {
            return series.id !== seriesId;
        });
        this.setState({
            allSeries: remainingSeries
        });
    }

    handleUpdateItem(updatedSeries) {
        let allSeries = this.state.allSeries.slice();

        let indexOfSeries = allSeries.findIndex(series => series.id === updatedSeries.id);

        if (indexOfSeries > -1) {
            allSeries[indexOfSeries] = updatedSeries;
        }

        this.setState({
            allSeries: allSeries
        });
    }

    render() {

        let list = this.state.allSeries.map(series => {
            return (
                <SeriesListEntry
                    key={series.id}
                    series={series}
                    onCheck={this.addToBulkItems}
                    bulkItems={this.state.bulkItems}
                    onDelete={this.handleDeleteItem}
                    onPublish={this.handleUpdateItem}
                    onUnpublish={this.handleUpdateItem}
                />
            );
        });

        let loadingIndicator = (
            <div className="d-flex justify-center p-lg">
                <Loader type="TailSpin" color="#5f57ec" height="100" style={{ transform: "translateX('-25px')" }} />
            </div>
        );

        return (
            <div>
                {this.state.loadingFromApi ? loadingIndicator : list}
                <BulkActionsBar
                    open={this.state.bulkItems.length > 0}
                    actions={this.state.bulkActions}
                    items={this.state.bulkItems}
                    loading={this.state.bulkActionLoading}
                />
            </div>
        );
    }
}