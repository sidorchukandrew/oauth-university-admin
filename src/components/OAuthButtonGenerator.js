import OutlinedInput from "./OutlinedInput";
import Checkbox from "@material-ui/core/Checkbox";
import SettingsIcon from "@material-ui/icons/Settings";
import { useState } from "react";
import OAuthConfigDialog from "./OAuthConfigDialog";
import DeleteIcon from "@material-ui/icons/Clear";

export default function OAuthButtonGenerator(props) {
    const [showConfigDialog, setShowConfigDialog] = useState(false);

    let handleConfigUpdated = (updatedConfig) => {
        updatedConfig.id = props.config?.id;
        props.onChange(updatedConfig);
    };

    return (
        <div className="d-flex justify-space-between align-center">
            <div className="flex-grow p-vertical-sm">
                <div className="p-vertical-md d-flex f-column">
                    <label className="font-xs bold-5 m-bottom-md grey-text-6">
                        REDIRECT URI
                </label>
                    <OutlinedInput />
                </div>
                <div className="p-vertical-md d-flex f-column">
                    <label className="font-xs bold-5 m-bottom-md grey-text-6">
                        CLIENT ID
                </label>
                    <OutlinedInput />
                </div>

                <div className="p-vertical-md d-flex f-column">
                    <label className="font-xs bold-5 m-bottom-md grey-text-6">
                        SCOPES
                </label>
                    <div className="rounded-sm p-md grey-bg-5 grey-border">
                        {
                            props.config?.scopes?.map(scope => {
                                return (
                                    <div className="d-flex align-center" key={scope}>
                                        <Checkbox size="small" color="primary" />
                                        <span className="font-sm">
                                            {scope}
                                        </span>
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>

                <div className="m-vertical-lg no-wrap horiz-scroll rounded-sm grey-bg-5 p-lg primary-color-text font-sm">
                    <span className="bold-6">
                        {props.config?.base_url}
                    </span>
                    ?
                    <span>
                        client_id=
                    </span>
                    &
                    <span>
                        redirect_uri=
                    </span>
                </div>
            </div>
            <div className="d-flex f-column">
                <span
                    className="m-left-lg grey-text-6 hov-secondary-color m-bottom-md"
                    onClick={() => setShowConfigDialog(true)}
                >
                    <SettingsIcon style={{ fontSize: "18px" }} />
                </span>
                <span className="m-left-lg grey-text-6 hov-error-color">
                    <DeleteIcon style={{ fontSize: "22px" }} onClick={() => props.onDelete(props.section)} />
                </span>
            </div>
            <OAuthConfigDialog
                open={showConfigDialog}
                onClose={() => setShowConfigDialog(false)}
                onChange={handleConfigUpdated}
                config={props.config}
            />
        </div>
    );
}