import { FC, HTMLAttributes } from "react";

const AlignCenterIcon: FC<HTMLAttributes<any>> = ({ className }) => {
    return (
        <svg
            className={`w-full h-auto ${className}`}
            xmlns="http://www.w3.org/2000/svg"
            id="Outline" viewBox="0 0 24 24"
            width="512" height="512"
        ><path d="M1,6H23a1,1,0,0,0,0-2H1A1,1,0,0,0,1,6Z" /><path d="M5,9a1,1,0,0,0,0,2H19a1,1,0,0,0,0-2Z" /><path d="M19,19H5a1,1,0,0,0,0,2H19a1,1,0,0,0,0-2Z" /><path d="M23,14H1a1,1,0,0,0,0,2H23a1,1,0,0,0,0-2Z" /></svg>
    );
}

export default AlignCenterIcon;
