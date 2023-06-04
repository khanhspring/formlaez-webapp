import { EllipsisHorizontalIcon } from '@heroicons/react/24/solid';
import moment from 'moment';
import Dropdown from 'rc-dropdown';
import Menu, { MenuItem } from 'rc-menu';
import Tooltip from 'rc-tooltip';
import { FC, useState } from 'react';
import { FormattedNumber } from 'react-intl';
import { DocumentTemplate } from '../../models/document-template';

type Props = {
    documentTemplate?: DocumentTemplate;
    onClick?: () => void;
    onEdit?: () => void;
    onDelete?: () => void;
}

const DocumentTemplateItem: FC<Props> = ({ documentTemplate, onClick, onEdit, onDelete }) => {

    const [menuVisible, setMenuVisible] = useState(false);

    if (!documentTemplate) {
        return <></>
    }

    const onEditClick = (e: any) => {
        e.domEvent.stopPropagation();
        setMenuVisible(false);
        onEdit?.();
    }

    const onDeleteClick = (e: any) => {
        e.domEvent.stopPropagation();
        setMenuVisible(false);
        onDelete?.();
    }

    const actionMenu = (
        <Menu className="text-sm">
            <MenuItem key="edit" onClick={onEditClick}>
                <div className="flex gap-3 items-center">
                    <i className="fi fi-rr-pencil"></i>
                    <span>Edit</span>
                </div>
            </MenuItem>
            <MenuItem key="remove" onClick={onDeleteClick}>
                <div className="flex gap-3 items-center text-rose-700">
                    <i className="fi fi-rr-trash"></i>
                    <span>Delete</span>
                </div>
            </MenuItem>
        </Menu>
    )

    return (
        <div
            onClick={onClick}
            className="cursor-pointer flex items-center p-2 rounded-md border border-slate-900/10 bg-zinc-50 dark:border-transparent dark:bg-steel-gray-900 dark:hover:bg-steel-gray-800 relative group"
        >
            <div className="flex items-center justify-center w-10 h-10 group-hover:ring-2 bg-gradient-to-r from-cyan-500 to-blue-500 transition rounded-full">
                <span className='text-xs text-white rounded-full'>{documentTemplate.extension}</span>
            </div>
            <div className="flex-1 flex gap-1 flex-col pl-2 overflow-hidden ml-0.5">
                <div className='flex items-center justify-between gap-1'>
                    <h3 className="text-sm overflow-hidden text-ellipsis whitespace-nowrap">
                        <Tooltip overlay={<div className='max-w-[200px]'>{documentTemplate.title}</div>} showArrow={false} placement="bottomLeft">
                            <span>{documentTemplate.title}</span>
                        </Tooltip>
                    </h3>
                    <Dropdown
                        overlay={actionMenu}
                        placement="bottomRight"
                        trigger={['click']}
                        visible={menuVisible}
                        onVisibleChange={setMenuVisible}
                    >
                        <span onClick={e => { e.stopPropagation(); }}
                            className="w-6 h-5 flex justify-center items-center rounded"
                        >
                            <EllipsisHorizontalIcon className='w-6 h-6'/>
                        </span>
                    </Dropdown>
                </div>
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
                            <FormattedNumber value={Math.round((documentTemplate.size || 0) / 1024)} /> KB
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DocumentTemplateItem;
