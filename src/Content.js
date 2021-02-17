import { Route, Switch } from "react-router-dom";
import SeriesPage from "./SeriesPage";
import SeriesDetailPage from "./SeriesDetailPage";
import EditSeriesDetail from "./EditSeriesDetail";
import GuidesPage from "./GuidesPage";

/* <p
                className="bold-5 black-text font-md full-width no-border m-bottom-md"
                contentEditable
                suppressContentEditableWarning={true}
            >
                Title here
            </p>
            <p
                contentEditable
                className="grey-text-6 no-border full-width double-height m-vertical-md"
                onInput={this.handleInput}
                suppressContentEditableWarning={true}
            > Content goes in here</p> */

function Content() {

    return (
        <div className="constrained-lg p-xl">
            <Switch>
                <Route path="/guides">
                    <GuidesPage />
                </Route>

                <Route path="/series/:id/edit">
                    <EditSeriesDetail />
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