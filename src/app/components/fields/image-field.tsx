import { FC, useState } from "react";

type Props = {
}

const ImageField: FC<Props> = () => {

    const [url, setUrl] = useState<string>();


    if (!url) {
        return (
            <div className="p-3 dark:bg-cinder-600 rounded cursor-pointer flex gap-2 items-center text-gray-400">
                <i className="fi fi-rr-picture"></i>
                <span className="font-light">Add an image</span>
            </div>
        );
    }

    return (
        <>
            123123
        </>
    );
}

export default ImageField;