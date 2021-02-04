import { Route, Switch } from "react-router-dom";
import Series from "./Series";
import Guides from "./Guides";

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
                    <Guides />
                </Route>

                <Route path="/series">
                    <Series />
                </Route>
            </Switch>
        </div>
    );
}

export default Content;