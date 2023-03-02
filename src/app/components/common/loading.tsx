import { FC, useEffect } from 'react';
import { useNavigation } from 'react-router-dom';
import loading from "../../../assets/images/loading.svg";
import NProgress from "nprogress";

type Props = {
    className?: string;
    center?: boolean;
    hideProgress?: boolean;
}

const Loading: FC<Props> = ({ center, className, hideProgress }) => {

    const navigation = useNavigation();

    useEffect(() => {
        if (hideProgress) {
            return;
        }
        if (navigation?.state === 'loading') {
            NProgress.inc();
        }
        if (navigation?.state === 'idle') {
            NProgress.done();
        }
        return () => {
            if (!hideProgress) {
                NProgress.done();
            }
        }
    }, [hideProgress, navigation]);

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
