import Form from 'rc-field-form';
import { FC, useEffect } from "react";
import { useNavigate, useRouteLoaderData } from 'react-router-dom';
import { toast } from 'react-toastify';
import Modal from "../../../components/common/modal";
import Input from '../../../components/form/form-controls/input';
import FormItem from '../../../components/form/form-item';
import useCreateForm from '../../../hooks/form/useCreateForm';
import { CreateFormRequest } from '../../../models/form';
import { Workspace } from '../../../models/workspace';
import { showErrorIgnore403 } from '../../../util/common';

type Props = {
    visible: boolean;
    onClose: () => void;
    refetch?: () => void;
    teamId: number;
}
const CreateFormModal: FC<Props> = ({ visible, onClose, refetch, teamId }) => {

    const workspace = useRouteLoaderData("workspace") as Workspace;
    const [form] = Form.useForm();
    const {mutateAsync: createForm, isLoading: submitting} = useCreateForm();
    const navigate = useNavigate();

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
            scope: 'Team',
            workspaceId: workspace.id,
            teamId: teamId,
            coverType: 'Color',
            coverColor: 'bg-001'
        }
        createForm(request, {
            onSuccess: (response) => {
                toast.success('Created form successfully!');
                navigate(`/f/${response.code}/builder`);
            },
            onError: (e) => showErrorIgnore403(e),
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
            loading={submitting}
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
            </Form>
        </Modal>
    );
}

export default CreateFormModal;
