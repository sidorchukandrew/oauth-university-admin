import { Route, Switch } from "react-router-dom";
import SeriesPage from "./SeriesPage";
import SeriesDetailPage from "./SeriesDetailPage";
import GuidesPage from "./GuidesPage";
import GuideDetailPage from "./GuideDetailPage";

function Content() {

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
            </Switch>
        </div>
    );
}

export default Content;