import React from "react";
import Content from "./Content";
import SideNavigation from "./SideNavigation";
import { BrowserRouter as Router } from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';


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
        backgroundColor: "#1f2937"
    },

}));

function Structure() {
    const classes = useStyles();

    return (
        <div className="main-font">
            <Router>
                <div className={classes.root}>

                    <Drawer
                        className={classes.drawer}
                        variant="permanent"
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        anchor="left"
                    >
                        <SideNavigation />
                    </Drawer>
                    <main className={"d-flex full-width justify-center"}>
                        <Content />
                    </main>
                </div>
            </Router>
        </div>
    );
}


export default Structure;
