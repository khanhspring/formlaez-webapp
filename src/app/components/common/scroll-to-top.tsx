import { FC, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

type Props = {

}

const ScrollToTop: FC<Props> = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <>
            <Outlet />
        </>
    );
}

export default ScrollToTop;
