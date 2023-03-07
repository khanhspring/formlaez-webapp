import Form from 'rc-field-form';
import { FC, useEffect } from "react";
import Modal from "../../components/common/modal";
import Input from '../../components/form/form-controls/input';
import FormItem from '../../components/form/form-item';
import useCreateForm from '../../hooks/form/useCreateForm';
import { CreateFormRequest } from '../../models/form';
import { showError, showSuccess } from '../../util/common';

type Props = {
    visible: boolean;
    onClose: () => void;
    refetch?: () => void;
}
const CreateFormModal: FC<Props> = ({ visible, onClose, refetch }) => {

    const [form] = Form.useForm();
    const {mutateAsync: createForm, isLoading: summitting} = useCreateForm();

    useEffect(() => {
        if (visible) {
            form.resetFields();
        }
    }, [visible, form]);

    const onOk = () => {
        form.submit();
    }

    const onFinish = (values: any) => {
        const request: CreateFormRequest = {
            title: values.title,
            description: values.description,
            scope: 'Private'
        }
        createForm(request, {
            onSuccess: showSuccess,
            onError: showError,
        })
        .finally(() => {
            onClose();
            refetch?.();
        });
    }

    return (
        <Modal
            visible={visible}
            onClose={onClose}
            title="Create form"
            onOk={onOk}
            loading={summitting}
        >
            <Form
                onFinish={onFinish}
                form={form}
            >
                <FormItem
                    title='Title'
                    name={'title'}
                    rules={[
                        { required: true, message: "This field is required" },
                    ]}
                >
                    <Input placeholder="Title" maxLength={255}/>
                </FormItem>
                <FormItem
                    title='Description'
                    name={'description'}
                >
                    <Input placeholder="Description" maxLength={1000} />
                </FormItem>
            </Form>
        </Modal>
    );
}

export default CreateFormModal;
