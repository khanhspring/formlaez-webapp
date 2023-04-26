import { useEffect } from 'react';
import Loading from "../../components/common/loading";
import { useAppDispatch } from '../../hooks/redux-hook';
import { logout } from '../../slices/auth';
import { useNavigate } from 'react-router-dom';

const Error401 = () => {
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

export default Error401;