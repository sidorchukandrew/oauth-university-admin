import { NavLink } from "react-router-dom";
import BookIcon from "@material-ui/icons/BookRounded";
import SeriesIcon from "@material-ui/icons/GroupWorkRounded";
import ShowChartIcon from "@material-ui/icons/ShowChartRounded";
import { selectUser } from "./store/user/userSlice";
import { hasPermission, PERMISSIONS } from "./utils/PermissionsUtils";
import { useSelector } from "react-redux";
import ShieldIcon from "@material-ui/icons/Security";

function SideNavigation() {

    let currentUser = useSelector(selectUser);
    let pages = [
        { to: "/guides", icon: <BookIcon />, name: "Guides" },
        { to: "/series", icon: <SeriesIcon />, name: "Series" }
    ];

    if (hasPermission(currentUser, PERMISSIONS.ANALYTICS_LIST)) {
        pages.push({ to: "/analytics", icon: <ShowChartIcon />, name: "Analytics" })
    }

    if (hasPermission(currentUser, PERMISSIONS.ROLES_LIST)) {
        pages.push({ to: "/permissions", icon: <ShieldIcon />, name: "Permissions" });
    }

    return (
        <div className="d-flex f-column">
            {
                pages.map(page => (
                    <NavLink
                        activeClassName="active-link"
                        to={page.to}
                        className="grey-text-2 p-vertical-md p-horiz-md font-sm hov-lighten d-flex align-center"
                        key={page.to}
                    >
                        {page.icon}
                        <span className="m-horiz-md">
                            {page.name}
                        </span>
                    </NavLink>

                ))
            }
        </div>
    );
}

export default SideNavigation;