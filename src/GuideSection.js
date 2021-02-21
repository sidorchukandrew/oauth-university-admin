import Markdown from './Markdown';

export default function GuideSection(props) {

    let sectionContent = null;

    if (props.section?.type === "markdown") {
        sectionContent = (
            <Markdown
                content={props.section?.content}
                onChange={(edits) => props.onChange({ edits: edits, section: props.section })}
            />
        );
    } else if (props.section?.type === "component") {
        sectionContent = props.section?.content;
    }

    return sectionContent;
}