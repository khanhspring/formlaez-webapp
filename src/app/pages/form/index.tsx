import { Table, Column } from "ez-rc-table";
import { Link } from "react-router-dom";
import Pagination from 'rc-pagination';
import { PaginationLocale } from "../../constants/pagination-locale";

type User = {
    firstName: string;
    lastName: string;
    birthday: string;
    address: string;
}

function Form() {

    const columns: Column<User>[] = [
        {
            title: '#',
            dataKey: 'index',
            render(value, record, index) {
                return index + 1
            },
            width: 35,
            cellClassName: 'text-center bg-cinder-700 text-xs'
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
                        <button
                            title="Print"
                            className="w-[22px] h-[22px] rounded-full bg-cinder-700/70 hover:bg-cinder-700 flex items-center justify-center text-gray-500 hover:text-white"
                        >
                            <i className="fi fi-rr-print"></i>
                        </button>
                        <button
                            title="Edit"
                            className="w-[22px] h-[22px] rounded-full bg-cinder-700/70 hover:bg-cinder-700 flex items-center justify-center text-gray-500 hover:text-white"
                        >
                            <i className="fi fi-rr-pencil"></i>
                        </button>
                        <button
                            title="Edit"
                            className="w-[22px] h-[22px] rounded-full bg-cinder-700/70 hover:bg-cinder-700 flex items-center justify-center text-gray-500 hover:text-rose-700"
                        >
                            <i className="fi fi-rr-trash"></i>
                        </button>
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


    return (
        <div className="w-full flex flex-col gap-2">
            <div className="py-2 border-b dark:bg-cinder-900 border-cinder-600 z-20 sticky top-[64px] flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="flex items-center justify-center w-6 h-6 bg-gradient-to-r from-yellow-600 to-red-600 rounded-full transition group-hover:ring-2">
                        <span className="font-semibold">H</span>
                    </div>
                    <h2 className="font-semibold text-lg">Hợp đồng lao động</h2>
                </div>
                <div className="flex gap-2 text-xs transition">
                    <Link to={"/private/forms/example-page"}>
                        <span className="dark:text-gray-500 dark:hover:text-gray-300 cursor-pointer">Database</span>
                    </Link>
                    <Link to={"/private/forms/example-page/edit"}>
                        <span className="dark:text-gray-500 dark:hover:text-gray-300 cursor-pointer">Builder</span>
                    </Link>
                    <Link to={"/private/forms/example-page/print-templates"}>
                        <span className="dark:text-gray-500 dark:hover:text-gray-300 cursor-pointer">Print templates</span>
                    </Link>
                    <Link to={"/private/forms/example-page/settings"}>
                        <span className="dark:text-gray-500 dark:hover:text-gray-300 cursor-pointer">Settings</span>
                    </Link>
                </div>
            </div>
            <div className="flex items-center justify-between min-h-[40px] mt-3">
                <div className="flex items-center gap-3">
                    <span>Total 75</span>
                    <div className="relative hidden md:block">
                        <div className="absolute w-7 h-full flex items-center justify-center text-xs text-gray-500">
                            <i className="fi fi-rr-search"></i>
                        </div>
                        <input placeholder="Search" className="px-1 py-1.5 pl-7 dark:bg-cinder-700 rounded outline-none text-sm" />
                    </div>
                    <div className="hidden md:flex gap-2 py-1.5 px-3 cursor-pointer dark:bg-cinder-700 rounded items-center justify-center">
                        <i className="fi fi-rr-calendar text-xs text-gray-500"></i>
                        <span className="text-sm text-gray-500">All time</span>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button className="flex items-center justify-center w-7 h-7 text-gray-400 dark:bg-cinder-600 rounded dark:hover:text-gray-200 transition">
                        <i className="fi fi-rr-plus"></i>
                        <span className="hidden">Add new</span>
                    </button>
                    <button className="flex items-center justify-center w-7 h-7 text-gray-400 dark:bg-cinder-600 rounded dark:hover:text-gray-200 transition">
                        <i className="fi fi-rr-cloud-upload-alt"></i>
                        <span className="hidden">Upload</span>
                    </button>
                    <button className="flex items-center justify-center w-7 h-7 text-gray-400 dark:bg-cinder-600 rounded dark:hover:text-gray-200 transition">
                        <i className="fi fi-rr-cloud-download-alt"></i>
                        <span className="hidden">Download</span>
                    </button>
                    <Link to={"/private/forms/example/full"}>
                        <button className="flex items-center justify-center w-7 h-7 text-gray-400 dark:bg-cinder-600 rounded dark:hover:text-gray-200 transition">
                            <i className="fi fi-rr-expand"></i>
                            <span className="hidden">Exit Fullscreen</span>
                        </button>
                    </Link>
                </div>
            </div>
            <div className="mt-6">
                <Table
                    columns={columns}
                    data={data}
                    stickyHeader={{ top: 108 }}
                    className="border-cinder-600"
                    headerCellClassName="!border-cinder-600 !before:bg-cinder-600 !bg-cinder-700 py-[5px] px-1 text-sm"
                    cellClassName="border-cinder-600 text-sm p-0.5 px-1"
                />
            </div>
            <div className="w-full mt-3 p-1 rounded bg-cinder-700/80 sticky bottom-0 flex items-center justify-center">
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
