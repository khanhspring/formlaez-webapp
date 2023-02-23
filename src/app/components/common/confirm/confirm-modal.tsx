import { FC, PropsWithChildren, useState } from 'react';
import Modal from '../modal';

type Props = PropsWithChildren & {
    title?: string;
    onCancel?: () => void;
    onOk?: () => void;
    mousePosition?: {
        x: number;
        y: number;
    } | null;
    afterClose?: () => any;
}

const ConfirmModal: FC<Props> = ({ title, children, onCancel, onOk, ...rest }) => {

    const [visible, setVisible] = useState(true);

    const onClose = () => {
        setVisible(false);
        onCancel?.();
    }

    const onOkClick = () => {
        onOk?.();
        setVisible(false);
    }

    return (
        <Modal
            {...rest}
            closable={false}
            maskClosable={false}
            onClose={onClose}
            width={380}
            title={
                <span className='flex items-center gap-2'>
                    <i className="fi fi-sr-info text-xl text-yellow-500"></i>
                    {title}
                </span>
            }
            onOk={onOkClick}
            visible={visible}
        >
            <div className='text-sm pl-[28px]'>
                {children}
            </div>
        </Modal>
    );
}

export default ConfirmModal;
