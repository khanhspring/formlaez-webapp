import { FC, ReactNode } from 'react';
import { FormattedNumber } from 'react-intl';
import FieldUtil from '../../features/form-builder/utils/field-util';
import { FormField } from '../../models/form';
import BreakLine from './content-blocks/break-line';
import HtmlBlock from './content-blocks/html-block';
import ImageBlock from './content-blocks/image-block';
import PdfBlock from './content-blocks/pdf-block';
import QRCodeBlock from './content-blocks/qr-code-block';
import TwitterTweetBlock from './content-blocks/twitter-tweet-block';
import VideoBlock from './content-blocks/video-block';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import remarkGfm from 'remark-gfm';

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
                <span key={index} className="mr-1 my-0.5 px-2 inline-block bg-slate-200 dark:bg-slate-600 rounded-xl">
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
        if (field.type === 'InputNumber') {
            return (
                <>
                    {rawValue && <FormattedNumber value={rawValue} />}
                </>
            )
        }
        if (field.type === 'Signature') {
            return (
                <div className='bg-white max-w-[350px] w-full rounded'>
                    {rawValue && <img src={rawValue} alt={field.title} />}
                </div>
            )
        }
        if (field.type === 'StatusList') {
            const selectedValues = (rawValue || []) as any[];
            const selected = (field.options || []).filter(option => selectedValues?.includes(option.code));
            return selected?.map((item, index) =>
                <span
                    key={index}
                    className="mr-1 my-0.5 px-2 inline-block text-white rounded-xl"
                    style={{ backgroundColor: item.bgColor || '#697689' }}
                >
                    {item.label}
                </span>
            )
        }
        if (field.type === 'InputMarkdown') {
            return (
                <div className="prose dark:prose-invert text-slate-950 dark:text-white py-2 max-w-full">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {rawValue || ''}
                    </ReactMarkdown>
                </div>
            )
        }
        if (field.type === 'InputUrl') {
            return (
                <>
                    {rawValue && <a href={rawValue} target='_blank' rel="noreferrer" className='text-blue-500'>{rawValue}</a>}
                </>
            )
        }

        return rawValue;
    }

    const isFormControl = FieldUtil.isFormControl(field);

    if (isFormControl) {
        return (
            <div className='flex flex-col gap-1'>
                <label className='text-sm text-slate-900/70 dark:text-gray-300'>
                    {field.title}
                </label>
                <div className='text-base'>
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
            case "QRCode":
                return <QRCodeBlock content={field.content} />
            case "TwitterTweet":
                return <TwitterTweetBlock url={field.url} />
        }
    }

    return (
        <></>
    )

}

export default Field;
