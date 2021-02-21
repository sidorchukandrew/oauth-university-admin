import UnlinkIcon from "@material-ui/icons/LinkOff";
import SectionHeading from './components/SectionHeading';
import PrimaryButton from "./components/PrimaryButton";
import UnlinkedGuidesDialog from "./components/UnlinkedGuidesDialog";
import { useState } from "react";
import NoContent from "./components/NoContent";

export default function LinkedGuides(props) {

    const [showUnlinkedGuides, setShowUnlinkedGuides] = useState(false);
    const [linkedGuides, setLinkedGuides] = useState([]);

    let handleToggleUnlinkedGuides = (value) => {
        setShowUnlinkedGuides(value);
    }

    let handleUnlink = (guideToUnlink) => {
        let updatedLinkedGuides = linkedGuides.filter(guide => guide !== guideToUnlink);
        setLinkedGuides(updatedLinkedGuides);
    }

    let guides = linkedGuides.map(guide => {
        return (
            <div className="bold-4 font-sm p-md border-btm-grey d-flex" key={guide}>
                {guide}
                <span
                    className="m-left-md grey-text-6 hov-secondary-color"
                    onClick={() => handleUnlink(guide)}
                >
                    <UnlinkIcon style={{ fontSize: "18px" }} />
                </span>
            </div>
        );
    });

    let handleAddLinkedGuides = (addedGuides) => {
        let updatedLinkedGuides = linkedGuides.concat(addedGuides);
        setLinkedGuides(updatedLinkedGuides);
    };

    return (
        <div>

            <SectionHeading title="Guides">
                <PrimaryButton
                    name="Add"
                    onClick={() => handleToggleUnlinkedGuides(true)}
                />
            </SectionHeading>

            <div className="grey-bg-5">
                {guides.length > 0 ? guides : <NoContent text="No guides linked yet" />}
            </div>

            <UnlinkedGuidesDialog
                open={showUnlinkedGuides}
                onClose={() => handleToggleUnlinkedGuides(false)}
                onAdd={handleAddLinkedGuides}
            />
        </div>
    );
}