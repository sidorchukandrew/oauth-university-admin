import OutlinedInput from "./components/OutlinedInput";
import PrimaryButton from "./components/PrimaryButton";
import authApi from "./api/auth";
import { useState } from "react";
import ErrorAlert from "./components/ErrorAlert";
import { useHistory } from "react-router-dom";

export default function LoginPage(props) {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginErrors, setLoginErrors] = useState([]);

    let router = useHistory();

    let attemptLogin = async () => {
        setLoading(true);
        try {
            let result = await authApi.login(email, password);
            localStorage.setItem("ACCESS_TOKEN", result.data?.token);
            setLoginErrors([]);
            router.push("/");
        } catch (error) {
            let updatedErrors = loginErrors.splice();
            updatedErrors.push(error.response.data.error);
            setLoginErrors(updatedErrors);
        } finally {
            setLoading(false);
        }
    }

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
                    <OutlinedInput
                        rounded={["top"]}
                        placeholder="email"
                        type="email"
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </div>
                <div className="d-flex full-width m-bottom-lg">
                    <OutlinedInput
                        rounded={["bottom"]}
                        placeholder="password"
                        type="password"
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </div>

                <div className="m-bottom-lg full-width">
                    <PrimaryButton
                        name="Login"
                        fullWidth
                        loading={loading}
                        onClick={attemptLogin}
                    />
                </div>

                {loginErrors?.length > 0 ? <div className="full-width"><ErrorAlert errors={loginErrors} /></div> : ""}
            </div>
        </div>
    );
}