import { useState } from "react";
import { Button } from "../../components/button/button";
import { Flex } from "../../components/flex/flex";
import { Input } from "../../components/input/input";
import { useApp } from "../../store/store";
import "./login.scss";
import type { AuthCredentials } from "../../store/auth-slice";
import { useNavigate } from "react-router";

const LoginPage = () => {
    const navigate = useNavigate();
    const signIn = useApp((s) => s.signIn);
    const [formState, setFormState] = useState<AuthCredentials>({
        apiTokenInstance: "",
        idInstance: "",
    });

    const handleSignIn = () => {
        signIn(formState);
        navigate("/");
    };

    const handleStateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormState((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <Flex className="login" align="center" justify="center">
            <Flex className="login__container" direction="column" gap={8}>
                <h1>Login</h1>
                <Input
                    className="w-full"
                    name="idInstance"
                    label="Id instance"
                    onChange={handleStateChange}
                />
                <Input
                    className="w-full"
                    name="apiTokenInstance"
                    label="API token instance"
                    onChange={handleStateChange}
                />
                <Button
                    className="w-full"
                    variant="default"
                    onClick={handleSignIn}
                    disabled={
                        !formState.apiTokenInstance.length ||
                        !formState.idInstance.length
                    }
                >
                    Sign in
                </Button>
            </Flex>
        </Flex>
    );
};

export default LoginPage;
