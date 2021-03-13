import { Dialog } from "@material-ui/core";
import Detail from "./Detail";
import { useState } from "react";
import OutlinedButton from "./OutlinedButton";
import PrimaryButton from "./PrimaryButton";
import OutlinedInput from "./OutlinedInput";
import DeleteIcon from "@material-ui/icons/Close";
import ScopeDelimiterOption from "./ScopeDelimiterOption";

export default function OAuthConfigDialog(props) {

    const [baseUrl, setBaseUrl] = useState(props.config?.base_url);
    const [scopes, setScopes] = useState(props.config?.scopes ? props.config.scopes : []);
    const [scopeDelimiter, setScopeDelimiter] = useState(props.config?.scope_delimiter);
    const [scopeParamName, setScopeParamName] = useState(props.config?.scope_param_name);
    const [redirectUriParamName, setRedirectUriParamName] = useState(props.config?.redirect_uri_param_name);
    const [clientIdParamName, setClientIdParamName] = useState(props.config?.client_id_param_name);
    const SPACE = " ";
    const COMMA = ",";

    let handleChangeBaseUrl = (updatedBaseUrl) => {
        setBaseUrl(updatedBaseUrl);
    }

    let handleAddScope = (scopeToAdd) => {
        let currentScopes = JSON.parse(JSON.stringify(scopes));
        currentScopes.push(scopeToAdd);
        setScopes(currentScopes);
    }

    let handleRemoveScope = (scopeToRemove) => {
        let updatedScopes = scopes.filter(scope => scope !== scopeToRemove);
        setScopes(updatedScopes);
    }

    let handleConfirm = () => {
        let config = {
            base_url: baseUrl,
            scopes: scopes,
            scope_delimiter: scopeDelimiter,
            scope_param_name: scopeParamName,
            client_id_param_name: clientIdParamName,
            redirect_uri_param_name: redirectUriParamName
        };

        props.onChange(config);
        props.onClose();
    }

    return (
        <Dialog
            open={props.open}
            onClose={props.onClose}
            maxWidth="lg"
        >
            <div className="main-font p-lg" style={{ width: "600px" }}>
                <div className="font-regular bold-5 m-bottom-md">
                    Button Configuration
                </div>

                <div className="m-bottom-lg">
                    <Detail
                        label="Base Url"
                        value={baseUrl}
                        editable={true}
                        onCommitEdits={handleChangeBaseUrl}
                    />
                </div>

                <div className="d-flex m-bottom-lg">

                    <div className="half-width">
                        <Detail
                            label="Client Id Param"
                            value={clientIdParamName}
                            editable={true}
                            onCommitEdits={(paramName) => setClientIdParamName(paramName)}
                        />
                    </div>

                    <div className="half-width">
                        <Detail
                            label="Redirect Uri Param"
                            value={redirectUriParamName}
                            editable={true}
                            onCommitEdits={(paramName) => setRedirectUriParamName(paramName)}
                        />
                    </div>
                </div>

                <div className="d-flex m-bottom-lg">
                    <div className="half-width">
                        <Detail
                            label="Scope Param"
                            value={scopeParamName}
                            editable={true}
                            onCommitEdits={(paramName) => setScopeParamName(paramName)}
                        />
                    </div>

                    <div className="half-width">
                        <div className="d-flex f-column m-bottom-lg">
                            <div className="font-xs bold-5 grey-text-6 m-bottom-md">
                                Scope Delimiter
                    </div>
                            <div className="d-flex">
                                <ScopeDelimiterOption
                                    delimiter="comma"
                                    onClick={() => setScopeDelimiter(COMMA)}
                                    selected={scopeDelimiter === COMMA}
                                />
                                <div className="m-horiz-md">
                                    <ScopeDelimiterOption
                                        delimiter="space"
                                        onClick={() => setScopeDelimiter(SPACE)}
                                        selected={scopeDelimiter === SPACE}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="d-flex f-column m-bottom-lg">
                    <div className="font-xs bold-5 grey-text-6 m-bottom-sm">
                        Scopes ({scopes?.length})
                    </div>
                    <div className="m-bottom-sm d-flex">
                        <OutlinedInput
                            onEnter={handleAddScope}
                            placeholder="Enter a scope"
                        />
                    </div>
                    {
                        scopes?.map(scope => {
                            return (
                                <div className="border-btm-grey bold-4 font-sm p-md d-flex align-center" key={scope}>
                                    {scope}
                                    <span
                                        className="m-left-md d-flex align-center grey-text-6 hov-secondary-color"
                                        onClick={() => handleRemoveScope(scope)}
                                    >
                                        <DeleteIcon style={{ fontSize: "18px" }} />
                                    </span>
                                </div>
                            );
                        })
                    }
                </div>

                <div className="d-flex justify-end align-center main-font">
                    <span className="m-horiz-md">
                        <OutlinedButton name="Cancel" onClick={props.onClose} />
                    </span>
                    <span>
                        <PrimaryButton
                            name="Done"
                            onClick={handleConfirm}
                            disabled={scopes?.length === 0 || !baseUrl} />
                    </span>
                </div>
            </div>
        </Dialog>
    );
}