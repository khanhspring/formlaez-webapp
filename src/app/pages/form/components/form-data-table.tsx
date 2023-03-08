import moment from "moment";
import Pagination from "rc-pagination";
import Table from "rc-table";
import { ColumnsType, TableSticky } from "rc-table/lib/interface";
import Tooltip from "rc-tooltip";
import { FC, useEffect, useMemo, useState } from "react";
import ExternalScroll from "../../../components/common/external-scroll";
import ButtonTableAction from "../../../components/layout/button-table-action";
import { PaginationLocale } from "../../../constants/pagination-locale";
import FieldUtil from "../../../features/form-builder/utils/field-util";
import useSubmissions from "../../../hooks/submissions/useSubmissions";
import { Form } from "../../../models/form";
import { FormSubmission } from "../../../models/form-submission";

type ColumnWidth = {
    index: number;
    id: number;
    user: number;
    dateTime: number;
    action: number;
    data: number;
}

const ColumnWidthConfig: ColumnWidth = {
    index: 35,
    id: 120,
    user: 155,
    dateTime: 135,
    action: 100,
    data: 150,
}

function calculateTableWidth(dataColumnCount: number) {
    return ColumnWidthConfig.index
        + ColumnWidthConfig.id
        + ColumnWidthConfig.user
        + ColumnWidthConfig.dateTime
        + ColumnWidthConfig.action
        + ColumnWidthConfig.data * dataColumnCount;
}

type Props = {
    form?: Form;
    sticky?: boolean | TableSticky;
}

const FormDataTable: FC<Props> = ({ form, sticky }) => {

    const [tableBody, setTableBody] = useState<HTMLElement>();
    const { data: formData } = useSubmissions({ formCode: form?.code });

    const dataColumns = useMemo(() => {
        if (!form?.pages) {
            return [];
        }
        const firstPage = form?.pages[0];
        if (!firstPage.sections) {
            return [];
        }

        const columns: any[] = [];
        for (const section of firstPage.sections) {
            if (section.type !== 'Single'
                || !section.fields
                || section.fields.length === 0) {
                continue;
            }

            const field = section.fields[0];
            if (FieldUtil.isFormControl(field)) {
                const column: ColumnsType<FormSubmission> = [{
                    title: field.title,
                    dataIndex: field.code,
                    ellipsis: {showTitle: false},
                    render(value, record, index) {
                        return (
                            <Tooltip
                                placement="bottomLeft"
                                overlay={<div className="max-w-[350px]">{record?.data[field.code]}</div>}
                                mouseEnterDelay={0.5}
                                showArrow={false}
                            >
                                <div className="text-ellipsis overflow-hidden">{record?.data[field.code]}</div>
                            </Tooltip>
                        );
                    }
                }]
                const [dataColumn] = column;
                columns.push(dataColumn);
            }
        }
        return columns;
    }, [form?.pages]);

    const getTableBodyElement = (): HTMLElement | undefined => {
        const elements = document.getElementsByClassName("table-form-data");
        if (!elements || elements.length === 0) {
            return;
        }
        const table = elements[0];
        const tableBody = table.querySelectorAll('.rc-table-body');
        if (!tableBody || tableBody.length === 0) {
            return;
        }
        return tableBody[0] as HTMLElement;
    }

    useEffect(() => {
        if (form) {
            // to make sure the table has finished rendering the columns
            setTimeout(() => {
                const element = getTableBodyElement();
                setTableBody(element);
            }, 100)
        }
    }, [form]);

    const defaultColumns: ColumnsType<FormSubmission> = [
        {
            title: '#',
            dataIndex: 'index',
            width: ColumnWidthConfig.index,
            fixed: 'left',
            align: 'center',
            render: (value, record, index) => {
                return index + 1
            },
        },
        {
            title: 'ID',
            dataIndex: 'code',
            align: 'center',
            width: ColumnWidthConfig.id,
            render: (value, record, index) => {
                return (
                    <span className="text-xs bg-slate-300 dark:bg-cinder-900 inline-block px-1 py-0.5 min-w-[75px] rounded cursor-pointer">
                        {value.substring(0, 8)}
                    </span>
                )
            },
        },
        {
            title: 'User',
            dataIndex: 'user',
            width: ColumnWidthConfig.user,
            render: (value, record, index) => {
                return record.createdBy?.firstName + ' ' + record.createdBy?.lastName;
            },
        },
        {
            title: 'Datetime',
            dataIndex: 'dateTime',
            align: 'center',
            width: ColumnWidthConfig.dateTime,
            render: (value, record, index) => {
                return moment(record.createdDate).format("DD MMM YYYY HH:mm");
            },
        }
    ]

    const actionColumns: ColumnsType<FormSubmission> = [
        {
            title: '##',
            dataIndex: 'action',
            width: ColumnWidthConfig.action,
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
            fixed: 'right',
            align: 'center'
        }
    ];

    const columns: ColumnsType<FormSubmission> = [...defaultColumns, ...dataColumns, ...actionColumns];
    const tableWidth = calculateTableWidth(dataColumns?.length || 0);

    if (!form) {
        return <></>
    }

    return (
        <>
            <Table
                columns={columns}
                data={formData?.content}
                tableLayout={'fixed'}
                rowKey={'id'}
                scroll={{
                    x: tableWidth,
                }}
                sticky={sticky}
                className="table-form-data text-slate-900 dark:text-white"
            />
            <div className="w-full mt-3 p-1 z-[200] bg-white/90 border border-slate-900/10 dark:bg-cinder-700/80 dark:border-cinder-600 sticky bottom-0 flex items-center justify-center">
                <Pagination
                    total={1000}
                    pageSize={20}
                    locale={PaginationLocale}
                    prevIcon={<i className="fi fi-rr-arrow-left text-lg"></i>}
                    nextIcon={<i className="fi fi-rr-arrow-right text-lg"></i>}
                />
            </div>
            <div className="fixed z-[1000] bottom-[70px] right-7 w-[140px] h-[55px]">
                <ExternalScroll target={tableBody} />
            </div>
        </>
    );
}

export default FormDataTable;
