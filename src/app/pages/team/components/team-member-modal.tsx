import moment from 'moment';
import Table from 'rc-table';
import { ColumnsType } from 'rc-table/lib/interface';
import { FC, useEffect, useState } from "react";
import { useNavigate, useRevalidator, useRouteLoaderData } from 'react-router-dom';
import { toast } from 'react-toastify';
import ActionSearchInput from '../../../components/common/action-search-input/action-search-input';
import Button from '../../../components/common/button';
import confirm from '../../../components/common/confirm/confirm';
import Modal from "../../../components/common/modal";
import ButtonTableAction from '../../../components/layout/button-table-action';
import useTeamContext from '../../../hooks/auth/useTeamContext';
import { useAppSelector } from '../../../hooks/redux-hook';
import useRemoveTeamMember from '../../../hooks/team/useRemoveTeamMember';
import useTeamMembers from '../../../hooks/team/useTeamMembers';
import { RemoveTeamMemberRequest, Team, TeamMember } from '../../../models/team';
import { Workspace } from '../../../models/workspace';
import { selectUserId } from '../../../slices/auth';
import { showErrorIgnore403 } from '../../../util/common';
import AddTeamMemberModal from './add-team-member-modal';
import UpdateTeamMemberModal from './update-team-member-modal';

type Props = {
    team: Team;
    visible: boolean;
    onClose: () => void;
}
const TeamMemberModal: FC<Props> = ({ team, visible, onClose }) => {

    const workspace = useRouteLoaderData("workspace") as Workspace;
    let { revalidate } = useRevalidator();
    const currentUserId = useAppSelector(selectUserId);
    const navigate = useNavigate();

    const [addMemberVisible, setAddMemberVisible] = useState(false);
    const { data: pages, refetch } = useTeamMembers({ size: -1, teamId: team.id });
    const teamContext = useTeamContext();
    const { mutateAsync: removeMember } = useRemoveTeamMember();

    const [searchKeyword, setSearchKeyword] = useState<string>();
    const [isLastAdmin, setLastAdmin] = useState(false);
    const [members, setMembers] = useState<TeamMember[]>([]);

    const [updateMemberVisible, setUpdateMemberVisible] = useState(false);
    const [selectedMember, setSelectedMember] = useState<TeamMember>();

    const filterMembers = (members: TeamMember[], keyword?: string): TeamMember[] => {
        if (!keyword) {
            return members;
        }
        return members.filter(m => {
            return m.user.email.toLowerCase().includes(keyword.toLowerCase())
                || m.user.firstName?.toLowerCase().includes(keyword.toLowerCase())
                || m.user.lastName?.toLowerCase().includes(keyword.toLowerCase())
        });
    }

    useEffect(() => {
        const members = pages?.content || [];
        const adminMembers = members.filter(m => m.role === 'Owner') || [];
        setLastAdmin(adminMembers.length <= 1);
    }, [pages]);

    useEffect(() => {
        const members = pages?.content || [];
        setMembers(filterMembers(members, searchKeyword));
    }, [pages, searchKeyword]);

    const onConfirmRemoveMember = (userId: string): Promise<any> => {
        const request: RemoveTeamMemberRequest = {
            userId: userId,
            teamId: team.id
        }
        return removeMember(request, {
            onError: (e) => showErrorIgnore403(e),
            onSuccess: () => {
                toast.success("Removed the user from this team successfully!");
                if (userId === currentUserId) {
                    revalidate();
                    navigate(`/${workspace.code}/t`);
                }
            }
        }).finally(refetch)
    }

    const showConfirmRemoveMember = (member: TeamMember) => {
        confirm({
            title: 'Confirm',
            content: 'Are you sure to remove this user from this team?',
            onOkAsync: () => onConfirmRemoveMember(member.user.id)
        })
    };

    const showUpdateMemberModal = (member: TeamMember) => {
        setSelectedMember(member);
        setUpdateMemberVisible(true);
    }

    const columns: ColumnsType<TeamMember> = [
        {
            title: '#',
            dataIndex: 'index',
            width: 35,
            fixed: 'left',
            align: 'center',
            render: (value, record, index) => {
                return (index + 1)
            },
        },
        {
            title: 'User',
            dataIndex: 'user',
            render: (value, record, index) => {
                return (
                    <div className='flex flex-col gap-0.5'>
                        <span className='text-sm font-bold'>{record.user.firstName} {record.user.lastName}</span>
                        <span className='text-xs'>{record.user.email}</span>
                    </div>
                );
            },
        },
        {
            title: 'Joined date',
            dataIndex: 'joinedDate',
            align: 'center',
            width: 120,
            render: (value, record, index) => {
                return moment(record.joinedDate).format("DD MMM YYYY");
            },
        },
        {
            title: 'Role',
            dataIndex: 'role',
            align: 'center',
            width: 120,
            render: (value) => {
                return (
                    <span className='font-bold'>{value}</span>
                );
            },
        },
    ];

    const actionColumns: ColumnsType<TeamMember> = teamContext.isOwner ? [
        {
            title: '##',
            dataIndex: 'action',
            align: 'center',
            width: 80,
            render: (value, record) => {
                const canRemoveMember = !isLastAdmin || record.role !== 'Owner';
                return (
                    <>
                        <div className="flex items-center justify-center gap-1.5 text-xs">
                            <ButtonTableAction
                                disabled={!canRemoveMember}
                                onClick={() => canRemoveMember ? showUpdateMemberModal(record) : undefined}
                                disabledTooltip="Add another owner to change this user role"
                            >
                                <i className="fi fi-rr-pencil"></i>
                            </ButtonTableAction>
                            <ButtonTableAction
                                disabled={!canRemoveMember}
                                danger
                                onClick={() => canRemoveMember ? showConfirmRemoveMember(record) : undefined}
                                disabledTooltip="Add another owner to remove this user from the team"
                            >
                                <i className="fi fi-rr-trash"></i>
                            </ButtonTableAction>
                        </div>
                    </>
                );
            },
        }
    ] : [];

    const onSearch = (keyword?: string) => {
        setSearchKeyword(keyword);
    }

    return (
        <>
            <Modal
                visible={visible}
                onClose={onClose}
                title="Team members"
                hideCancel
                hideOk
                bodyClassName='!pb-5'
                width={700}
                wrapClassName="flex item-center"
            >
                <div className="flex justify-between items-center">
                    <ActionSearchInput onSearch={onSearch} />
                    {
                        teamContext.isOwner &&
                        <Button onClick={() => setAddMemberVisible(true)}>
                            Add member
                        </Button>
                    }
                </div>
                <Table
                    columns={[...columns, ...actionColumns]}
                    data={members}
                    tableLayout={'fixed'}
                    rowKey={(record) => record.user.id}
                    emptyText={'No data'}
                    className="table-form-data text-slate-900 dark:text-white mt-4"
                />
            </Modal>
            <AddTeamMemberModal
                visible={addMemberVisible}
                team={team}
                members={pages?.content || []}
                onClose={() => setAddMemberVisible(false)}
                refetch={refetch}
            />
            {
                selectedMember &&
                <UpdateTeamMemberModal
                    visible={updateMemberVisible}
                    member={selectedMember}
                    onClose={() => setUpdateMemberVisible(false)}
                    refetch={refetch}
                />
            }
        </>
    );
}

export default TeamMemberModal;
