import Form from 'rc-field-form';
import { FC } from "react";
import { toast } from 'react-toastify';
import Modal from "../../../components/common/modal";
import Dropdown from '../../../components/form/form-controls/dropdown';
import Input from '../../../components/form/form-controls/input';
import FormItem from '../../../components/form/form-item';
import StorageService from '../../../services/storage-service';

type Props = {
    visible: boolean;
    onClose: () => void;
}
const SetupOpenAIApiKeyModal: FC<Props> = ({ visible, onClose }) => {

    const [form] = Form.useForm();
    const openAIApiKey = StorageService.getItem("OpenAIApiKey");
    const openAIModel = StorageService.getItem("OpenAIModel");

    const onOk = () => {
        form.submit();
    }

    const onFinish = (values: any) => {
        StorageService.setItem("OpenAIApiKey", values.apiKey || '');
        StorageService.setItem("OpenAIModel", values.model || '');
        toast.success("Saved OpenAI API Key successfully!");
        onClose();
    }

    const gptModels = [
        { value: 'gpt-3.5-turbo', label: 'GPT-3.5' },
        { value: 'gpt-4', label: 'GPT-4' },
        { value: 'gpt-4-32k', label: 'GPT-4 32K' },
    ]

    return (
        <Modal
            visible={visible}
            onClose={onClose}
            title="Setup your own OpenAI API Key"
            onOk={onOk}
            okText='Save'
        >
            <Form
                onFinish={onFinish}
                form={form}
                initialValues={{ apiKey: openAIApiKey, model: openAIModel }}
            >
                <FormItem
                    title='API Key'
                    name={'apiKey'}
                    help="Your API Key is stored locally on your browser and never sent anywhere else"
                >
                    <Input placeholder="API Key" type='password' />
                </FormItem>
                <FormItem
                    title='Model'
                    name={'model'}
                >
                    <Dropdown options={gptModels} placeholder='GPT model' allowClear></Dropdown>
                </FormItem>
            </Form>
        </Modal>
    );
}

export default SetupOpenAIApiKeyModal;
