import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from "../../components/common/loading";
import { useAppDispatch } from '../../hooks/redux-hook';
import { logout } from '../../slices/auth';

const Logout = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(logout())
        .then(() => {
            navigate("/sign-in");
        })
    }, [dispatch, navigate])

    return (
        <Loading center/>
    )
}

export default Logout;