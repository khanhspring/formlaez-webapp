import moment from "moment";
import Table from "rc-table";
import { ColumnsType } from "rc-table/lib/interface";
import { useState } from "react";
import { useRouteLoaderData } from "react-router-dom";
import ActionSearchInput from "../../components/common/action-search-input/action-search-input";
import Button from "../../components/common/button";
import ButtonTableAction from "../../components/layout/button-table-action";
import useWorkspaceMembers from "../../hooks/workspace/useWorkspaceMembers";
import { Workspace, WorkspaceMember } from "../../models/workspace";
import AddWorkspaceMemberModal from "./components/add-workspace-member-modal";

function WorkspaceMembers() {
    const workspace = useRouteLoaderData("workspace") as Workspace;

    const [addMemberVisible, setAddMemberVisible] = useState(false);
    const { data: pages, refetch } = useWorkspaceMembers({ size: -1, workspaceId: workspace.id });

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
        {
            title: '##',
            dataIndex: 'action',
            align: 'center',
            width: 80,
            render: (value, record) => {
                return (
                    <>
                        {
                            record.role !== 'Owner' &&
                            <div className="flex items-center justify-center gap-1.5 text-xs">
                                <ButtonTableAction>
                                    <i className="fi fi-rr-pencil"></i>
                                </ButtonTableAction>
                                <ButtonTableAction danger>
                                    <i className="fi fi-rr-trash"></i>
                                </ButtonTableAction>
                            </div>
                        }
                    </>
                );
            },
        },
    ]


    return (
        <>
            <div className='px-6 py-4 border-b border-slate-900/10 dark:border-cinder-700'>
                <h1 className='leading-5 font-bold'>Workspace members</h1>
            </div>
            <div className='p-6'>
                <div className="flex justify-between items-center">
                    <ActionSearchInput />
                    <Button onClick={() => setAddMemberVisible(true)}>
                        Add member
                    </Button>
                </div>
                <Table
                    columns={columns}
                    data={pages?.content || []}
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
        </>
    );
}

export default WorkspaceMembers;
