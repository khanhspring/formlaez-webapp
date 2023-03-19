import Form from 'rc-field-form';
import { FC, useEffect } from "react";
import { useRouteLoaderData } from 'react-router-dom';
import { toast } from 'react-toastify';
import Modal from "../../../components/common/modal";
import Input from '../../../components/form/form-controls/input';
import FormItem from '../../../components/form/form-item';
import useCreateTeam from '../../../hooks/team/useCreateTeam';
import { CreateTeamRequest } from '../../../models/team';
import { Workspace } from '../../../models/workspace';
import { showErrorIgnore403 } from '../../../util/common';

type Props = {
    visible: boolean;
    onClose: () => void;
    refetch?: () => void;
}
const CreateTeamModal: FC<Props> = ({ visible, onClose, refetch }) => {

    const workspace = useRouteLoaderData("workspace") as Workspace;
    const [form] = Form.useForm();
    const {mutateAsync: createTeam, isLoading: submitting} = useCreateTeam();

    useEffect(() => {
        if (visible) {
            form.resetFields();
        }
    }, [visible, form]);

    const onOk = () => {
        form.submit();
    }

    const onFinish = (values: any) => {
        const request: CreateTeamRequest = {
            name: values.name,
            description: values.description,
            workspaceId: workspace.id,
        }
        createTeam(request, {
            onSuccess: (response) => {
                toast.success('Created team successfully!');
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
            title="Create team"
            onOk={onOk}
            loading={submitting}
        >
            <Form
                onFinish={onFinish}
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
