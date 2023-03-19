import moment from 'moment';
import Table from 'rc-table';
import { ColumnsType } from 'rc-table/lib/interface';
import { FC, useState } from "react";
import ActionSearchInput from '../../../components/common/action-search-input/action-search-input';
import Button from '../../../components/common/button';
import Modal from "../../../components/common/modal";
import ButtonTableAction from '../../../components/layout/button-table-action';
import useTeamMembers from '../../../hooks/team/useTeamMembers';
import { Team, TeamMember } from '../../../models/team';
import AddTeamMemberModal from './add-team-member-modal';

type Props = {
    team: Team;
    visible: boolean;
    onClose: () => void;
}
const TeamMemberModal: FC<Props> = ({ team, visible, onClose }) => {

    const [addMemberVisible, setAddMemberVisible] = useState(false);
    const {data: pages, refetch} = useTeamMembers({size: -1, teamId: team.id});

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
        {
            title: '##',
            dataIndex: 'action',
            align: 'center',
            width: 80,
            render: (value) => {
                return (
                    <div className="flex items-center justify-center gap-1.5 text-xs">
                        <ButtonTableAction>
                            <i className="fi fi-rr-pencil"></i>
                        </ButtonTableAction>
                        <ButtonTableAction danger>
                            <i className="fi fi-rr-trash"></i>
                        </ButtonTableAction>
                    </div>
                );
            },
        },
    ]

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
            </Modal>
            <AddTeamMemberModal
                visible={addMemberVisible}
                team={team}
                members={pages?.content || []}
                onClose={() => setAddMemberVisible(false)}
                refetch={refetch}
            />
        </>
    );
}

export default TeamMemberModal;
