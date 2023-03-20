import RcForm from 'rc-field-form';
import { FC, useEffect } from "react";
import { useRevalidator, useRouteLoaderData } from "react-router-dom";
import { toast } from 'react-toastify';
import Modal from "../../../components/common/modal";
import Dropdown from "../../../components/form/form-controls/dropdown";
import FormItem from "../../../components/form/form-item";
import useUpdateTeamMemberRole from '../../../hooks/team/useUpdateTeamMemberRole';
import { Team, TeamMember, UpdateTeamMemberRoleRequest } from '../../../models/team';
import { showErrorIgnore403 } from '../../../util/common';

type Option = {
    value: string | number;
    label: string;
};

type Props = {
    member: TeamMember;
    visible: boolean;
    onClose: () => void;
    refetch?: () => void;
}

const UpdateTeamMemberModal: FC<Props> = ({ member, visible, onClose, refetch }) => {

    const team = useRouteLoaderData("team") as Team;
    let { revalidate } = useRevalidator();
    const [rcForm] = RcForm.useForm();
    const { mutateAsync: updateMemberRole, isLoading: submitting } = useUpdateTeamMemberRole();

    const roles: Option[] = ['Owner', 'Member'].map((item) => ({ value: item, label: item }));

    useEffect(() => {
        if (visible) {
            rcForm.setFieldsValue({role: member.role});
        }
        return () => {
            rcForm.resetFields();
        }
    }, [member.role, rcForm, visible]);

    const onFinish = (values: any) => {
        const request: UpdateTeamMemberRoleRequest = {
            teamId: team.id,
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
            }
        })
    }

    return (
        <Modal
            visible={visible}
            onClose={onClose}
            title="Update team member role"
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

export default UpdateTeamMemberModal;
