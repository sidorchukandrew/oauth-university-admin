import GuidesListEntry from "./GuidesListEntry";

export default function GuidesList(props) {

    let guides = props.guides?.map(guide => {
        return (
            <GuidesListEntry key={guide.id} guide={guide} />
        );
    });
    return (
        <div>
            {guides}
        </div>
    );
}