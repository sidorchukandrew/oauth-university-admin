import { useState, useEffect } from "react";
import PageHeading from "./components/PageHeading";
import NoContent from "./components/NoContent";
import CreateGuidePanel from "./CreateGuidePanel";
import GuidesList from "./GuidesList";
import guidesApi from "./api/guides";

export default function GuidesPage(props) {
    const [allGuides, setAllGuides] = useState([]);
    const [showCreatePanel, setShowCreatePanel] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                let result = await guidesApi.getAll();
                setAllGuides(result.data);
            } catch (error) {
                console.log(error);
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

    return (
        <div>
            <PageHeading
                title="Guides"
                onActionClicked={() => handleToggleCreatePanel(true)}
            />

            {allGuides.length > 0 ? <GuidesList guides={allGuides} /> : <NoContent text="No guides created yet" />}

            <CreateGuidePanel
                open={showCreatePanel}
                onClose={() => handleToggleCreatePanel(false)}
                onCreated={handleCreated}
            />
        </div>
    );
}