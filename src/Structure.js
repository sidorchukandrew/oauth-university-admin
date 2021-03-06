import React from "react";
import Content from "./Content";
import SideNavigation from "./SideNavigation";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import LoginPage from "./LoginPage";
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

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

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#1f2937"
        }
    }
});

function Structure() {
    const classes = useStyles();

    return (
        <div className="main-font">
            <ThemeProvider theme={theme}>
                <Router>
                    <Switch>
                        <Route path="/login">
                            <LoginPage />
                        </Route>
                        <Route path="/">
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
                                <main className="d-flex full-width justify-center">
                                    <Content />
                                </main>
                            </div>
                        </Route>
                    </Switch>
                </Router>
            </ThemeProvider>
        </div>
    );
}


export default Structure;
