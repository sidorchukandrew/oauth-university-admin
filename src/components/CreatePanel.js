import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import PrimaryButton from "./PrimaryButton";
import OutlinedButton from "./OutlinedButton";
import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 450;

const useStyles = makeStyles(() => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },

}));

export default function CreatePanel(props) {

    const classes = useStyles();

    return (
        <Drawer
            anchor="right"
            variant="temporary"
            open={props.open}
            onClose={props.closeCreatePanel}
            className={classes.drawer}
            classes={
                { paper: classes.drawerPaper }
            }
        >
            <div className="main-font">
                <div className="p-lg d-flex justify-space-between align-center">
                    <span className="bold-5">
                        {props.title}
                    </span>

                    <IconButton onClick={props.closeCreatePanel}>
                        <CloseIcon></CloseIcon>
                    </IconButton>
                </div>

                <div>
                    {props.children}
                </div>

                <div className="p-lg d-flex justify-end border-top-grey bottom white-bg">
                    <span className="m-right-lg">
                        <OutlinedButton name="Cancel" onClick={props.closeCreatePanel} />
                    </span>
                    <PrimaryButton name="Create"></PrimaryButton>
                </div>
            </div>
        </Drawer>
    );
}