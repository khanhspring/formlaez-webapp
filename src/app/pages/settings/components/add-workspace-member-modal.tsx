import RcForm from 'rc-field-form';
import { FC, useEffect, useState } from "react";
import { useRouteLoaderData } from "react-router-dom";
import { toast } from 'react-toastify';
import Button from '../../../components/common/button';
import Modal from "../../../components/common/modal";
import Dropdown from "../../../components/form/form-controls/dropdown";
import FormItem from "../../../components/form/form-item";
import { useDebounced } from '../../../features/form-builder/hooks/useDebounced';
import useUsers from '../../../hooks/user/useUsers';
import useAddWorkspaceMember from '../../../hooks/workspace/useAddWorkspaceMember';
import { AddWorkspaceMemberRequest, Workspace, WorkspaceMember } from "../../../models/workspace";
import { showErrorIgnore403 } from '../../../util/common';

const EMAIL_PATTERN = /^[\w.-_]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

type Option = {
    value: string | number;
    label: string;
};

type Props = {
    members: WorkspaceMember[];
    visible: boolean;
    onClose: () => void;
    refetch?: () => void;
}

const AddWorkspaceMemberModal: FC<Props> = ({ members, visible, onClose, refetch }) => {

    const workspace = useRouteLoaderData("workspace") as Workspace;
    const [rcForm] = RcForm.useForm();
    const { mutateAsync: addMember, isLoading: submitting } = useAddWorkspaceMember();

    const [email, setEmail] = useState();
    const [userOptions, setUserOptions] = useState<Option[]>([]);
    const { data: userPages, isLoading } = useUsers({ size: -1, email: email });

    const roles: Option[] = ['Owner', 'Member'].map((item) => ({ value: item, label: item }));

    useEffect(() => {
        if (!visible) {
            rcForm.setFieldsValue({});
        }
    }, [rcForm, visible]);

    useEffect(() => {
        const users = userPages?.content?.filter(user => !members.some(m => m.user.id === user.id))
            .map((user) => ({ value: user.id, label: `${user.firstName} ${user.lastName} (${user.email})` }));
        setUserOptions(users || []);
    }, [members, userPages]);

    const onFinish = (values: any) => {
        const userId = values.userId;
        const request: AddWorkspaceMemberRequest = {
            workspaceId: workspace.id,
            userId,
            role: values.role
        };

        addMember(request, {
            onError: (e) => showErrorIgnore403(e),
            onSuccess: () => {
                toast.success("Added workspace member successfully!");
                refetch?.();
                onClose?.();
                rcForm.resetFields();
            }
        })
    }

    const onSearch = useDebounced((value?: any) => {
        if (!value || !EMAIL_PATTERN.test(value)) {
            return;
        }
        console.log(value);
        setUserOptions([]);
        setEmail(value);
    })

    return (
        <Modal
            visible={visible}
            onClose={onClose}
            title="Add workspace member"
            hideCancel
            hideOk
            bodyClassName='!pb-5'
            width={650}
            wrapClassName="flex item-center"
            loading={submitting}
            destroyOnClose
        >
            <RcForm
                onFinish={onFinish}
                form={rcForm}
                className="w-full"
                initialValues={{ role: 'Member' }}
            >
                <div className='flex items-center gap-2'>
                    <div className="flex-1">
                        <FormItem
                            name={'userId'}
                            rules={[
                                { required: true, message: 'This field is required' },
                            ]}
                        >
                            <Dropdown
                                placeholder="Search users by email..."
                                options={userOptions}
                                onSearch={onSearch}
                                loading={isLoading}
                                filterOption={false}
                                notFoundContent={null}
                            />
                        </FormItem>
                    </div>
                    <div className="w-40">
                        <FormItem
                            name={'role'}
                            rules={[
                                { required: true, message: 'This field is required' },
                            ]}
                        >

                            <Dropdown
                                placeholder="Member role"
                                options={roles}
                                allowClear={false}
                            />
                        </FormItem>
                    </div>
                </div>
                <div className='flex justify-end'>
                    <Button>Add member</Button>
                </div>
            </RcForm>
        </Modal>
    );
}

export default AddWorkspaceMemberModal;
