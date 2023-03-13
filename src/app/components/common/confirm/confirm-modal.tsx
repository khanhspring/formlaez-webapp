import { FC, PropsWithChildren, useState } from 'react';
import Modal from '../modal';

type Props = PropsWithChildren & {
    title?: string;
    onCancel?: () => void;
    onOk?: () => void;
    onOkAsync?: () => Promise<any>;
    mousePosition?: {
        x: number;
        y: number;
    } | null;
    afterClose?: () => any;
    okText?: string;
    width?: number;
    hideCancel?: boolean;
    danger?: boolean;
}

const ConfirmModal: FC<Props> = ({ title, children, onCancel, onOk, onOkAsync, okText, width = 380, hideCancel, danger, ...rest }) => {

    const [visible, setVisible] = useState(true);
    const [loading, setLoading] = useState(false);

    const onClose = () => {
        setVisible(false);
        onCancel?.();
    }

    const onOkClick = () => {
        if (onOk) {
            onOk?.();
            setVisible(false);
            return;
        }
        if (onOkAsync) {
            setLoading(true);
            onOkAsync?.()
                .finally(() => {
                    setLoading(false);
                    setVisible(false);
                })
        }
    }

    return (
        <Modal
            {...rest}
            closable={false}
            maskClosable={false}
            onClose={onClose}
            width={width}
            title={
                <span className='flex items-center gap-2'>
                    <i className="fi fi-sr-info text-xl text-yellow-500"></i>
                    {title}
                </span>
            }
            onOk={onOkClick}
            visible={visible}
            loading={loading}
            okText={okText}
            hideCancel={hideCancel}
            danger={danger}
        >
            <div className='text-sm'>
                {children}
            </div>
        </Modal>
    );
}

export default ConfirmModal;
