import Snackbar from "@material-ui/core/Snackbar";
import { useState } from "react";

export default function SuccessSnackbar(props) {
    const [showSuccess, setShowSuccess] = useState(props.showSuccess);

    return (
        <Snackbar
            open={showSuccess}
            autoHideDuration={2000}
            onClose={() => setShowSuccess(false)}
        >
            <div className="primary-bg grey-text-2 font-sm p-vertical-md p-horiz-lg rounded-sm">
                Action successful!
            </div>
        </Snackbar>
    );

}