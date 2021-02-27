import Dialog from "@material-ui/core/Dialog";
import { useEffect, useState } from "react";
import PrimaryButton from "./PrimaryButton";
import OutlinedButton from "./OutlinedButton";
import Checkbox from "@material-ui/core/Checkbox";
import NoContent from "./NoContent";
import guidesApi from "../api/guides";

export default function UnlinkedGuidesDialog(props) {

    let [selectedGuides, setSelectedGuides] = useState([]);
    let [allUnlinkedGuides, setAllUnlinkedGuides] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                let result = await guidesApi.getByFilters({ series_id: null });
                setAllUnlinkedGuides(result.data);
            } catch (error) {
                console.log(error);
            }
        }

        fetchData();
    }, []);

    let handleCheckedChange = (checked, guide) => {

        let updatedSelection = [];
        if (checked) {
            updatedSelection = selectedGuides.slice();
            updatedSelection.push(guide);
        } else {
            updatedSelection = selectedGuides.filter(selectedGuide => selectedGuide.id !== guide.id);
        }
        setSelectedGuides(updatedSelection);
    }

    let handleClose = () => {
        setSelectedGuides([]);
        props.onClose();
    }

    let handleAdd = () => {
        props.onAdd(selectedGuides);
        handleClose();
    }

    let unstagedGuides = allUnlinkedGuides.filter(unlinkedGuide => !props.alreadyLinkedGuides?.includes(unlinkedGuide));
    unstagedGuides = unstagedGuides.map(unstagedGuide => {
        return (
            <div className="bold-4 font-sm p-vertical-sm border-btm-grey d-flex align-center" key={unstagedGuide.id}>
                <Checkbox
                    size="small"
                    checked={selectedGuides.includes(unstagedGuide)}
                    onChange={($event) => handleCheckedChange($event.target.checked, unstagedGuide)}
                />
                {unstagedGuide.title}
            </div>
        )
    });

    return (
        <Dialog open={props.open} onClose={handleClose}>
            <div className="main-font p-lg" style={{ width: "400px" }}>
                <div className="font-regular bold-5 m-bottom-md">
                    Unlinked Guides
                    <span className="grey-text-6 font-sm m-left-md">
                        {selectedGuides.length > 0 ? selectedGuides.length + " selected" : ""}
                    </span>
                </div>
                {unstagedGuides?.length > 0 ? unstagedGuides : <NoContent text="No unlinked guides available" />}
                <div className="d-flex justify-end p-vertical-md align-center main-font">
                    <span className="m-horiz-md">
                        <OutlinedButton name="Cancel" onClick={handleClose} />
                    </span>
                    <span>
                        <PrimaryButton name="Add" onClick={handleAdd} />
                    </span>
                </div>
            </div>
        </Dialog>
    );
}