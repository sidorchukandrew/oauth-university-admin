import { Drawer } from "@material-ui/core";
import PrimaryButton from "./components/PrimaryButton";
import OutlinedButton from "./components/OutlinedButton";
import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 200;

const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
        backgroundColor: "white"
    },
}));

export default function GuideEditorPanel(props) {
    const classes = useStyles();

    return (
        <Drawer
            anchor="right"
            variant="permanent"
            className={classes.drawer}
            classes={
                { paper: classes.drawerPaper }
            }
        >
            <div className="p-lg">
                <div className="bottom p-lg d-flex justify-center align-center f-column">
                    <div className="m-bottom-sm full-width">
                        <PrimaryButton fullWidth={true} name="Save" disabled={true} />
                    </div>
                    <div className="m-bottom-sm full-width">
                        <OutlinedButton fullWidth={true} name="Cancel" />
                    </div>
                </div>
            </div>
        </Drawer>
    );
}