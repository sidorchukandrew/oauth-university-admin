import React, { useState, useEffect } from 'react';
import seriesApi from "./api/series";
import { useHistory, useParams } from "react-router-dom";
import PrimaryButton from "./components/PrimaryButton";
import ImageUploader from "./components/ImageUploader";
import OutlinedButton from "./components/OutlinedButton";
import Detail from "./components/Detail";
import Bubble from "./components/Bubble";
import SuccessSnackbar from "./components/SuccessSnackbar";
import awsApi from "./api/aws";
import SectionHeading from './components/SectionHeading';
import LinkedGuides from './LinkedGuides';

export default function SeriesDetailPage() {
    const [series, setSeries] = useState({ title: "Loading data..." });
    const [originalSeries, setOriginalSeries] = useState();
    const [edited, setEdited] = useState(false);
    const [saving, setSaving] = useState(false);
    const [editedCoverImage, setEditedCoverImage] = useState(null);
    const [showSuccess, setShowSuccess] = useState(false);

    let { id } = useParams();
    let router = useHistory();

    useEffect(() => {
        async function fetchData() {
            try {
                let result = await seriesApi.getOne(id);
                console.log(result.data);
                setSeries(result.data);
                setOriginalSeries(result.data);
            } catch (error) {
                if (error.response.status === 401) {
                    router.push("/login");
                }
            }
        }
        fetchData();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    let handleEditTitle = (edits) => {
        let updatedSeries = JSON.parse(JSON.stringify(series));
        updatedSeries.title = edits;
        setSeries(updatedSeries);
        setEdited(true);
    };

    let handleEditDescription = (edits) => {
        let updatedSeries = JSON.parse(JSON.stringify(series));
        updatedSeries.description = edits;
        setSeries(updatedSeries);
        setEdited(true);
    };

    let handleEditLinkedGuides = (edits) => {
        let updatedSeries = JSON.parse(JSON.stringify(series));
        updatedSeries.guides = edits;
        console.log(edits);
        console.log(updatedSeries);
        setSeries(updatedSeries);
        setEdited(true);
    }

    let handlePublishedStatus = (published) => {
        let updatedSeries = JSON.parse(JSON.stringify(series));
        updatedSeries.published = published;
        setSeries(updatedSeries);
        setEdited(true);
    }

    let handleEditCoverImage = (event) => {
        if (event.target.value === null) {
            setEditedCoverImage("DELETE");
        } else {
            setEditedCoverImage(event.target.value);
        }
        setEdited(true);
    }

    let handleSaveEdits = async () => {
        setSaving(true);
        let edits = {};

        if (originalSeries.title !== series.title) {
            edits.title = series.title;
        }

        if (originalSeries.description !== series.description) {
            edits.description = series.description;
        }

        if (editedCoverImage) {
            if (editedCoverImage === "DELETE") {
                await awsApi.deleteImage(series.image_url);
                edits.imageUrl = null;
            } else {

                let result = await awsApi.getUploadConfig();
                let uploadConfig = result.data;
                edits.imageUrl = uploadConfig.imageUrl;
                await awsApi.uploadImage(uploadConfig.presignedUrl, editedCoverImage);

                if (series.image_url) {
                    await awsApi.deleteImage(series.image_url);
                }
            }
        }

        if (originalSeries.guides?.length !== series.guides?.length) {
            edits.guides = series.guides;
        }

        edits.published = series.published;

        try {
            let result = await seriesApi.updateOne(series.id, edits);
            setSeries(result.data);
            setOriginalSeries(result.data);
            setEdited(false);
            setEditedCoverImage(null);
            setShowSuccess(true);
        } catch (error) {
            console.log(error);
        } finally {
            setSaving(false);
        }
    }


    return (
        <div>
            <div className="font-lg bold-6 d-flex justify-space-between m-bottom-md">
                <span className="d-flex align-center">
                    {series.title}
                    <span className="m-left-md d-flex align-center">
                        {series.published ? <Bubble type="primary">Published</Bubble> : <Bubble type="warn">Drafting</Bubble>}
                    </span>
                </span>
                <div className="d-flex align-center">
                    <span className="m-horiz-md d-flex align-center">
                        {series.published ?
                            <OutlinedButton name="Unpublish" onClick={() => handlePublishedStatus(false)} />
                            : <OutlinedButton name="Publish" onClick={() => handlePublishedStatus(true)} />}
                    </span>
                    <span className="d-flex align-center">
                        <PrimaryButton
                            name="Save"
                            disabled={!edited}
                            onClick={handleSaveEdits}
                            loading={saving}
                        ></PrimaryButton>
                    </span>
                </div>
            </div>
            <div>

                <SectionHeading title="Series">
                </SectionHeading>

                <div className="m-vertical-lg">
                    <div className="font-xs bold-5 grey-text-6 m-bottom-sm">
                        Cover Image
                </div>
                    <div className="font-sm">
                        <ImageUploader imageUrl={editedCoverImage === 'DELETE' ? null : series.image_url} onImageChange={handleEditCoverImage} />
                    </div>
                </div>

                <div className="m-vertical-lg">
                    <Detail
                        label="Title"
                        value={series.title}
                        editable={true}
                        onCommitEdits={handleEditTitle}
                    />
                </div>

                <div className="m-vertical-lg">
                    <Detail
                        label="Description"
                        value={series.description}
                        editable={true}
                        inputType="textarea"
                        onCommitEdits={handleEditDescription}
                    />
                </div>

                <div className="m-vertical-lg d-flex justify-space-between">
                    <div className="half-width">
                        <Detail
                            label="Created"
                            value={new Date(series.created_at).toDateString()}
                            editable={false}
                        />
                    </div>

                    <div className="half-width">
                        <Detail
                            label="First Published"
                            value={series.published_date ? new Date(series.published_date).toDateString() : "Never"}
                            editable={false}
                        />
                    </div>

                    <SuccessSnackbar showSuccess={showSuccess} />
                </div>
            </div>

            <div>
                <LinkedGuides
                    guides={series.guides}
                    onChange={handleEditLinkedGuides}
                />
            </div>
        </div>
    );
}