import { Table, Column } from "ez-rc-table";
import { Link, useParams } from "react-router-dom";
import Pagination from 'rc-pagination';
import { PaginationLocale } from "../../constants/pagination-locale";
import PageTitle from "../../components/layout/page-title";
import ButtonAction from "../../components/layout/button-action";
import ButtonTableAction from "../../components/layout/button-table-action";
import useForm from "../../hooks/form/useForm";

type User = {
    firstName: string;
    lastName: string;
    birthday: string;
    address: string;
}

function Form() {

    const params = useParams();
    const {data: form} = useForm(params.formCode);

    const columns: Column<User>[] = [
        {
            title: '#',
            dataKey: 'index',
            render(value, record, index) {
                return index + 1
            },
            width: 35,
            cellClassName: 'text-center dark:bg-cinder-700 text-xs'
        },
        {
            title: 'First Name',
            dataKey: 'firstName',
            width: 170,
            cellClassName: 'text-sm'
        },
        {
            title: 'Last Name',
            dataKey: 'lastName',
            width: 170,
            cellClassName: 'text-sm'
        },
        {
            title: 'Birthday',
            dataKey: 'birthday',
            width: 170,
            cellClassName: 'text-sm'
        },
        {
            title: 'Address',
            dataKey: 'address',
            render: (value, record) => <button onClick={() => alert(value)}>{record?.firstName}</button>
        },
        {
            title: '##',
            dataKey: 'action',
            width: 100,
            render(value, record, index) {
                return (
                    <div className="flex items-center justify-center gap-1.5 text-xs">
                        <ButtonTableAction>
                            <i className="fi fi-rr-print"></i>
                        </ButtonTableAction>
                        <ButtonTableAction>
                            <i className="fi fi-rr-pencil"></i>
                        </ButtonTableAction>
                        <ButtonTableAction danger>
                            <i className="fi fi-rr-trash"></i>
                        </ButtonTableAction>
                    </div>
                )
            },
        }
    ];

    const data = [
        { firstName: 'Harry', lastName: 'Tran', birthday: '01/01/1993', address: 'Hanoi, Viet Nam' },
        { firstName: 'Anna', lastName: 'Nguyen', birthday: '01/01/1996', address: 'Hanoi, Viet Nam' },
        { firstName: 'Harry', lastName: 'Tran', birthday: '01/01/1993', address: 'Hanoi, Viet Nam' },
        { firstName: 'Anna', lastName: 'Nguyen', birthday: '01/01/1996', address: 'Hanoi, Viet Nam' },
        { firstName: 'Harry', lastName: 'Tran', birthday: '01/01/1993', address: 'Hanoi, Viet Nam' },
        { firstName: 'Anna', lastName: 'Nguyen', birthday: '01/01/1996', address: 'Hanoi, Viet Nam' },
        { firstName: 'Harry', lastName: 'Tran', birthday: '01/01/1993', address: 'Hanoi, Viet Nam' },
        { firstName: 'Anna', lastName: 'Nguyen', birthday: '01/01/1996', address: 'Hanoi, Viet Nam' },
        { firstName: 'Harry', lastName: 'Tran', birthday: '01/01/1993', address: 'Hanoi, Viet Nam' },
        { firstName: 'Anna', lastName: 'Nguyen', birthday: '01/01/1996', address: 'Hanoi, Viet Nam' },
        { firstName: 'Harry', lastName: 'Tran', birthday: '01/01/1993', address: 'Hanoi, Viet Nam' },
        { firstName: 'Anna', lastName: 'Nguyen', birthday: '01/01/1996', address: 'Hanoi, Viet Nam' },
        { firstName: 'Harry', lastName: 'Tran', birthday: '01/01/1993', address: 'Hanoi, Viet Nam' },
        { firstName: 'Anna', lastName: 'Nguyen', birthday: '01/01/1996', address: 'Hanoi, Viet Nam' },
        { firstName: 'Harry', lastName: 'Tran', birthday: '01/01/1993', address: 'Hanoi, Viet Nam' },
        { firstName: 'Anna', lastName: 'Nguyen', birthday: '01/01/1996', address: 'Hanoi, Viet Nam' },
        { firstName: 'Harry', lastName: 'Tran', birthday: '01/01/1993', address: 'Hanoi, Viet Nam' },
        { firstName: 'Anna', lastName: 'Nguyen', birthday: '01/01/1996', address: 'Hanoi, Viet Nam' },
        { firstName: 'Harry', lastName: 'Tran', birthday: '01/01/1993', address: 'Hanoi, Viet Nam' },
        { firstName: 'Anna', lastName: 'Nguyen', birthday: '01/01/1996', address: 'Hanoi, Viet Nam' },
        { firstName: 'Harry', lastName: 'Tran', birthday: '01/01/1993', address: 'Hanoi, Viet Nam' },
        { firstName: 'Anna', lastName: 'Nguyen', birthday: '01/01/1996', address: 'Hanoi, Viet Nam' },
        { firstName: 'Harry', lastName: 'Tran', birthday: '01/01/1993', address: 'Hanoi, Viet Nam' },
        { firstName: 'Anna', lastName: 'Nguyen', birthday: '01/01/1996', address: 'Hanoi, Viet Nam' },
        { firstName: 'Harry', lastName: 'Tran', birthday: '01/01/1993', address: 'Hanoi, Viet Nam' },
        { firstName: 'Anna', lastName: 'Nguyen', birthday: '01/01/1996', address: 'Hanoi, Viet Nam' },
        { firstName: 'Harry', lastName: 'Tran', birthday: '01/01/1993', address: 'Hanoi, Viet Nam' },
        { firstName: 'Anna', lastName: 'Nguyen', birthday: '01/01/1996', address: 'Hanoi, Viet Nam' },
        { firstName: 'Harry', lastName: 'Tran', birthday: '01/01/1993', address: 'Hanoi, Viet Nam' },
        { firstName: 'Anna', lastName: 'Nguyen', birthday: '01/01/1996', address: 'Hanoi, Viet Nam' },
        { firstName: 'Harry', lastName: 'Tran', birthday: '01/01/1993', address: 'Hanoi, Viet Nam' },
        { firstName: 'Anna', lastName: 'Nguyen', birthday: '01/01/1996', address: 'Hanoi, Viet Nam' },
        { firstName: 'Harry', lastName: 'Tran', birthday: '01/01/1993', address: 'Hanoi, Viet Nam' },
        { firstName: 'Anna', lastName: 'Nguyen', birthday: '01/01/1996', address: 'Hanoi, Viet Nam' },
        { firstName: 'Harry', lastName: 'Tran', birthday: '01/01/1993', address: 'Hanoi, Viet Nam' },
        { firstName: 'Anna', lastName: 'Nguyen', birthday: '01/01/1996', address: 'Hanoi, Viet Nam' },
        { firstName: 'Harry', lastName: 'Tran', birthday: '01/01/1993', address: 'Hanoi, Viet Nam' },
        { firstName: 'Anna', lastName: 'Nguyen', birthday: '01/01/1996', address: 'Hanoi, Viet Nam' },
        { firstName: 'Harry', lastName: 'Tran', birthday: '01/01/1993', address: 'Hanoi, Viet Nam' },
        { firstName: 'Anna', lastName: 'Nguyen', birthday: '01/01/1996', address: 'Hanoi, Viet Nam' },
        { firstName: 'Harry', lastName: 'Tran', birthday: '01/01/1993', address: 'Hanoi, Viet Nam' },
        { firstName: 'Anna', lastName: 'Nguyen', birthday: '01/01/1996', address: 'Hanoi, Viet Nam' },
        { firstName: 'Harry', lastName: 'Tran', birthday: '01/01/1993', address: 'Hanoi, Viet Nam' },
        { firstName: 'Anna', lastName: 'Nguyen', birthday: '01/01/1996', address: 'Hanoi, Viet Nam' },
        { firstName: 'Harry', lastName: 'Tran', birthday: '01/01/1993', address: 'Hanoi, Viet Nam' },
        { firstName: 'Anna', lastName: 'Nguyen', birthday: '01/01/1996', address: 'Hanoi, Viet Nam' },
        { firstName: 'Harry', lastName: 'Tran', birthday: '01/01/1993', address: 'Hanoi, Viet Nam' },
        { firstName: 'Anna', lastName: 'Nguyen', birthday: '01/01/1996', address: 'Hanoi, Viet Nam' },
        { firstName: 'Harry', lastName: 'Tran', birthday: '01/01/1993', address: 'Hanoi, Viet Nam' },
        { firstName: 'Anna', lastName: 'Nguyen', birthday: '01/01/1996', address: 'Hanoi, Viet Nam' },
        { firstName: 'Harry', lastName: 'Tran', birthday: '01/01/1993', address: 'Hanoi, Viet Nam' },
        { firstName: 'Anna', lastName: 'Nguyen', birthday: '01/01/1996', address: 'Hanoi, Viet Nam' },
        { firstName: 'Harry', lastName: 'Tran', birthday: '01/01/1993', address: 'Hanoi, Viet Nam' },
        { firstName: 'Anna', lastName: 'Nguyen', birthday: '01/01/1996', address: 'Hanoi, Viet Nam' },
        { firstName: 'Harry', lastName: 'Tran', birthday: '01/01/1993', address: 'Hanoi, Viet Nam' },
        { firstName: 'Anna', lastName: 'Nguyen', birthday: '01/01/1996', address: 'Hanoi, Viet Nam' },
        { firstName: 'Harry', lastName: 'Tran', birthday: '01/01/1993', address: 'Hanoi, Viet Nam' },
        { firstName: 'Anna', lastName: 'Nguyen', birthday: '01/01/1996', address: 'Hanoi, Viet Nam' },
        { firstName: 'Harry', lastName: 'Tran', birthday: '01/01/1993', address: 'Hanoi, Viet Nam' },
        { firstName: 'Anna', lastName: 'Nguyen', birthday: '01/01/1996', address: 'Hanoi, Viet Nam' },
        { firstName: 'Harry', lastName: 'Tran', birthday: '01/01/1993', address: 'Hanoi, Viet Nam' },
        { firstName: 'Anna', lastName: 'Nguyen', birthday: '01/01/1996', address: 'Hanoi, Viet Nam' },
    ]

    const pageActions = (
        <>
            <Link to={`/private/forms/${params.formCode}`}>
                <span className="dark:text-gray-500 dark:hover:text-gray-300 cursor-pointer">Database</span>
            </Link>
            <Link to={`/private/forms/${params.formCode}/edit`}>
                <span className="dark:text-gray-500 dark:hover:text-gray-300 cursor-pointer">Builder</span>
            </Link>
            <Link to={`/private/forms/${params.formCode}/print-templates`}>
                <span className="dark:text-gray-500 dark:hover:text-gray-300 cursor-pointer">Print templates</span>
            </Link>
            <Link to={`/private/forms/${params.formCode}/settings`}>
                <span className="dark:text-gray-500 dark:hover:text-gray-300 cursor-pointer">Settings</span>
            </Link>
        </>
    )


    return (
        <div className="w-full flex flex-col gap-2">
            <PageTitle title={form?.title || ''} actions={pageActions} />
            <div className="flex items-center justify-between min-h-[40px] mt-3">
                <div className="flex items-center gap-3">
                    <span>Total 75</span>
                    <div className="relative hidden md:block">
                        <div className="absolute w-7 h-full flex items-center justify-center text-xs text-gray-500">
                            <i className="fi fi-rr-search"></i>
                        </div>
                        <input placeholder="Search" className="px-1 py-1.5 pl-7 bg-gray-200/70 dark:bg-cinder-700 rounded outline-none text-sm" />
                    </div>
                    <div className="hidden md:flex gap-2 py-1.5 px-3 cursor-pointer text-gray-500 bg-slate-50 dark:bg-cinder-700 rounded items-center justify-center">
                        <i className="fi fi-rr-calendar text-xs text-gray-500"></i>
                        <span className="text-sm text-gray-500">All time</span>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <ButtonAction>
                        <i className="fi fi-rr-plus"></i>
                    </ButtonAction>
                    <ButtonAction>
                        <i className="fi fi-rr-cloud-upload-alt"></i>
                    </ButtonAction>
                    <ButtonAction>
                        <i className="fi fi-rr-cloud-download-alt"></i>
                    </ButtonAction>
                    <Link to={"/private/forms/example/full"}>
                        <ButtonAction>
                            <i className="fi fi-rr-expand"></i>
                        </ButtonAction>
                    </Link>
                </div>
            </div>
            <div className="mt-6">
                <Table
                    columns={columns}
                    data={data}
                    stickyHeader={{ top: 108 }}
                    className="!border-slate-900/10 dark:!border-cinder-600"
                    headerCellClassName="!border-slate-800/10 after:!bg-slate-800/10 before:!bg-slate-900/10 !bg-slate-50 dark:!border-cinder-600 dark:before:bg-cinder-600 dark:!bg-cinder-700 py-[5px] px-1 text-sm"
                    cellClassName="!border-slate-900/10 dark:!border-cinder-600 text-sm p-0.5 px-1"
                />
            </div>
            <div className="w-full mt-3 p-1 bg-white/90 border border-slate-900/10 dark:bg-cinder-700/80 dark:border-transparent sticky bottom-0 flex items-center justify-center">
                <Pagination
                    total={1000}
                    pageSize={20}
                    locale={PaginationLocale}
                    prevIcon={<i className="fi fi-rr-arrow-left text-lg"></i>}
                    nextIcon={<i className="fi fi-rr-arrow-right text-lg"></i>}
                />
            </div>
        </div>
    );
}

export default Form;
