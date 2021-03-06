import { useParams } from "react-router-dom";
import guidesApi from "./api/guides";
import { useEffect, useState } from "react";
import GuideEditor from "./GuideEditor";
import Loader from "react-loader-spinner";
import Bubble from "./components/Bubble";
import { useHistory } from "react-router-dom";
import awsApi from "./api/aws";

export default function GuideDefaultPage() {
    const [guide, setGuide] = useState({});
    const [loading, setLoading] = useState(false);
    const [actionLoading, setActionLoading] = useState(false);
    let { id } = useParams();
    const routeHistory = useHistory();

    useEffect(() => {
        document.title = "Guides"
        async function fetchData() {
            setLoading(true);
            try {
                let result = await guidesApi.getOne(id);
                setGuide(result.data);
                document.title = "Guides | " + result.data?.title;
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    let handleActionClick = (action) => {
        let lowercasedAction = action?.toLowerCase();
        if (lowercasedAction === "save") {
            handleSave();
        } else if (lowercasedAction === "save and publish") {
            handleSaveAndPublish();
        } else if (lowercasedAction === "save and unpublish") {
            handleSaveAndUnpublish();
        } else if (lowercasedAction === "cancel") {
            handleCancel();
        }
    }

    let handleSave = async () => {
        setActionLoading(true);
        try {
            let updates = await buildBaseUpdate(guide);
            let result = await guidesApi.updateOne(guide?.id, updates);
            console.log(result);
            setGuide(result.data);
        } catch (error) {
            console.log(error);
        } finally {
            setActionLoading(false);
        }
    }

    let handleSaveAndPublish = async () => {
        setActionLoading(true);
        try {
            let updates = buildBaseUpdate(guide);
            updates.published = true;
            let result = await guidesApi.updateOne(guide?.id, updates);
            setGuide(result.data);
        } catch (error) {
            console.log(error);
        } finally {
            setActionLoading(false);
        }
    }

    let handleSaveAndUnpublish = async () => {
        setActionLoading(true);
        try {
            let updates = buildBaseUpdate(guide);
            updates.published = false;
            let result = await guidesApi.updateOne(guide?.id, updates);
            setGuide(result.data);
        } catch (error) {
            console.log(error);
        } finally {
            setActionLoading(false);
        }
    }

    let handleCancel = () => {
        routeHistory.push("/guides");
    }

    let handleEdit = (updatedGuide) => {
        setGuide(updatedGuide);
    }

    let loadingIndicator = (
        <div className="d-flex justify-center f-column align-center">
            <Loader type="TailSpin" color="#5f57ec" height="100" style={{ transform: "translateX('-25px')" }} />
            Loading guide ...
        </div>
    );

    let guideEditor = (
        <div>
            <div>
                {guide?.published ? <Bubble type="primary">Published</Bubble> : <Bubble type="warn">Drafting</Bubble>}
            </div>
            <GuideEditor
                guide={guide}
                onGuideActionClick={handleActionClick}
                onEdit={handleEdit}
                actionLoading={actionLoading}
            />
        </div>
    );

    let component = loading ? loadingIndicator : guideEditor;

    return (
        <div>
            {component}
        </div>
    );
}

async function buildBaseUpdate(guide) {
    let updates = {}
    if (guide.title) {
        updates.title = guide.title;
    }

    if (guide.description) {
        updates.description = guide.description;
    }

    if (guide.sections) {
        updates.sections = await Promise.all(guide.sections.map(async (section) => {
            if (section.section_type === "image" && section.file) {
                try {
                    let uploadConfig = await getUploadConfig();
                    console.log(uploadConfig);
                    await awsApi.uploadImage(uploadConfig.presignedUrl, section.file);

                    delete section.file;
                    section.content = uploadConfig.imageUrl;
                } catch (error) {
                    console.log(error);
                }
            }
            return section;
        }));
    }

    return updates;
}

async function getUploadConfig() {
    try {
        let response = await awsApi.getUploadConfig();
        return response.data;
    } catch (error) {
        console.log(error);
    }
}