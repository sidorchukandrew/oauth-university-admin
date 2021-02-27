import GuidesListEntry from "./GuidesListEntry";

export default function GuidesList(props) {

    let guides = props.guides?.map(guide => {
        return (
            <GuidesListEntry
                key={guide.id}
                guide={guide}
                onDeleteGuide={props.onDeleteGuide}
            />
        );
    });
    return (
        <div>
            {guides}
        </div>
    );
}