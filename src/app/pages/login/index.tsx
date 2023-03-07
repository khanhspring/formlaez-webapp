import { useEffect } from 'react';

function Login() {

    useEffect(() => {
        window.location.href = process.env.REACT_APP_AUTH_LOGOUT_URL || '/errors/401';
    }, [])

    return (
        <>
            Logging in...
        </>
    );
}

export default Login;
