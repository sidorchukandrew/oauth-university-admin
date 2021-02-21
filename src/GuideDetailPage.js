import { useParams } from "react-router-dom";
import guidesApi from "./api/guides";
import { useEffect, useState } from "react";
import GuideEditor from "./GuideEditor";
import Loader from "react-loader-spinner";
import Bubble from "./components/Bubble";
import { useHistory } from "react-router-dom";

export default function GuideDefaultPage() {
    const [guide, setGuide] = useState({});
    const [loading, setLoading] = useState(false);
    const [actionLoading, setActionLoading] = useState(false);
    let { id } = useParams();
    const routeHistory = useHistory();

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            try {
                let result = await guidesApi.getOne(id);
                setGuide(result.data);
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
            let updates = buildBaseUpdate(guide);
            let result = await guidesApi.updateOne(guide?.id, updates);
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

function buildBaseUpdate(guide) {
    let updates = {}
    if (guide.title) {
        updates.title = guide.title;
    }

    if (guide.description) {
        updates.description = guide.description;
    }

    if (guide.sections) {
        updates.sections = guide.sections;
    }

    return updates;
}