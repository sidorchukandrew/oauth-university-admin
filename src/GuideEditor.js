import GuideSectionsList from "./GuideSectionsList";
import DropdownButtonGroup from "./components/DropdownButtonGroup";
import ClickEditField from "./components/ClickEditField";

export default function GuideEditor(props) {

    let actions = ["Cancel"];
    if (props.guide?.published) {
        actions.unshift("Save and Unpublish")
    } else {
        actions.unshift("Save and Publish");
    }
    actions.unshift("Save");

    let handleUpdateTitle = (newTitle) => {
        let guide = JSON.parse(JSON.stringify(props.guide));
        guide.title = newTitle;
        props.onEdit(guide);
    }

    let handleUpdateDescription = (newDescription) => {
        let guide = JSON.parse(JSON.stringify(props.guide));
        guide.description = newDescription;
        props.onEdit(guide);
    }

    let handleUpdateSections = (newSections) => {
        console.log(newSections);
        let guide = JSON.parse(JSON.stringify(props.guide));
        guide.sections = newSections.map(section => {
            return section.body
        });

        props.onEdit(guide);
    }

    return (
        <div>
            <div className="m-bottom-xl d-flex align-center justify-space-between">
                <div className="font-sm grey-text-5">
                    Last Edited {new Date(props.guide?.updated_at).toDateString()}
                </div>
                <div>
                    <DropdownButtonGroup
                        buttons={actions}
                        onActionClick={props.onGuideActionClick}
                        loading={props.actionLoading}
                    />
                </div>
            </div>
            <div className="d-flex align-center m-bottom-md">
                <div className="font-xs m-right-lg d-flex align-center grey-text-5" style={{ minWidth: "100px" }}>
                    TITLE
                </div>
                <div className="bold-6 font-lg">
                    <ClickEditField
                        content={props.guide?.title}
                        onChange={handleUpdateTitle}
                    />
                </div>
            </div>

            <div className="d-flex align-center m-bottom-md">
                <div className="font-xs m-right-lg d-flex align-center grey-text-5" style={{ minWidth: "100px" }}>
                    DESCRIPTION
                </div>
                <div className="grey-text-7 font-sm">
                    <ClickEditField
                        content={props.guide?.description}
                        onChange={handleUpdateDescription}
                    />
                </div>
            </div>
            <GuideSectionsList
                onChange={handleUpdateSections}
                sections={toDraggableSections(props.guide?.sections ? sortByOrdinal(props.guide.sections) : [])}
            />
        </div>
    );
}

function toDraggableSections(sections) {
    return sections?.map((section, index) => ({
        draggableId: `item-${index}`,
        body: section
    }));
}

function sortByOrdinal(sections) {
    return sections?.sort((a, b) => a.ordinal - b.ordinal);
}