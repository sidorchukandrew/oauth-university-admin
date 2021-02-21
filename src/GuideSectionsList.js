import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import GuideSection from "./GuideSection";
import AddSectionMenu from "./components/AddSectionMenu";

export default function GuideSectionsList(props) {

    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        result.forEach((section, index) => section.ordinal = index);
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
        console.log(props.sections);
        if (sectionType === "markdown") {
            let updatedSections = JSON.parse(JSON.stringify(props.sections));
            updatedSections.push({
                draggableId: `item-${updatedSections.length}`,
                body: {
                    type: "markdown",
                    content: "Start writing here...",
                    ordinal: updatedSections.length
                }
            });

            props.onChange(updatedSections);
        }
    }

    const handleEditSection = (editEvent) => {
        let updatedSections = JSON.parse(JSON.stringify(props.sections));
        let indexToUpdate = editEvent.section.ordinal;
        console.log(indexToUpdate);
        updatedSections[indexToUpdate].body.content = editEvent.edits;

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
                            {props.sections?.map((item, index) => (
                                <Draggable key={item.draggableId} draggableId={item.draggableId} index={index}>
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
                                                />
                                            </div>
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
            <AddSectionMenu onAdd={handleAddSection} />
        </div>
    );
}

