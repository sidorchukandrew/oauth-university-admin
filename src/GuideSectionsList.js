import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import GuideSection from "./GuideSection";
import AddSectionMenu from "./components/AddSectionMenu";

export default function GuideSectionsList(props) {

    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        result.forEach((section, index) => section.body.ordinal = index);
        return result;
    };

    const grid = 8;

    const getItemStyle = (isDragging, draggableStyle) => ({
        userSelect: "none",
        paddingTop: grid,
        paddingBottom: grid,
        margin: `0 0 ${grid}px 0`,
        background: "white",
        borderRadius: 4,
        boxShadow: isDragging ? "0px 10px 15px 0px rgba(157, 106, 106, 0.15)" : "",
        cursor: "default",
        ...draggableStyle
    });


    const getListStyle = isDraggingOver => ({
        padding: 0,
        width: "100%",
    });

    const onDragEnd = (result) => {
        if (!result.destination) {
            return;
        }

        const reorderedSections = reorder(
            props.sections,
            result.source.index,
            result.destination.index
        );

        props.onChange(reorderedSections);

    }

    const handleAddSection = (sectionType) => {
        if (sectionType === "markdown") {
            let updatedSections = JSON.parse(JSON.stringify(props.sections));
            updatedSections.push({
                draggableId: `item-${updatedSections.length}`,
                body: {
                    section_type: "markdown",
                    content: "Start writing here...",
                    ordinal: updatedSections.length
                }
            });
            props.onChange(updatedSections);
        }

        else if (sectionType === "button generator") {
            let updatedSections = JSON.parse(JSON.stringify(props.sections));
            updatedSections.push({
                draggableId: `item-${updatedSections.length}`,
                body: {
                    section_type: "component",
                    content: "button generator",
                    ordinal: updatedSections.length
                }
            });

            props.onChange(updatedSections);
        }

        else if (sectionType === "image") {
            let updatedSections = JSON.parse(JSON.stringify(props.sections));
            updatedSections.push({
                draggableId: `item-${updatedSections.length}`,
                body: {
                    section_type: "image",
                    content: null,
                    ordinal: updatedSections.length
                }
            });

            props.onChange(updatedSections);
        }
    }

    const handleEditSection = (editEvent) => {
        let updatedSections = JSON.parse(JSON.stringify(props.sections));
        let indexToUpdate = editEvent.section.ordinal;

        if (editEvent.target === "markdown") {
            updatedSections[indexToUpdate].body.content = editEvent.edits;
        } else if (editEvent.target === "button generator") {
            updatedSections[indexToUpdate].body.oauth_config = editEvent.edits;
        } else if (editEvent.target === "image") {
            updatedSections[indexToUpdate].body.file = editEvent.edits;
        }

        props.onChange(updatedSections);
    }

    const handleDeleteSection = (sectionToDelete) => {
        let updatedSections = JSON.parse(JSON.stringify(props.sections));
        if (sectionToDelete.id) {
            let indexToDelete = updatedSections.findIndex(draggableSection => draggableSection.body.id === sectionToDelete.id);
            if (indexToDelete > -1) {
                updatedSections[indexToDelete].body._destroy = 1;
            }
        } else {
            updatedSections = props.sections.filter(draggableSection => {
                return draggableSection !== sectionToDelete
            });
        }
        props.onChange(updatedSections);
    }

    return (
        <div>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="droppable">
                    {(provided, snapshot) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            style={getListStyle(snapshot.isDraggingOver)}
                        >
                            {props.sections?.map((item, index) => {
                                if (item.body._destroy === 1) {
                                    return ""
                                } else {
                                    return (<Draggable key={item.draggableId} draggableId={item.draggableId} index={index}>
                                        {(provided, snapshot) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                style={getItemStyle(
                                                    snapshot.isDragging,
                                                    provided.draggableProps.style
                                                )}
                                                className="d-flex align-center m-bottom-md"
                                            >
                                                <div className="font-xs m-right-lg d-flex align-center grey-text-5"
                                                    style={{ minWidth: "100px" }}
                                                >
                                                    SECTION {index + 1}
                                                </div>
                                                <div className="flex-grow">
                                                    <GuideSection
                                                        section={item.body}
                                                        onChange={handleEditSection}
                                                        onDelete={handleDeleteSection}
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </Draggable>
                                    )
                                }
                            })}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
            <AddSectionMenu onAdd={handleAddSection} />
        </div>
    );
}

