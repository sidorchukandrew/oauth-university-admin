export default function GuidesList(props) {

    let guides = props.guides?.map(guide => {
        return (
            <div key={guide.id}>
                {guide.title} {guide.description}
            </div>
        );
    });
    return (
        <div>
            {guides}
        </div>
    );
}