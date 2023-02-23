import Dialog from 'rc-dialog';
import React, { FC, PropsWithChildren, ReactElement, ReactNode, useEffect, useState } from 'react';
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
}

type MousePosition = { x: number; y: number } | null;

const Modal: FC<Props> = ({ children, visible, okText = 'OK', cancelText = 'Cancel', hideOk, hideCancel, onOk = () => { }, onClose = () => { }, ...rest }) => {

    const [mousePosition, setMousePosition] = useState<MousePosition>();

    useEffect(() => {
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
                {React.cloneElement(element, { className: element.props.className + ' bg-cinder-600' })}
            </>
        )
    }

    return (
        <Dialog
            {...rest}
            animation="zoom"
            maskAnimation="fade"
            mousePosition={mousePosition || rest.mousePosition}
            closeIcon={<i className="fi fi-rr-cross-small text-shadow-none text-gray-200"></i>}
            maskProps={{ style: { background: 'rgba(0, 0, 0, 0.5)' } }}
            modalRender={modalRender}
            visible={visible}
            bodyStyle={{ padding: '0px 20px', paddingBottom: '10px' }}
            onClose={onClose}
        >
            {children}
            <div className='pb-2 pt-2 flex justify-end gap-2'>
                {
                    !hideCancel && <Button status='secondary' onClick={onClose}>{cancelText}</Button>
                }
                {
                    !hideOk && <Button onClick={onOk}>{okText}</Button>
                }
            </div>
        </Dialog>
    );
}

export default Modal;
