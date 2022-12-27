import { FC, HTMLAttributes } from "react";

const DragIcon: FC<HTMLAttributes<any>> = ({ className }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            x="0" y="0" viewBox="0 0 24 24"
            fill="#000000" data-original="#000000"
            className={`w-full h-auto ${className}`}
        >
            <g><circle cx="8" cy="4" r="2"></circle><circle cx="8" cy="12" r="2"></circle><circle cx="8" cy="20" r="2"></circle><circle cx="16" cy="4" r="2"></circle><circle cx="16" cy="12" r="2"></circle><circle cx="16" cy="20" r="2"></circle></g>
        </svg>
    );
}

export default DragIcon;
