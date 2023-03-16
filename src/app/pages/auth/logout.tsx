import { useEffect } from 'react';
import Loading from "../../components/common/loading";
import TokenStorageService from '../../services/token-storage-service';

const Logout = () => {
    useEffect(() => {
        TokenStorageService.removeToken();
        if (process.env.REACT_APP_AUTH_LOGOUT_URL) {
            window.location.href = process.env.REACT_APP_AUTH_LOGOUT_URL
        }
    }, [])

    return (
        <Loading center/>
    )
}

export default Logout;