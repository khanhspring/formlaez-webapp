import React from 'react';
import {Navigate, useLocation} from "react-router-dom";
import { useAppSelector } from '../../hooks/redux-hook';
import {selectIsAuthenticated} from "../../slices/auth";

export function RequireAuth({ children }: { children: JSX.Element }) {
    let location = useLocation();
    const isAuthenticated = useAppSelector(selectIsAuthenticated);

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
}
