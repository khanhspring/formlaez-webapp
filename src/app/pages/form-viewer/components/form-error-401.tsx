import { FC, useEffect } from "react";
import Button from "../../../components/common/button";
import TokenStorageService from "../../../services/token-storage-service";
import FormSkeleton from "./form-skeleton";

type Props = {

}

const FormError401: FC<Props> = ({ }) => {

    const login = () => {
        const currentUrl = window.location.pathname;
        const currentUrlEncoded = encodeURIComponent(currentUrl);
        window.location.href = process.env.REACT_APP_AUTH_LOGIN_URL + `?state=${currentUrlEncoded}`;
    }

    const existsToken = TokenStorageService.existsToken();

    useEffect(() => {
        // has an account but token is expired
        if (existsToken) {
            login();
        }
    }, [existsToken])

    if (existsToken) {
        return <></>
    }

    return (
        <div className='flex justify-center w-full'>
            <FormSkeleton />
            <div className="flex justify-center items-center fixed top-0 left-0 bottom-0 right-0 w-full h-screen">
                <div className="w-full max-w-[420px] h-[300px] bg-slate-100 dark:bg-steel-gray-950 rounded-lg shadow flex flex-col items-center justify-center gap-5 p-5">
                    <i className="fi fi-rr-fingerprint text-3xl"></i>
                    <h2 className="text-lg">
                        This is a private form, you need to sign in first.
                    </h2>
                    <Button onClick={login}>
                        Sign in now
                        <i className="fi fi-rr-arrow-right"></i>
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default FormError401;
