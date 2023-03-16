import Switch from 'rc-switch';
import { FC, useEffect, useState } from 'react';
import Button from '../../../components/common/button';
import Modal from "../../../components/common/modal";
import Textarea from '../../../components/form/form-controls/textarea';
import { useDebounced } from '../../../features/form-builder/hooks/useDebounced';
import useFormEnding from '../../../hooks/form/useFormEnding';
import useUpdateFormEnding from '../../../hooks/form/useUpdateFormEnding';
import { UpdateFormEndingRequest } from '../../../models/form-ending';
import { showError } from '../../../util/common';

const defaultContent = `Thanks for completing this form.\nNow create your own — it's free, easy, & beautiful`

type Props = {
    formTitle: string;
    formId: number;
    visible: boolean;
    onClose: () => void;
}

const CustomizeEndingModal: FC<Props> = ({ formTitle, formId, visible, onClose }) => {

    const [content, setContent] = useState<string | undefined>(defaultContent);
    const [hideButton, setHideButton] = useState(false);

    const { mutateAsync: updateEnding } = useUpdateFormEnding();
    const { data: formEnding, refetch } = useFormEnding(formId);

    useEffect(() => {
        if (formEnding) {
            setContent(formEnding.content);
            setHideButton(formEnding.hideButton);
        }
    }, [formEnding]);

    const updateContent = useDebounced((content?: string) => {
        const request: UpdateFormEndingRequest = {
            formId: formId,
            hideButton,
            content: content
        }
        updateEnding(request, {
            onError: showError
        }).finally(refetch);
    });

    const onContentChange = (content?: string) => {
        setContent(content);
        updateContent(content);
    }

    const onHideButtonChange = (value: boolean) => {
        setHideButton(value);
        const request: UpdateFormEndingRequest = {
            formId: formId,
            hideButton: value,
            content: content
        }
        updateEnding(request, {
            onError: showError
        });
    }

    return (
        <Modal
            visible={visible}
            onClose={onClose}
            hideCancel
            hideOk
            width={"80vw"}
            wrapClassName="flex item-center"
            bodyClassName="!px-0"
        >
            <div className='min-h-[500px] flex'>
                <div className="flex-1 container max-w-[550px] m-auto flex flex-col items-center mt-28">
                    <h1 className="text-4xl font-bold text-center cursor-not-allowed">{formTitle}</h1>
                    <div className="w-full mt-10">
                        <Textarea
                            className='w-full text-xl text-center border-none leading-8 !bg-transparent !p-0'
                            autoHeight
                            value={content}
                            onChange={(e) => onContentChange(e.target.value)}
                            placeholder={defaultContent}
                            rows={2}
                        />
                    </div>
                    <div className="flex justify-center mt-10">
                        {
                            !hideButton &&
                            <Button className="gap-4 px-4">
                                <span className="text-lg">Create a form now</span>
                                <i className="fi fi-rr-arrow-right text-xl"></i>
                            </Button>
                        }
                    </div>
                </div>
                <div className='w-[250px] border-l border-slate-900/10 dark:border-cinder-700'>
                    <h2 className="py-2 px-3 leading-6 border-b border-slate-900/10 dark:border-cinder-700">
                        Customize ending page
                    </h2>
                    <div className='py-2 px-3 flex flex-col gap-3'>
                        <div className='py-3 flex justify-between items-center'>
                            <label className='text-sm'>Hide button</label>
                            <Switch checked={hideButton} onChange={onHideButtonChange} />
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
}

export default CustomizeEndingModal;
