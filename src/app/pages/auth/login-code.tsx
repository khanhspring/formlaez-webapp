import { FC, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAppDispatch } from "../../hooks/redux-hook";
import { getToken } from "../../slices/auth";

type Props = {

}

const LoginCode: FC<Props> = () => {

    const [searchParams] = useSearchParams();
    const dispatch = useAppDispatch();
    let navigate = useNavigate();

    const loginCode = searchParams.get('code');
    let from = searchParams.get("state") || "/";

    useEffect(() => {
        if (loginCode) {
            dispatch(getToken(loginCode))
                .then(() => {
                    navigate(from);
                });
        }
    }, [dispatch, from, loginCode, navigate])


    return (
        <>
        </>
    );
}

export default LoginCode;