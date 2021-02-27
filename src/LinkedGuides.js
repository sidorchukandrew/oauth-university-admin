import UnlinkIcon from "@material-ui/icons/LinkOff";
import SectionHeading from './components/SectionHeading';
import PrimaryButton from "./components/PrimaryButton";
import UnlinkedGuidesDialog from "./components/UnlinkedGuidesDialog";
import { useState } from "react";
import NoContent from "./components/NoContent";

export default function LinkedGuides(props) {

    const [showUnlinkedGuides, setShowUnlinkedGuides] = useState(false);

    let handleUnlink = (guideToUnlink) => {
        let updatedLinkedGuides = props.guides?.filter(guide => guide.id !== guideToUnlink.id);
        props.onChange(updatedLinkedGuides);
    }

    let guides = props.guides?.map(guide => {
        return (
            <div className="bold-4 font-sm p-md border-btm-grey d-flex" key={guide.id}>
                {guide.title}
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
        let updatedLinkedGuides = props.guides?.concat(addedGuides);
        props.onChange(updatedLinkedGuides);
    };

    return (
        <div>
            <SectionHeading title="Guides">
                <PrimaryButton
                    name="Add"
                    onClick={() => setShowUnlinkedGuides(true)}
                />
            </SectionHeading>

            <div className="grey-bg-5">
                {props.guides?.length > 0 ? guides : <NoContent text="No guides linked yet" />}
            </div>

            <UnlinkedGuidesDialog
                open={showUnlinkedGuides}
                onClose={() => setShowUnlinkedGuides(false)}
                onAdd={handleAddLinkedGuides}
                alreadyLinkedGuides={props.guides}
            />
        </div>
    );
}