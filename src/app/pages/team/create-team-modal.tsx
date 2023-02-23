import Form from 'rc-field-form';
import { FC, useEffect } from "react";
import Modal from "../../components/common/modal";
import Input from '../../components/form/form-controls/input';
import FormItem from '../../components/form/form-item';

type Props = {
    visible: boolean;
    onClose: () => void;
}
const CreateTeamModal: FC<Props> = ({ visible, onClose }) => {

    const [form] = Form.useForm();

    useEffect(() => {
        if (visible) {
            form.resetFields();
        }
    }, [visible, form]);

    const onOk = () => {
        form.submit();
    }

    return (
        <Modal
            visible={visible}
            onClose={onClose}
            title="Create team"
            onOk={onOk}
        >
            <Form
                onFinish={(values) => {
                    console.log("Finish:", values);
                }}
                form={form}
            >
                <FormItem
                    title='Name'
                    name={'name'}
                    rules={[
                        { required: true, message: "This field is required" },
                    ]}
                >
                    <Input placeholder="Name" maxLength={255}/>
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

export default CreateTeamModal;
