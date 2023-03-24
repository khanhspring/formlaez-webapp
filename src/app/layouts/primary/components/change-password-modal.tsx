import Form from 'rc-field-form';
import { FC, useEffect } from "react";
import { toast } from 'react-toastify';
import Modal from "../../../components/common/modal";
import Input from '../../../components/form/form-controls/input';
import FormItem from '../../../components/form/form-item';
import useChangePassword from '../../../hooks/user-settings/useChangePassword';
import { ChangePasswordRequest } from '../../../models/user-settings';
import { showErrorIgnore403 } from '../../../util/common';

type Props = {
    visible: boolean;
    onClose: () => void;
    onSuccess?: () => void;
}
const ChangePasswordModal: FC<Props> = ({ visible, onClose, onSuccess }) => {

    const [form] = Form.useForm();
    const {mutateAsync: changePassword, isLoading: submitting} = useChangePassword();

    useEffect(() => {
        if (visible) {
            form.resetFields();
        }
    }, [visible, form]);

    const onOk = () => {
        form.submit();
    }

    const onFinish = (values: any) => {
        const request: ChangePasswordRequest = {
            ...values
        }
        changePassword(request, {
            onSuccess: (response) => {
                toast.success('Changed password successfully! You can use your new password to sign in now', {autoClose: 7000});
                onSuccess?.();
            },
            onError: (e) => showErrorIgnore403(e),
        })
        .finally(() => {
            onClose();
        });
    }

    return (
        <Modal
            visible={visible}
            onClose={onClose}
            title="Change password"
            onOk={onOk}
            loading={submitting}
        >
            <Form
                onFinish={onFinish}
                form={form}
            >
            <FormItem
                title='Current password'
                name={'currentPassword'}
                help="If you signed up with your social account and have not set a password, you can leave this field blank"
            >
                <Input placeholder="Current password" type='password'/>
            </FormItem>
                <FormItem
                    title='New password'
                    name={'newPassword'}
                    rules={[
                        { required: true, message: "This field is required" },
                        { min: 8, message: "Password must be at least 8 characters" },
                    ]}
                >
                    <Input placeholder="New password" type='password'/>
                </FormItem>
            </Form>
        </Modal>
    );
}

export default ChangePasswordModal;
