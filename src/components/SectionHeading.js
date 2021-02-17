export default function SectionHeading(props) {
    let classes = "d-flex justify-space-between";

    let marginClass = props.children ? "m-bottom-md" : "";

    classes = classes + " " + marginClass;

    return (
        <div className="border-btm-grey">
            <div className={classes}>
                <span className="font-md d-flex align-center">{props.title}</span>
                {props.children}
            </div>
        </div>
    );
}  