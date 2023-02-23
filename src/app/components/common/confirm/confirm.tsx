import { createRoot } from 'react-dom/client';
import ConfirmModal from './confirm-modal';

type MousePosition = { x: number; y: number } | null;
let mousePosition: MousePosition = null;

const getClickPosition = (e: MouseEvent) => {
    mousePosition = {
        x: e.pageX,
        y: e.pageY,
    };
};
document.addEventListener("mousedown", getClickPosition);

export type Options = {
    title: string;
    content?: string;
    onOk: () => void;
    onCancel?: () => void;
}

export default function confirm(options: Options) {
    const container = document.createDocumentFragment();
    const confirmRoot = createRoot(container);

    const afterClose = () => {
        // use promise to avoid React async warning
        Promise.resolve().then(() => confirmRoot.unmount());
    }

    confirmRoot.render(
        <ConfirmModal
            title={options.title}
            mousePosition={mousePosition}
            afterClose={afterClose}
            onCancel={options.onCancel}
            onOk={options.onOk}
        >
            {options.content}
        </ConfirmModal>
    );
}