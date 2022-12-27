import { FC, useState } from "react";

type Props = {
}

const InputNumberField: FC<Props> = () => {

    const [label, setLabel] = useState('Input number');
    const [placeholder, setPlaceholder] = useState('Input number');

    return (
        <div className="flex flex-col gap-1 mb-2">
            <input
                value={label}
                className="w-full text-gray-100 bg-transparent outline-none"
                onChange={e => setLabel(e.target.value)}
                placeholder="Input text"
            />
            <div className="rounded border dark:bg-cinder-700 dark:border-gray-700">
                <input
                    value={placeholder}
                    className="px-2 py-1 w-full text-gray-500 bg-transparent outline-none"
                    onChange={e => setPlaceholder(e.target.value)}
                />
            </div>
        </div>
    );
}

export default InputNumberField;