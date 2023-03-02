import { useEffect } from 'react';
import Loading from "../../components/common/loading";

const Logout = () => {
    useEffect(() => {
        if (process.env.REACT_APP_AUTH_LOGOUT_URL) {
            window.location.href = process.env.REACT_APP_AUTH_LOGOUT_URL
        }
    }, [])

    return (
        <Loading center/>
    )
}

export default Logout;