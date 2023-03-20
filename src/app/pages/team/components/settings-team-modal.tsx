import Form from 'rc-field-form';
import { FC, useEffect } from "react";
import { toast } from 'react-toastify';
import Modal from "../../../components/common/modal";
import Input from '../../../components/form/form-controls/input';
import FormItem from '../../../components/form/form-item';
import useUpdateTeam from '../../../hooks/team/useUpdateTeam';
import { Team, UpdateTeamRequest } from '../../../models/team';
import { showErrorIgnore403 } from '../../../util/common';

type Props = {
    team: Team;
    visible: boolean;
    onClose: () => void;
    refetch?: () => void;
}
const SettingsTeamModal: FC<Props> = ({ team, visible, onClose, refetch }) => {

    const [form] = Form.useForm();
    const {mutateAsync: updateTeam, isLoading: submitting} = useUpdateTeam();

    useEffect(() => {
        if (visible) {
            form.setFieldsValue({...team});
        }
    }, [visible, form, team]);

    const onOk = () => {
        form.submit();
    }

    const onFinish = (values: any) => {
        const request: UpdateTeamRequest = {
            id: team.id,
            name: values.name,
            description: values.description,
        }
        updateTeam(request, {
            onSuccess: (response) => {
                toast.success('Updated team successfully!');
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
            title="Settings team"
            onOk={onOk}
            loading={submitting}
            destroyOnClose
        >
            <Form
                onFinish={onFinish}
                form={form}
                initialValues={{...team}}
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

export default SettingsTeamModal;
