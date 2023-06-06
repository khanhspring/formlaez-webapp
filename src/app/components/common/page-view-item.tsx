import Menu, { MenuItem } from 'rc-menu';
import { FC, useState } from 'react';
import { PageView } from '../../models/page-view';
import { EllipsisHorizontalIcon, GlobeAmericasIcon, LinkIcon, NoSymbolIcon, PencilIcon, RectangleGroupIcon, RectangleStackIcon } from '@heroicons/react/24/solid';
import Tooltip from 'rc-tooltip';
import Dropdown from 'rc-dropdown';
import { HandRaisedIcon, TrashIcon } from '@heroicons/react/24/outline';
import usePublishPageView from '../../hooks/page-views/usePublishPageView';

type Props = {
    pageView?: PageView;
    onClick?: () => void;
    onEdit?: () => void;
    onPublish?: () => void;
    onUnPublish?: () => void;
    onDelete?: () => void;
}

const PageViewItem: FC<Props> = ({ pageView, onClick, onEdit, onDelete, onPublish, onUnPublish }) => {

    const [menuVisible, setMenuVisible] = useState(false);
    const { mutateAsync: publish } = usePublishPageView();

    if (!pageView) {
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

    const onPublishClick = (e: any) => {
        e.domEvent.stopPropagation();
        setMenuVisible(false);
        onPublish?.();
    }

    const onUnPublishClick = (e: any) => {
        e.domEvent.stopPropagation();
        setMenuVisible(false);
        onUnPublish?.();
    }

    const actionMenu = (
        <Menu className="text-sm">
            <MenuItem key="edit" onClick={onEditClick}>
                <div className="flex gap-3 items-center">
                    <PencilIcon className='w-5 h-5' />
                    <span>Edit</span>
                </div>
            </MenuItem>
            {
                (pageView.status === 'Draft' || pageView.status === 'Unpublished') &&
                <MenuItem key="publish" onClick={onPublishClick}>
                    <div className="flex gap-3 items-center">
                        <GlobeAmericasIcon className='w-5 h-5' />
                        <span>Publish</span>
                    </div>
                </MenuItem>
            }
            {
                pageView.status === 'Published' &&
                <MenuItem key="unPublish" onClick={onUnPublishClick}>
                    <div className="flex gap-3 items-center">
                        <NoSymbolIcon className='w-5 h-5' />
                        <span>UnPublish</span>
                    </div>
                </MenuItem>
            }
            <MenuItem key="remove" onClick={onDeleteClick}>
                <div className="flex gap-3 items-center text-rose-700">
                    <TrashIcon className='w-5 h-5' />
                    <span>Delete</span>
                </div>
            </MenuItem>
        </Menu>
    )

    return (
        <div
            onClick={onClick}
            className="flex items-center gap-2 p-2 rounded-md border border-slate-900/10 bg-zinc-50 dark:border-transparent dark:bg-steel-gray-900 relative"
        >
            <div className='w-20 h-20 rounded flex items-center justify-center bg-gradient-to-r from-cyan-500 to-blue-500 transition'>
                <RectangleStackIcon className='w-7 h-7' />
            </div>

            <div className='flex-1 flex flex-col gap-1 justify-center overflow-hidden'>
                <div className='flex items-center justify-between gap-1'>
                    <h3 className="overflow-hidden text-ellipsis whitespace-nowrap">
                        <Tooltip overlay={<div className='max-w-[200px]'>{pageView.title}</div>} showArrow={false} placement="bottomLeft">
                            <span className='font-semibold'>{pageView.title}</span>
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
                            className="w-6 h-5 flex justify-center items-center rounded cursor-pointer"
                        >
                            <EllipsisHorizontalIcon className='w-6 h-6' />
                        </span>
                    </Dropdown>
                </div>
                <p className='overflow-hidden text-ellipsis whitespace-nowrap text-xs'>
                    {pageView.description || 'No description'}
                </p>
                <div className='text-xs mt-1 flex items-center justify-between gap-2'>
                    {
                        pageView.status === 'Published' &&
                        <a
                            href={`${process.env.REACT_APP_DOMAIN}/pages/${pageView.code}`}
                            target='_blank' rel="noreferrer"
                            className='text-zinc-500 dark:text-zinc-200 flex items-center gap-1 group'
                        >
                            <LinkIcon className='w-3 h-3' />
                            <span className='whitespace-nowrap group-hover:underline'>/{pageView.code}</span>
                        </a>
                    }
                    {
                        pageView.status !== 'Published' &&
                        <span className='text-zinc-500 dark:text-zinc-200 flex items-center gap-1 cursor-not-allowed'>
                            <LinkIcon className='w-3 h-3' />
                            <span className='whitespace-nowrap'>/{pageView.code}</span>
                        </span>
                    }
                    <span className={
                        `inline-block px-2 py-1 rounded text-white`
                        + ` ${pageView.status === 'Published' ? 'bg-green-700' : ''}`
                        + ` ${pageView.status === 'Unpublished' ? 'bg-rose-600' : ''}`
                        + ` ${pageView.status === 'Draft' ? 'bg-yellow-500' : ''}`}>
                        {pageView.status}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default PageViewItem;
