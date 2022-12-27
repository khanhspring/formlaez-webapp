import { FC } from 'react';
import { Link } from 'react-router-dom';

type Props = {

}

const Breadcrumb: FC<Props> = () => {
    return (
        <div className="flex flex-col h-full justify-center px-7">
            <h2 className="text-lg font-semibold dark:text-gray-200">Private</h2>
            <div className="flex gap-1 text-xs dark:text-gray-500">
                <Link to="/">
                    <span>Home</span>
                </Link>
                <span>/</span>
                <span>Private</span>
            </div>
        </div>
    );
}

export default Breadcrumb;
