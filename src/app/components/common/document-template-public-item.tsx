import { DocumentIcon } from '@heroicons/react/24/solid';
import Dropdown from 'rc-dropdown';
import Menu, { MenuItem } from 'rc-menu';
import Tooltip from 'rc-tooltip';
import { FC } from 'react';
import { DocumentTemplate } from '../../models/document-template';
import { click } from '@testing-library/user-event/dist/click';

type Props = {
    documentTemplate?: DocumentTemplate;
    onClick: (fileType: 'Pdf' | 'Docx') => void;
}

const DocumentTemplatePublicItem: FC<Props> = ({ documentTemplate, onClick }) => {

    if (!documentTemplate) {
        return <></>
    }

    const fileTypeMenu = (
        <Menu>
            <MenuItem key="setUpOpenAIApiKey" onClick={() => onClick('Docx')}>
                <div className="flex gap-3 items-center">
                    <DocumentIcon className='w-5 h-5' />
                    <span>Docx</span>
                </div>
            </MenuItem>
            <MenuItem key="changePassword" onClick={() => onClick('Pdf')}>
                <div className="flex gap-3 items-center">
                    <DocumentIcon className='w-5 h-5' />
                    <span>Pdf</span>
                </div>
            </MenuItem>
        </Menu>
    );

    return (
        <>
            <Dropdown overlay={fileTypeMenu} trigger={['click']}>
                <div className="cursor-pointer flex items-center p-2 rounded-md border border-slate-900/10 bg-zinc-50 dark:border-transparent dark:bg-steel-gray-900 relative group">
                    <div className="flex items-center justify-center w-10 h-10 rounded group-hover:ring-2 bg-gradient-to-r from-cyan-500 to-blue-500 transition">
                        <span className='text-xs'>
                            <DocumentIcon className='w-5 h-5' />
                        </span>
                    </div>
                    <div className="flex-1 flex gap-1 flex-col px-2 overflow-hidden ml-0.5">
                        <h3 className="text-sm overflow-hidden text-ellipsis whitespace-nowrap">
                            <Tooltip overlay={<div className='max-w-[200px]'>{documentTemplate.title}</div>} showArrow={false} placement="bottomLeft">
                                <span>{documentTemplate.title}</span>
                            </Tooltip>
                        </h3>
                        <div className="flex items-center gap-2 text-gray-500">
                            <div className="flex items-center gap-1">
                                <i className="fi fi-rr-cloud-download-alt text-xs"></i>
                                <span className="text-xs">
                                    Click to download
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </Dropdown>
        </>
    );
}

export default DocumentTemplatePublicItem;
