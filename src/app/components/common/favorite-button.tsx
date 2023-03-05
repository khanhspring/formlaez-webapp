import { FC } from "react";

type Props = {
    favorite?: boolean;
    className?: string;
}

const FavoriteButton: FC<Props> = ({ favorite, className }) => {
    return (
        <span className={`w-7 h-7 flex items-center justify-center rounded-full bg-slate-100 dark:bg-gray-700 px-1 ${className}`}>
            <i className={`fi fi-sr-heart text-xs leading-5 ${favorite ? 'text-rose-600' : ''}`}></i>
        </span>
    );
}

export default FavoriteButton;
