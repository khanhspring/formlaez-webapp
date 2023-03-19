import React, {FC, useEffect} from 'react';
import { useNavigate, useRouteLoaderData } from 'react-router-dom';
import { UserSession } from '../../models/user-session';

type Props = {
}

const HomePage: FC<Props> = () => {

    const userSession = useRouteLoaderData('private') as UserSession;
    const navigate = useNavigate();

    useEffect(() => {
        navigate(`/${userSession?.lastAccessedWorkspace?.workspace.code}/p`);
    }, [navigate, userSession?.lastAccessedWorkspace?.workspace.code])

    return (
        <></>
    )
}

export default HomePage;