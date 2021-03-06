import OAuthButtonGenerator from './components/OAuthButtonGenerator';
import Markdown from './Markdown';
import ImageUploader from "./components/ImageUploader";

export default function GuideSection(props) {

    let sectionContent = null;

    if (props.section?.section_type === "markdown") {
        sectionContent = (
            <Markdown
                content={props.section?.content}
                onChange={(edits) => props.onChange({ edits: edits, section: props.section, target: "markdown" })}
            />
        );
    } else if (props.section?.section_type === "component") {
        let componentType = props.section?.content;

        if (componentType === "button generator") {
            sectionContent = (
                <OAuthButtonGenerator
                    config={props.section?.oauth_config}
                    onChange={(edits) => props.onChange({ edits: edits, section: props.section, target: "button generator" })}
                />
            );
        }
    } else if (props.section?.section_type === "image") {
        sectionContent = (
            <ImageUploader
                imageUrl={props.section?.content}
                onImageChange={(event) => props.onChange({ edits: event.target.value, section: props.section, target: "image" })}
            />
        );
    }

    return sectionContent;
}