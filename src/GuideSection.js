import OAuthButtonGenerator from './components/OAuthButtonGenerator';
import Markdown from './Markdown';
import ImageUploader from "./components/ImageUploader";
import DeleteIcon from "@material-ui/icons/Clear";

export default function GuideSection(props) {

    let sectionContent = null;

    if (props.section?.section_type === "markdown") {
        sectionContent = (
            <Markdown
                section={props.section}
                content={props.section?.content}
                onChange={(edits) => props.onChange({ edits: edits, section: props.section, target: "markdown" })}
                onDelete={props.onDelete}
            />
        );
    } else if (props.section?.section_type === "component") {
        let componentType = props.section?.content;

        if (componentType === "button generator") {
            sectionContent = (
                <OAuthButtonGenerator
                    section={props.section}
                    config={props.section?.oauth_config}
                    onDelete={props.onDelete}
                    onChange={(edits) => props.onChange({ edits: edits, section: props.section, target: "button generator" })}
                />
            );
        }
    } else if (props.section?.section_type === "image") {
        sectionContent = (
            <div className="d-flex justify-space-between align-center">
                <div>
                    <ImageUploader
                        imageUrl={props.section?.content}
                        showImageActions={false}
                        onImageChange={(event) => props.onChange({ edits: event.target.value, section: props.section, target: "image" })}
                    />
                </div>
                <span className="m-left-lg grey-text-6 hov-error-color">
                    <DeleteIcon style={{ fontSize: "22px" }} onClick={() => props.onDelete(props.section)} />
                </span>
            </div>
        );
    } else if (!props.section?.section_type) {
        sectionContent = (
            <div className="d-flex justify-end">
                <span className="m-left-lg grey-text-6 hov-error-color">
                    <DeleteIcon style={{ fontSize: "22px" }} onClick={() => props.onDelete(props.section)} />
                </span>
            </div>
        )
    }

    return sectionContent;
}