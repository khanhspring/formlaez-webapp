import { ArrowRightIcon } from '@heroicons/react/24/solid';
import { FC } from 'react';
import Modal from "../../../components/common/modal";
import { Form } from '../../../models/form';

type Props = {
    form: Form;
    visible: boolean;
    onClose: () => void;
    onSelect: (templateCode: string) => void;
}
const CreatePageViewModal: FC<Props> = ({ form, visible, onClose, onSelect }) => {

    return (
        <Modal
            visible={visible}
            onClose={onClose}
            title="Create page view"
            width={700}
            hideCancel
            hideOk
        >
            <div className='pb-5'>
                <div className='py-1 mb-4 text-sm border-b border-b-zinc-100 dark:border-b-steel-gray-900'>
                    <span>Choose a template</span>
                </div>
                <div className='grid grid-cols-2 gap-4'>
                    <div className='p-5 rounded flex items-center justify-between bg-zinc-100 dark:bg-steel-gray-900 shadow-sm'>
                        <div className='flex flex-col gap-1'>
                            <h3 className='font-bold'>Simple list</h3>
                            <a className='text-sm hover:underline' href={`${process.env.REACT_APP_DOMAIN}/pages/simple-list`} target='_blank' rel="noreferrer">See example</a>
                        </div>
                        <button className='flex items-center gap-2' onClick={() => onSelect('SimpleList')}>
                            <span>Use</span>
                            <ArrowRightIcon className='w-4 h-4' />
                        </button>
                    </div>
                    <div className='p-5 rounded flex items-center justify-between bg-zinc-100 dark:bg-steel-gray-900 shadow-sm'>
                        <div className='flex flex-col gap-1'>
                            <h3 className='font-bold'>Job board</h3>
                            <a className='text-sm hover:underline' href={`${process.env.REACT_APP_DOMAIN}/pages/job-board`} target='_blank' rel="noreferrer">See example</a>
                        </div>
                        <button className='flex items-center gap-2' onClick={() => onSelect('JobBoard')}>
                            <span>Use</span>
                            <ArrowRightIcon className='w-4 h-4' />
                        </button>
                    </div>
                    <div className='p-5 rounded flex items-center justify-between bg-zinc-100 dark:bg-steel-gray-900 shadow-sm'>
                        <div className='flex flex-col gap-1'>
                            <h3 className='font-bold'>Table</h3>
                            <a className='text-sm hover:underline' href={`${process.env.REACT_APP_DOMAIN}/pages/default-table`} target='_blank' rel="noreferrer">See example</a>
                        </div>
                        <button className='flex items-center gap-2'>
                            <span className='text-xs'>Coming soon</span>
                        </button>
                    </div>
                    <div className='p-5 rounded flex items-center justify-between bg-zinc-100 dark:bg-steel-gray-900 shadow-sm'>
                        <div className='flex flex-col gap-1'>
                            <h3 className='font-bold'>Card list</h3>
                            <a className='text-sm hover:underline' href={`${process.env.REACT_APP_DOMAIN}/pages/card-list`} target='_blank' rel="noreferrer">See example</a>
                        </div>
                        <button className='flex items-center gap-2'>
                            <span className='text-xs'>Coming soon</span>
                        </button>
                    </div>
                </div>
            </div>
        </Modal>
    );
}

export default CreatePageViewModal;
