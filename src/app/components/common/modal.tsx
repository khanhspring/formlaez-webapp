import Dialog from 'rc-dialog';
import React, { FC, PropsWithChildren, ReactElement, ReactNode, useEffect, useState, useRef } from 'react';
import Button from './button';

type Props = PropsWithChildren & {
    visible?: boolean;
    onClose?: () => void
    title?: ReactNode;
    okText?: string;
    hideOk?: boolean;
    cancelText?: string;
    hideCancel?: boolean;
    onOk?: () => void;
    closable?: boolean;
    maskClosable?: boolean;
    width?: string | number;
    mousePosition?: {
        x: number;
        y: number;
    } | null;
    afterClose?: () => any;
    loading?: boolean;
    destroyOnClose?: boolean;
    wrapClassName?: string;
    bodyClassName?: string;
    danger?: boolean;
    closeIcon?: ReactNode;
}

type MousePosition = { x: number; y: number } | null;

const Modal: FC<Props> = ({
    children,
    visible,
    okText = 'OK',
    cancelText = 'Cancel',
    hideOk,
    hideCancel,
    onOk = () => { },
    onClose = () => { },
    loading,
    destroyOnClose,
    wrapClassName = 'flex items-center',
    bodyClassName = '',
    danger,
    closeIcon=<i className="fi fi-rr-cross-small text-shadow-none dark:text-gray-200"></i>,
    ...rest
}) => {

    const [mousePosition, setMousePosition] = useState<MousePosition>();
    const btnOkRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (visible) {
            btnOkRef.current?.focus();
        }
        function handleClick(e: MouseEvent) {
            const mousePosition = {
                x: e.pageX,
                y: e.pageY,
            };
            setMousePosition(mousePosition);
        }
        document.addEventListener("mousedown", handleClick, true);
        return () => {
            document.removeEventListener("mousedown", handleClick, true);
        };
    }, [visible]);

    const modalRender = (node: ReactNode) => {
        const element = node as ReactElement;
        return (
            <>
                {React.cloneElement(element, { className: 'dark:bg-gray-800 ' + element.props.className })}
            </>
        )
    }

    return (
        <Dialog
            {...rest}
            destroyOnClose={destroyOnClose}
            animation="zoom"
            maskAnimation="fade"
            mousePosition={mousePosition || rest.mousePosition}
            closeIcon={closeIcon}
            maskProps={{ style: { background: 'rgba(0, 0, 0, 0.5)' } }}
            modalRender={modalRender}
            visible={visible}
            bodyStyle={{ padding: '0px 20px' }}
            bodyProps={{className: bodyClassName}}
            onClose={onClose}
            wrapClassName={wrapClassName}
        >
            {children}
            {
                (!hideCancel || !hideOk) &&
                <div className='pb-5 flex justify-end gap-2'>
                    {
                        !hideCancel && <Button status='secondary' onClick={onClose}>{cancelText}</Button>
                    }
                    {
                        !hideOk && <Button onClick={onOk} ref={btnOkRef} loading={loading} status={danger ? 'danger' : undefined}>{okText}</Button>
                    }
                </div>
            }
        </Dialog>
    );
}

export default Modal;
