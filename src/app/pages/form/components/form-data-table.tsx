import moment from "moment";
import Pagination from "rc-pagination";
import Switch from "rc-switch";
import Table from "rc-table";
import { ColumnsType, TableSticky } from "rc-table/lib/interface";
import Tooltip from "rc-tooltip";
import { FC, ReactNode, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import confirm from "../../../components/common/confirm/confirm";
import ExternalScroll from "../../../components/common/external-scroll";
import Drawer from "../../../components/drawer/drawer";
import FormDataViewer from "../../../components/form-data-viewer";
import ButtonTableAction from "../../../components/layout/button-table-action";
import { PaginationLocale } from "../../../constants/pagination-locale";
import FieldUtil from "../../../features/form-builder/utils/field-util";
import useArchiveSubmission from "../../../hooks/submissions/useArchiveSubmission";
import useSubmissions from "../../../hooks/submissions/useSubmissions";
import { Form, FormField } from "../../../models/form";
import { FormSubmission } from "../../../models/form-submission";
import { showError } from "../../../util/common";
import FormDataEditDrawer from "./form-data-edit-drawer";

type ColumnWidth = {
    index: number;
    id: number;
    user: number;
    dateTime: number;
    action: number;
    data: number;
}

const ColumnWidthConfig: ColumnWidth = {
    index: 45,
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
    pageSize?: number;
}

const FormDataTable: FC<Props> = ({ form, sticky, pageSize = 25 }) => {

    const [tableBody, setTableBody] = useState<HTMLElement>();
    const [page, setPage] = useState(0);
    const { data: formData, refetch } = useSubmissions({ formCode: form?.code, page, size: pageSize });
    const [selectedSubmission, setSelectedSubmission] = useState<FormSubmission>();
    const [submissionVisible, setSubmissionVisible] = useState(false);
    const [showContentBlocks, setShowContentBlocks] = useState(false);
    const [editSubmissionVisible, setEditSubmissionVisible] = useState(false);
    const {mutateAsync: archiveSubmission} = useArchiveSubmission();

    const valueOf = (field: FormField, record: any): ReactNode => {
        if (!record) {
            return;
        }
        const rawValue = record?.data[field.code];
        if (field.type === 'MultipleChoice' || field.type === 'Dropdown') {
            const selectedValues = (rawValue || []) as any[];
            const selected = (field.options || []).filter(option => selectedValues?.includes(option.code));
            return selected?.map((item, index) =>
                <span key={index} className="mr-1 my-0.5 px-2 inline-block bg-slate-200 dark:bg-cinder-600 rounded-xl">
                    {item.label}
                </span>
            )
        }
        if (field.type === 'Switch') {
            return (
                <>
                    {rawValue && <i className="fi fi-sr-checkbox text-xs"></i>}
                </>
            )
        }
        if (field.type === 'Rating') {
            return (
                <>
                    {rawValue && <>{rawValue} / 5</>}
                </>
            )
        }
        if (field.type === 'OpinionScale') {
            return (
                <>
                    {(rawValue || rawValue === 0) && <>{rawValue} / 10</>}
                </>
            )
        }
        return rawValue;
    }

    const alignOf = (field: FormField): any => {
        if (['Switch', 'Rating', 'OpinionScale'].includes(field.type)) {
            return 'center';
        }
    }

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
            if (!section.fields || section.fields.length === 0) {
                continue;
            }

            const field = section.fields[0];
            if (section.type === 'Single' && FieldUtil.isFormControl(field)) {
                const column: ColumnsType<FormSubmission> = [{
                    title: field.title,
                    dataIndex: field.code,
                    ellipsis: { showTitle: false },
                    align: alignOf(field),
                    render(value, record, index) {
                        const fieldValue = valueOf(field, record);
                        return (
                            <Tooltip
                                placement="bottomLeft"
                                overlay={<div className="max-w-[350px]">{fieldValue}</div>}
                                mouseEnterDelay={0.5}
                                showArrow={false}
                            >
                                <div className="text-ellipsis overflow-hidden">{fieldValue}</div>
                            </Tooltip>
                        );
                    }
                }]
                const [dataColumn] = column;
                columns.push(dataColumn);
            }

            if (section.type === 'Group') {
                const column: ColumnsType<FormSubmission> = [{
                    title: section.title || 'Untitled group',
                    dataIndex: section.code,
                    align: 'center',
                    ellipsis: { showTitle: false },
                    render(value, record, index) {
                        return (
                            <span className="px-1 py-0 rounded-lg bg-slate-200 dark:bg-cinder-600 cursor-default">
                                {record?.data[section.code]?.length || 0}
                            </span>
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
                return (index + 1) + page * pageSize
            },
        },
        {
            title: 'ID',
            dataIndex: 'code',
            align: 'center',
            width: ColumnWidthConfig.id,
            render: (value, record, index) => {
                return (
                    <span
                        onClick={() => selectSubmission(record)}
                        className="text-xs bg-slate-200 dark:bg-cinder-600 inline-block px-1 py-0.5 min-w-[75px] rounded cursor-pointer"
                    >
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
                        <ButtonTableAction onClick={() => selectEditSubmission(record)}>
                            <i className="fi fi-rr-pencil"></i>
                        </ButtonTableAction>
                        <ButtonTableAction danger onClick={() => showArchiveConfirm(record)}>
                            <i className="fi fi-rr-trash"></i>
                        </ButtonTableAction>
                    </div>
                )
            },
            fixed: 'right',
            align: 'center'
        }
    ];

    const onPageChange = (page: number) => {
        setPage(page - 1);
    }

    const selectSubmission = (submission: FormSubmission) => {
        setSelectedSubmission(submission);
        setSubmissionVisible(true);
    }

    const selectEditSubmission = (submission: FormSubmission) => {
        setSelectedSubmission(submission);
        setEditSubmissionVisible(true);
    }

    const closeSubmission = () => {
        setSubmissionVisible(false);
    }

    const afterOpenChange = (visible: boolean) => {
        if (!visible) {
            setSelectedSubmission(undefined);
        }
    }

    const closeEditSubmission = () => {
        setEditSubmissionVisible(false);
        refetch();
    }

    const confirmArchive = (submissionCode: string): Promise<any> => {
        return archiveSubmission(submissionCode, {
            onError: showError,
            onSuccess: () => toast.success("Deleted submission successfully!")
        }).finally(refetch)
    }

    const showArchiveConfirm = (submission: FormSubmission) => {
        confirm({
            title: 'Confirm',
            content: 'Are you sure to delete this submission?',
            onOkAsync: () => confirmArchive(submission.code)
        })
    }

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
                    total={formData?.totalElements || 0}
                    pageSize={formData?.size || 0}
                    locale={PaginationLocale}
                    onChange={onPageChange}
                    current={page + 1}
                    prevIcon={<i className="fi fi-rr-arrow-left text-lg"></i>}
                    nextIcon={<i className="fi fi-rr-arrow-right text-lg"></i>}
                />
            </div>
            <ExternalScroll target={tableBody} />

            <Drawer
                title={
                    <div className="w-full flex justify-between items-center">
                        <span>{selectedSubmission?.code}</span>
                        <label className="text-xs font-normal flex items-center gap-2 cursor-pointer">
                            Show content blocks <Switch checked={showContentBlocks} onChange={setShowContentBlocks} />
                        </label>
                    </div>
                }
                onClose={closeSubmission}
                open={submissionVisible}
                afterOpenChange={afterOpenChange}
                width={600}
            >
                <div>
                    <FormDataViewer form={form} submission={selectedSubmission} showContentBlocks={showContentBlocks} />
                </div>
            </Drawer>
            <FormDataEditDrawer
                visible={editSubmissionVisible}
                onClose={closeEditSubmission}
                form={form}
                submission={selectedSubmission}
            />
        </>
    );
}

export default FormDataTable;
