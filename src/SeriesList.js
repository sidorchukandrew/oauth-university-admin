import { useEffect, useState } from "react";
import seriesApi from "./api/series";
import BulkActionsBar from "./components/BulkActionsBar";
import SeriesListEntry from "./SeriesListEntry";
import Loader from "react-loader-spinner";
import { useHistory } from "react-router";


export default function SeriesList(props) {

    const [allSeries, setAllSeries] = useState([]);
    const [bulkItems, setBulkItems] = useState([]);
    const [loadingFromApi, setLoadingFromApi] = useState(false);
    const [bulkActionLoading, setBulkActionLoading] = useState(false);
    const router = useHistory();

    useEffect(() => {
        async function fetchData() {
            setLoadingFromApi(true);
            try {
                let response = await seriesApi.getAll();
                setAllSeries(response.data);
            } catch (error) {
                if (error.response.status === 401) {
                    router.push("/login");
                }
            } finally {
                setLoadingFromApi(false);
            }
        }
        fetchData();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps


    const handleCloseBulkActions = () => {
        setBulkItems([]);
    }

    const addToBulkItems = (event) => {
        let updatedBulkItems = JSON.parse(JSON.stringify(bulkItems));
        if (event.checked) {
            updatedBulkItems.push(event.id);
        } else {
            updatedBulkItems = bulkItems.filter(id => id !== event.id);
        }
        setBulkItems(updatedBulkItems);
    }

    const handlePublishBulk = async () => {
        setBulkActionLoading(true);

        try {
            let result = await seriesApi.publishBulk(bulkItems);
            updateCurrentState(result.data);
            handleCloseBulkActions();
        } catch (error) {
            console.log(error);
        } finally {
            setBulkActionLoading(false);
        }
    }

    const handleUnpublishBulk = async () => {
        setBulkActionLoading(true);
        try {
            let result = await seriesApi.unpublishBulk(bulkItems);
            updateCurrentState(result.data);
            handleCloseBulkActions();
        } catch (error) {
            console.log(error);
        } finally {
            setBulkActionLoading(false);
        }
    }

    const handleDeleteBulk = async () => {
        setBulkActionLoading(true);
        try {
            await seriesApi.deleteBulk(bulkItems);
            let remainingSeries = allSeries.filter(series => {
                return !bulkItems.includes(series.id);
            });
            setAllSeries(remainingSeries);
            handleCloseBulkActions();
        } catch (error) {
            console.log(error);
        } finally {
            setBulkActionLoading(false);
        }
    }

    const updateCurrentState = (newSeries) => {
        let currentSeriesState = allSeries.slice();

        newSeries.forEach(series => {
            let index = currentSeriesState.findIndex(currentSeries => currentSeries.id === series.id);
            if (index !== -1) {
                currentSeriesState[index] = series;
            }
        });
        setAllSeries(currentSeriesState);
    }

    const handleDeleteItem = (seriesId) => {
        let remainingSeries = allSeries.filter(series => {
            return series.id !== seriesId;
        });
        setAllSeries(remainingSeries);
    }

    const handleUpdateItem = (updatedSeries) => {
        let updatedSeriesList = allSeries.slice();

        let indexOfSeries = updatedSeriesList.findIndex(series => series.id === updatedSeries.id);

        if (indexOfSeries > -1) {
            updatedSeriesList[indexOfSeries] = updatedSeries;
        }
        setAllSeries(updatedSeriesList);
    }

    const [bulkActions] = useState([{
        name: "Delete",
        handler: handleDeleteBulk
    },
    {
        name: "Publish",
        handler: handlePublishBulk
    },
    {
        handler: handleUnpublishBulk,
        name: "Unpublish",
    },
    {
        handler: handleCloseBulkActions,
        name: "Cancel",
    }]);

    let list = allSeries.map(series => {
        return (
            <SeriesListEntry
                key={series.id}
                series={series}
                onCheck={addToBulkItems}
                bulkItems={bulkItems}
                onDelete={handleDeleteItem}
                onPublish={handleUpdateItem}
                onUnpublish={handleUpdateItem}
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
            {loadingFromApi ? loadingIndicator : list}
            <BulkActionsBar
                open={bulkItems.length > 0}
                actions={bulkActions}
                items={bulkItems}
                loading={bulkActionLoading}
            />
        </div>
    );
}