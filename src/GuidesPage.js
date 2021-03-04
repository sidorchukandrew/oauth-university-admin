import { useState, useEffect } from "react";
import PageHeading from "./components/PageHeading";
import NoContent from "./components/NoContent";
import CreateGuidePanel from "./CreateGuidePanel";
import GuidesList from "./GuidesList";
import guidesApi from "./api/guides";
import Loader from "react-loader-spinner";

export default function GuidesPage(props) {
    const [allGuides, setAllGuides] = useState([]);
    const [showCreatePanel, setShowCreatePanel] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchData() {
            document.title = "Guides";
            setLoading(true);
            try {
                let result = await guidesApi.getAll();
                setAllGuides(result.data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    let handleToggleCreatePanel = (value) => {
        setShowCreatePanel(value);
    }

    let handleCreated = (createdGuide) => {
        let updatedGuidesList = JSON.parse(JSON.stringify(allGuides));
        updatedGuidesList.push(createdGuide);

        setAllGuides(updatedGuidesList);
    }

    let handleDeleteGuide = async (deletedGuideId) => {
        try {
            await guidesApi.delete(deletedGuideId);
            let updatedGuidesList = allGuides.filter(guide => guide.id !== deletedGuideId);
            setAllGuides(updatedGuidesList);
        } catch (error) {
            console.log(error);
        }
    }

    let loadingIndicator = (
        <div className="d-flex justify-center p-lg">
            <Loader type="TailSpin" color="#5f57ec" height="100" style={{ transform: "translateX('-25px')" }} />
        </div>
    );

    let noContent = loading ? loadingIndicator : <NoContent text="No guides created yet" />;

    return (
        <div>
            <PageHeading
                title="Guides"
                onActionClicked={() => handleToggleCreatePanel(true)}
            />

            {allGuides.length > 0 ? <GuidesList guides={allGuides} onDeleteGuide={handleDeleteGuide} /> : noContent}

            <CreateGuidePanel
                open={showCreatePanel}
                onClose={() => handleToggleCreatePanel(false)}
                onCreated={handleCreated}
            />
        </div>
    );
}