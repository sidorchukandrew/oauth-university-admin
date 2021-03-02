import OutlinedInput from "./components/OutlinedInput";
import PrimaryButton from "./components/PrimaryButton";

export default function LoginPage(props) {
    return (
        <div className="d-flex">
            <div
                className="m-auto full-height d-flex f-column align-center justify-center"
                style={{ maxWidth: "350px", width: "350px" }}
            >
                <div className="bold-6 font-xl m-bottom-lg">
                    Login
                </div>
                <div className="d-flex full-width">
                    <OutlinedInput rounded={["top"]} placeholder="email" type="email" />
                </div>
                <div className="d-flex full-width m-bottom-lg">
                    <OutlinedInput rounded={["bottom"]} placeholder="password" type="password" />
                </div>

                <PrimaryButton name="Login" fullWidth />
            </div>
        </div>
    );
}