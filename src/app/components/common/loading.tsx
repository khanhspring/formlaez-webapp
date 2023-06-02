import NProgress from "nprogress";
import { FC, useEffect } from 'react';

type Props = {
    center?: boolean;
    hideProgress?: boolean;
}

const Loading: FC<Props> = ({ hideProgress }) => {

    useEffect(() => {
        if (!hideProgress) {
            NProgress.inc();
        }
        return () => {
            if (!hideProgress) {
                NProgress.done();
            }
        }
    }, [hideProgress]);

    return (
        <></>
    );
}

export default Loading;
