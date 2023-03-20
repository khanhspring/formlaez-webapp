import moment from "moment";
import Table from "rc-table";
import { ColumnsType } from "rc-table/lib/interface";
import Tooltip from "rc-tooltip";
import { useEffect, useState } from "react";
import { useNavigate, useRevalidator, useRouteLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import ActionSearchInput from "../../components/common/action-search-input/action-search-input";
import Button from "../../components/common/button";
import confirm from "../../components/common/confirm/confirm";
import ButtonTableAction from "../../components/layout/button-table-action";
import useWorkspaceContext from "../../hooks/auth/useWorkspaceContext";
import { useAppSelector } from "../../hooks/redux-hook";
import useRemoveWorkspaceMember from "../../hooks/workspace/useRemoveWorkspaceMember";
import useWorkspaceMembers from "../../hooks/workspace/useWorkspaceMembers";
import { UserSession } from "../../models/user-session";
import { RemoveWorkspaceMemberRequest, Workspace, WorkspaceMember } from "../../models/workspace";
import { selectUserId } from "../../slices/auth";
import { showErrorIgnore403 } from "../../util/common";
import AddWorkspaceMemberModal from "./components/add-workspace-member-modal";
import UpdateWorkspaceMemberModal from "./components/update-workspace-member-modal";

function WorkspaceMembers() {
    const workspace = useRouteLoaderData("workspace") as Workspace;
    const userSession = useRouteLoaderData("private") as UserSession;
    const workspaceContext = useWorkspaceContext();
    const currentUserId = useAppSelector(selectUserId);
    let { revalidate } = useRevalidator();
    const navigate = useNavigate();

    const [addMemberVisible, setAddMemberVisible] = useState(false);
    const [isLastAdmin, setLastAdmin] = useState(false);
    const [searchKeyword, setSearchKeyword] = useState<string>();
    const { data: pages, refetch } = useWorkspaceMembers({ size: -1, workspaceId: workspace.id });
    const [members, setMembers] = useState<WorkspaceMember[]>([]);
    const { mutateAsync: removeMember } = useRemoveWorkspaceMember();

    const [updateMemberVisible, setUpdateMemberVisible] = useState(false);
    const [selectedMember, setSelectedMember] = useState<WorkspaceMember>();

    const filterMembers = (members: WorkspaceMember[], keyword?: string): WorkspaceMember[] => {
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
        const request: RemoveWorkspaceMemberRequest = {
            userId: userId,
            workspaceId: workspace.id
        }
        return removeMember(request, {
            onError: (e) => showErrorIgnore403(e),
            onSuccess: () => {
                toast.success("Removed the user from this workspace successfully!");
                if (userId === currentUserId) {
                    revalidate();
                    if (userSession.joinedWorkspaces && userSession.joinedWorkspaces?.length > 1) {
                        navigate("/");
                    } else {
                        navigate("/logout");
                    }
                }
            }
        }).finally(refetch)
    }

    const showRemoveMemberWarning = (userId: string) => {
        confirm({
            title: 'Confirm',
            content: 'This action will also remove this user from the teams this user has joined, make sure the team owner role has been transferred to another user?',
            onOkAsync: () => onConfirmRemoveMember(userId),
            width: 550,
            danger: true
        })
    }

    const showConfirmRemoveMember = (member: WorkspaceMember) => {
        confirm({
            title: 'Confirm',
            content: 'Are you sure you want to remove this user from the workspace?',
            onOk: () => showRemoveMemberWarning(member.user.id)
        })
    }

    const showUpdateMemberModal = (member: WorkspaceMember) => {
        setSelectedMember(member);
        setUpdateMemberVisible(true);
    }

    const columns: ColumnsType<WorkspaceMember> = [
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

    const actionColumns: ColumnsType<WorkspaceMember> = workspaceContext?.isOwner ? [
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
                                disabledTooltip="Add another owner to remove this user from the workspace"
                            >
                                <i className="fi fi-rr-trash"></i>
                            </ButtonTableAction>
                        </div>
                    </>
                );
            },
        },
    ] : [];

    const onSearch = (keyword?: string) => {
        setSearchKeyword(keyword);
    }

    return (
        <>
            <div className='px-6 py-4 border-b border-slate-900/10 dark:border-cinder-700'>
                <h1 className='leading-5 font-bold'>Workspace members</h1>
            </div>
            <div className='p-6'>
                <div className="flex justify-between items-center">
                    <ActionSearchInput onSearch={onSearch} />
                    <Button onClick={() => setAddMemberVisible(true)}>
                        Add member
                    </Button>
                </div>
                <Table
                    columns={[...columns, ...actionColumns]}
                    data={members}
                    tableLayout={'fixed'}
                    rowKey={(record) => record.user.id}
                    emptyText={'No data'}
                    className="table-form-data text-slate-900 dark:text-white mt-4"
                />
            </div>
            <AddWorkspaceMemberModal
                visible={addMemberVisible}
                members={pages?.content || []}
                onClose={() => setAddMemberVisible(false)}
                refetch={refetch}
            />
            {
                selectedMember &&
                <UpdateWorkspaceMemberModal
                    visible={updateMemberVisible}
                    member={selectedMember}
                    onClose={() => setUpdateMemberVisible(false)}
                    refetch={refetch}
                />
            }
        </>
    );
}

export default WorkspaceMembers;
