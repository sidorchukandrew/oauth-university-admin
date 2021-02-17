import { NavLink } from "react-router-dom";
import BookIcon from "@material-ui/icons/BookRounded";
import SeriesIcon from "@material-ui/icons/GroupWorkRounded";
import ShowChartIcon from "@material-ui/icons/ShowChartRounded";

function SideNavigation() {
    return (
        <div className="d-flex f-column">
            <NavLink
                activeClassName="active-link"
                to="/analytics"
                className="grey-text-2 p-vertical-md p-horiz-md font-sm hov-lighten d-flex align-center"
                exact
            >
                <ShowChartIcon></ShowChartIcon>
                <span className="m-horiz-md">
                    Analytics
                </span>
            </NavLink>
            <NavLink
                activeClassName="active-link"
                to="/guides"
                className="grey-text-2 p-vertical-md p-horiz-md font-sm hov-lighten d-flex align-center"
                exact
            >
                <BookIcon></BookIcon>
                <span className="m-horiz-md">
                    Guides
                </span>
            </NavLink>

            <NavLink
                activeClassName="active-link"
                to="/series"
                className="grey-text-2 p-vertical-md p-horiz-md font-sm hov-lighten d-flex align-center"
            >
                <SeriesIcon></SeriesIcon>
                <span className="m-horiz-md">
                    Series
                </span>
            </NavLink>
        </div>
    );
}

export default SideNavigation;