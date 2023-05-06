import Upload from 'rc-upload';
import { RcFile } from 'rc-upload/lib/interface';
import { FC, useState } from 'react';
import { FieldStatus } from "../form-types";

type Props = {
    status?: FieldStatus;
    value?: RcFile[];
    onChange?: (value: RcFile[]) => void;
    accept?: string;
    placeholder?: string;
    className?: string;
    multiple?: boolean;
}

const FileUpload: FC<Props> = ({ status, onChange = () => { }, value, accept, placeholder, className, multiple }) => {

    const [files, setFiles] = useState<RcFile[]>(value || []);
    const [isDragging, setDragging] = useState(false);

    const beforeUpload = (file: RcFile) => {
        let values;
        if (!multiple) {
            values = [ file];
        } else {
            values = [...files, file];
        }
        setFiles(values);
        onChange?.(values);
        return false;
    }

    const remove = (index: number) => {
        const fileList = [...files];
        fileList.splice(index, 1)
        setFiles(fileList);
    }

    return (
        <div className='w-full'>
            <div className={
                `w-full relative flex rounded border bg-slate-100 border-slate-900/10 dark:border-steel-gray-800 dark:bg-steel-gray-900 dark:hover:border-steel-gray-700 shadow-sm `
                + ` ${status && status === 'error' ? '!border-rose-700' : ''} `
                + ` ${status && status === 'warning' ? '!border-yellow-700' : ''} `
                + ` ${status && status === 'success' ? '!border-green-700' : ''} `
                + ` ${className} `
            }>
                <div
                    onDragEnter={() => setDragging(true)}
                    onDragLeave={() => setDragging(false)}
                    onDragEnd={() => setDragging(false)}
                    className={
                        `w-full flex rounded outline-2 outline-transparent outline-dashed relative`
                        + ` ${isDragging ? ' !outline-blue-600' : ''} `
                    }
                >
                    <Upload
                        accept={accept}
                        type="drag"
                        className={
                            `w-full min-h-[100px] rounded z-20`
                        }
                        beforeUpload={beforeUpload}
                        multiple={multiple}
                    >
                    </Upload>
                    <p className="text-base font-light absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0">{placeholder}</p>
                </div>
            </div>
            {
                files.length > 0 &&
                <div className='w-full flex flex-col gap-1 mt-1'>
                    {
                        files.map((item, index) =>
                            <div className='text-base bg-slate-800/50 px-1.5 py-1 rounded flex items-center justify-between group/file-item' key={index}>
                                <span>{item.name}</span>
                                <i
                                    onClick={() => remove(index)}
                                    className="fi fi-rr-cross-circle text-lg cursor-pointer hover:text-rose-700 invisible group-hover/file-item:visible"
                                ></i>
                            </div>
                        )
                    }
                </div>
            }
        </div>
    );
}

export default FileUpload;
