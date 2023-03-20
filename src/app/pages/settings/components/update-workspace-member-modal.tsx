import RcForm from 'rc-field-form';
import { FC, useEffect } from "react";
import { useNavigate, useRevalidator, useRouteLoaderData } from "react-router-dom";
import { toast } from 'react-toastify';
import Modal from "../../../components/common/modal";
import Dropdown from "../../../components/form/form-controls/dropdown";
import FormItem from "../../../components/form/form-item";
import { useAppSelector } from '../../../hooks/redux-hook';
import useUpdateWorkspaceMemberRole from '../../../hooks/workspace/useUpdateWorkspaceMemberRole';
import { UpdateWorkspaceMemberRoleRequest, Workspace, WorkspaceMember } from "../../../models/workspace";
import { selectUserId } from '../../../slices/auth';
import { showErrorIgnore403 } from '../../../util/common';

type Option = {
    value: string | number;
    label: string;
};

type Props = {
    member: WorkspaceMember;
    visible: boolean;
    onClose: () => void;
    refetch?: () => void;
}

const UpdateWorkspaceMemberModal: FC<Props> = ({ member, visible, onClose, refetch }) => {

    const workspace = useRouteLoaderData("workspace") as Workspace;
    let { revalidate } = useRevalidator();
    const [rcForm] = RcForm.useForm();
    const { mutateAsync: updateMemberRole, isLoading: submitting } = useUpdateWorkspaceMemberRole();
    const navigate = useNavigate();
    const currentUserId = useAppSelector(selectUserId);

    const roles: Option[] = ['Owner', 'Member'].map((item) => ({ value: item, label: item }));

    useEffect(() => {
        if (visible) {
            rcForm.setFieldsValue({ role: member.role });
        }
        return () => {
            rcForm.resetFields();
        }
    }, [member.role, rcForm, visible]);

    const onFinish = (values: any) => {
        const request: UpdateWorkspaceMemberRoleRequest = {
            workspaceId: workspace.id,
            userId: member.user.id,
            role: values.role
        };

        updateMemberRole(request, {
            onError: (e) => showErrorIgnore403(e),
            onSuccess: () => {
                toast.success("Updated role successfully!");
                refetch?.();
                onClose?.();
                revalidate();
                if (currentUserId === member.user.id && request.role === 'Member') {
                    navigate(`/${workspace.code}`);
                }
            }
        })
    }

    return (
        <Modal
            visible={visible}
            onClose={onClose}
            title="Update workspace member role"
            wrapClassName="flex item-center"
            loading={submitting}
            destroyOnClose
            onOk={rcForm.submit}
            width={650}
        >
            <RcForm
                onFinish={onFinish}
                form={rcForm}
                className="w-full"
                initialValues={{ role: member.role }}
            >
                <div className='flex items-center gap-3 justify-between'>
                    <div className="">
                        <FormItem>
                            <span>{member.user.firstName} {member.user.lastName} ({member.user.email})</span>
                        </FormItem>
                    </div>
                    <div className='flex justify-center'>
                        <FormItem>
                            <i className="fi fi-rr-arrow-right"></i>
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
            </RcForm>
        </Modal>
    );
}

export default UpdateWorkspaceMemberModal;
