import NProgress from "nprogress";
import { FC, useEffect } from 'react';
import loading from "../../../assets/images/loading.svg";

type Props = {
    className?: string;
    center?: boolean;
    hideProgress?: boolean;
}

const Loading: FC<Props> = ({ center, className, hideProgress }) => {

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

    if (center) {
        return (
            <img src={loading} alt='' className={`w-20 fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] animate-fade-in ${className}`} />
        );
    }

    return (
        <img src={loading} alt='' className={`w-20 animate-fade-in ${className}`} />
    );
}

export default Loading;
