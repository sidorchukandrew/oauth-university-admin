import { Route, Switch, useHistory } from "react-router-dom";
import SeriesPage from "./SeriesPage";
import SeriesDetailPage from "./SeriesDetailPage";
import GuidesPage from "./GuidesPage";
import GuideDetailPage from "./GuideDetailPage";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, setUser } from "./store/user/userSlice";
import { useEffect } from "react";
import usersApi from "./api/users";
import PermissionsPage from "./PermissionsPage";

function Content() {
    let user = useSelector(selectUser);
    let dispatch = useDispatch();
    let routeHistory = useHistory();

    if (!localStorage.getItem("ACCESS_TOKEN")) {
        routeHistory.push("/login");
    }

    useEffect(() => {
        async function fetchData() {
            let result = await usersApi.getCurrentUser();
            dispatch(setUser(result.data));
        }

        if (!user) {
            fetchData();
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className="constrained-lg p-xl">
            <Switch>
                <Route path="/guides/:id">
                    <GuideDetailPage />
                </Route>
                <Route path="/guides">
                    <GuidesPage />
                </Route>
                <Route path="/series/:id">
                    <SeriesDetailPage />
                </Route>
                <Route path="/series">
                    <SeriesPage />
                </Route>
                <Route path="/permissions">
                    <PermissionsPage />
                </Route>
            </Switch>
        </div>
    );
}

export default Content;