import { FC, ReactNode } from 'react';
import FieldUtil from '../../features/form-builder/utils/field-util';
import { FormField } from '../../models/form';
import BreakLine from './content-blocks/break-line';
import HtmlBlock from './content-blocks/html-block';
import ImageBlock from './content-blocks/image-block';
import PdfBlock from './content-blocks/pdf-block';
import VideoBlock from './content-blocks/video-block';

type Props = {
    field: FormField;
    data: any;
    showContentBlocks: boolean;
}

const Field: FC<Props> = ({ field, data, showContentBlocks }) => {

    const toString = (): ReactNode => {
        if (!data) {
            return;
        }
        const rawValue = data[field.code];

        if (!rawValue) {
            return;
        }

        if (field.type === 'MultipleChoice' || field.type === 'Dropdown') {
            const selectedValues = (rawValue || []) as any[];
            const selected = (field.options || []).filter(option => selectedValues?.includes(option.code));
            return selected?.map((item, index) =>
                <span key={index} className="mr-1 my-0.5 px-2 inline-block bg-slate-200 dark:bg-cinder-600 rounded-xl">
                    {item.label}
                </span>
            )
        }
        if (field.type === 'Switch') {
            return (
                <>
                    {rawValue && <i className="fi fi-sr-checkbox text-xs"></i>}
                </>
            )
        }
        if (field.type === 'Rating') {
            return (
                <>
                    {rawValue && <>{rawValue} / 5</>}
                </>
            )
        }
        if (field.type === 'OpinionScale') {
            return (
                <>
                    {(rawValue || rawValue === 0) && <>{rawValue} / 10</>}
                </>
            )
        }
        return rawValue;
    }

    const isFormControl = FieldUtil.isFormControl(field);

    if (isFormControl) {
        return (
            <div className='flex flex-col gap-1'>
                <label className='text-xs text-slate-900/70 dark:text-gray-300'>
                    {field.title}
                </label>
                <div className='text-sm'>
                    {toString() || <span className='text-sm font-light text-slate-900 dark:text-gray-500'>No data</span>}
                </div>
            </div>
        );
    }

    if (showContentBlocks) {
        switch (field.type) {
            case "Line":
                return <BreakLine />
            case "Video":
                return <VideoBlock url={field.url} />
            case "Image":
                return <ImageBlock url={field.url} />
            case "Pdf":
                return <PdfBlock url={field.url} />
            case "Text":
                return <HtmlBlock content={field.content || ''} />
        }
    }

    return (
        <></>
    )

}

export default Field;
