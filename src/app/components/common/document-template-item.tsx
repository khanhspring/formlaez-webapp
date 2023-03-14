import moment from 'moment';
import Tooltip from 'rc-tooltip';
import { FC } from 'react';
import { DocumentTemplate } from '../../models/document-template';

type Props = {
    documentTemplate?: DocumentTemplate;
    onClick?: () => void;
}

const DocumentTemplateItem: FC<Props> = ({ documentTemplate, onClick }) => {

    if (!documentTemplate) {
        return <></>
    }

    return (
        <div
            onClick={onClick}
            className="cursor-pointer flex items-center p-2 rounded-md border border-slate-900/10 bg-slate-50 dark:border-transparent dark:bg-cinder-700 relative group"
        >
            <div className="flex items-center justify-center w-10 h-10 rounded group-hover:ring-2 bg-gradient-to-r from-cyan-500 to-blue-500 transition">
                <span className='text-xs'>{documentTemplate.extension}</span>
            </div>
            <div className="flex-1 flex gap-1 flex-col px-2 overflow-hidden ml-0.5">
                <h3 className="text-sm overflow-hidden text-ellipsis whitespace-nowrap">
                    <Tooltip overlay={<div className='max-w-[200px]'>{documentTemplate.title}</div>} showArrow={false} placement="bottomLeft">
                        <span>{documentTemplate.title}</span>
                    </Tooltip>
                </h3>
                <div className="flex items-center gap-2 text-gray-500">
                    <div className="flex items-center gap-1">
                        <i className="fi fi-rr-clock text-xs"></i>
                        <span className="text-xs">
                            {moment(documentTemplate.createdDate).format("DD MMM YYYY HH:mm")}
                        </span>
                    </div>
                    <div className="flex items-center gap-1">
                        <i className="fi fi-rr-document text-xs"></i>
                        <span className="text-xs">
                            {(documentTemplate.size / 100).toFixed(2)} KB
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DocumentTemplateItem;
