import RcForm from 'rc-field-form';
import { FC } from "react";
import { useRouteLoaderData } from "react-router-dom";
import { toast } from 'react-toastify';
import Button from '../../../components/common/button';
import Modal from "../../../components/common/modal";
import Dropdown from "../../../components/form/form-controls/dropdown";
import FormItem from "../../../components/form/form-item";
import useAddTeamMember from '../../../hooks/team/useAddTeamMember';
import useWorkspaceMembers from "../../../hooks/workspace/useWorkspaceMembers";
import { AddTeamMemberRequest, Team, TeamMember } from '../../../models/team';
import { Workspace } from "../../../models/workspace";
import { showError } from '../../../util/common';

type Props = {
    team: Team;
    members: TeamMember[];
    visible: boolean;
    onClose: () => void;
    refetch?: () => void;
}
const AddTeamMemberModal: FC<Props> = ({ team, members, visible, onClose, refetch }) => {

    const workspace = useRouteLoaderData("workspace") as Workspace;
    const [rcForm] = RcForm.useForm();
    const {mutateAsync: addMember} = useAddTeamMember();

    const { data: workspaceMembers } = useWorkspaceMembers({ size: -1, workspaceId: workspace.id });

    const roles = ['Admin', 'Member'].map((item) => ({ value: item, label: item }));
    const users = workspaceMembers?.content?.filter(item => !members.some(m => m.user.id ===  item.user.id))
        .map((item) => ({ value: item.user.id, label: `${item.user.firstName} ${item.user.lastName}` }))

    const onFinish = (values: any) => {
        const userId = values.userId;
        const request: AddTeamMemberRequest = {
            teamId: team.id,
            userId,
            role: values.role
        };

        addMember(request, {
            onError: showError,
            onSuccess: () => {
                toast.success("Added team member successfully!");
                refetch?.();
            }
        })
    }

    return (
        <Modal
            visible={visible}
            onClose={onClose}
            title="Add team member"
            hideCancel
            hideOk
            bodyClassName='!pb-5'
            width={500}
            wrapClassName="flex item-center"
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
                                placeholder="Search users..."
                                options={users}
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

export default AddTeamMemberModal;
