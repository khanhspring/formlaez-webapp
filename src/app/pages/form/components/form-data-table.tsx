import moment from "moment";
import Dropdown from "rc-dropdown";
import Menu, { MenuItem } from "rc-menu";
import Pagination from "rc-pagination";
import Switch from "rc-switch";
import Table from "rc-table";
import { ColumnsType, TableSticky } from "rc-table/lib/interface";
import Tooltip from "rc-tooltip";
import { FC, ReactNode, useEffect, useMemo, useState } from "react";
import { Link, useParams, useRouteLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import confirm from "../../../components/common/confirm/confirm";
import ExternalScroll from "../../../components/common/external-scroll";
import Drawer from "../../../components/drawer/drawer";
import FormDataViewer from "../../../components/form-data-viewer";
import ButtonAction from "../../../components/layout/button-action";
import ButtonTableAction from "../../../components/layout/button-table-action";
import { PaginationLocale } from "../../../constants/pagination-locale";
import FieldUtil from "../../../features/form-builder/utils/field-util";
import useArchiveSubmission from "../../../hooks/submissions/useArchiveSubmission";
import useExportSubmissions from "../../../hooks/submissions/useExportSubmissions";
import useSubmissions from "../../../hooks/submissions/useSubmissions";
import { Form, FormField } from "../../../models/form";
import { ExportFormSubmissionRequest, FormSubmission } from "../../../models/form-submission";
import { Workspace } from "../../../models/workspace";
import { showErrorIgnore403 } from "../../../util/common";
import FormDataEditDrawer from "./form-data-edit-drawer";
import MergeDocumentModal from "./merge-document-modal";

type ColumnWidth = {
    index: number;
    id: number;
    user: number;
    dateTime: number;
    action: number;
    data: number;
}

const ColumnWidthConfig: ColumnWidth = {
    index: 40,
    id: 90,
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

const DateRangeLabels = {
    anyTime: 'Any time',
    pastHour: 'Past hour',
    past24Hours: 'Past 24 hours',
    pastWeek: 'Past week',
    pastMonth: 'Past month',
    pastYear: 'Past year',
}

type DateRange = 'anyTime' | 'pastHour' | 'past24Hours' | 'pastWeek' | 'pastMonth' | 'pastYear';

type Props = {
    form?: Form;
    sticky?: boolean | TableSticky;
    pageSize?: number;
    fullscreen?: boolean;
}

const FormDataTable: FC<Props> = ({ form, sticky, pageSize = 25, fullscreen }) => {

    const workspace = useRouteLoaderData("workspace") as Workspace;
    const params = useParams();

    const [tableBody, setTableBody] = useState<HTMLElement>();
    const [page, setPage] = useState(0);
    const [fromDate, setFromDate] = useState<Date>();
    const [toDate, setToDate] = useState<Date>();
    const { data: formData, refetch, isLoading, isFetching } = useSubmissions({ formCode: form?.code, fromDate, toDate, page, size: pageSize });
    const [selectedSubmission, setSelectedSubmission] = useState<FormSubmission>();
    const [submissionVisible, setSubmissionVisible] = useState(false);
    const [showContentBlocks, setShowContentBlocks] = useState(false);
    const [editSubmissionVisible, setEditSubmissionVisible] = useState(false);
    const [documentMergeVisible, setDocumentMergeVisible] = useState(false);
    const { mutateAsync: archiveSubmission } = useArchiveSubmission();
    const { mutateAsync: exportCsv, isLoading: isExporting } = useExportSubmissions();
    const [reloading, setReloading] = useState(false);
    const [dateRangeSelected, setDateRangeSelected] = useState<DateRange>('anyTime');

    let urlPrefix = undefined;
    if (form?.scope === 'Private') {
        urlPrefix = `${workspace?.code}/p`;
    }
    if (form?.scope === 'Team') {
        urlPrefix = `${workspace?.code}/t/${form.team?.code}`;
    }

    const valueOf = (field: FormField, record: any): ReactNode => {
        if (!record) {
            return;
        }
        const rawValue = record?.data[field.code];
        if (field.type === 'MultipleChoice' || field.type === 'Dropdown') {
            const selectedValues = (rawValue || []) as any[];
            const selected = (field.options || []).filter(option => selectedValues?.includes(option.code));
            return selected?.map((item, index) =>
                <span key={index} className="mr-1 my-0.5 px-2 inline-block bg-slate-200 dark:bg-slate-600 rounded-xl">
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
        if (field.type === 'Signature') {
            return (
                <>
                    {rawValue && <i className="fi fi-rr-attribution-pencil"></i>}
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
                            <span className="px-1 py-0 rounded-lg bg-slate-200 dark:bg-slate-600 cursor-default">
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
                        className="text-xs bg-zinc-200 dark:bg-steel-gray-800 inline-block px-1 py-0.5 min-w-[75px] rounded cursor-pointer"
                    >
                        {value.substring(0, 8)}
                    </span>
                )
            },
        },
        {
            title: 'Submitter',
            dataIndex: 'user',
            width: ColumnWidthConfig.user,
            render: (value, record, index) => {
                if (record.createdBy) {
                    return record.createdBy?.firstName + ' ' + record.createdBy?.lastName;
                }
                return (
                    <span className="flex items-center gap-1 opacity-50">
                        <i className="fi fi-rr-incognito"></i>
                        Anonymous
                    </span>
                )
            },
        },
        {
            title: 'Submitted date',
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
                        <ButtonTableAction onClick={() => showDocumentMerge(record)}>
                            <i className="fi fi-rr-print"></i>
                        </ButtonTableAction>
                        <ButtonTableAction onClick={() => selectEditSubmission(record)} disabled={form?.status === 'Archived'}>
                            <i className="fi fi-rr-pencil"></i>
                        </ButtonTableAction>
                        <ButtonTableAction danger onClick={() => showArchiveConfirm(record)} disabled={form?.status === 'Archived'}>
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
        setSelectedSubmission(undefined);
    }

    const afterOpenChange = (visible: boolean) => {
        if (!visible) {
            setSelectedSubmission(undefined);
        }
    }

    const closeEditSubmission = () => {
        setEditSubmissionVisible(false);
        setSelectedSubmission(undefined);
        refetch();
    }

    const confirmArchive = (submissionCode: string): Promise<any> => {
        return archiveSubmission(submissionCode, {
            onError: (e) => showErrorIgnore403(e),
            onSuccess: () => toast.success("Deleted submission successfully!")
        }).finally(refetch)
    }

    const showArchiveConfirm = (submission: FormSubmission) => {
        confirm({
            title: 'Confirm',
            content: 'Are you sure you want to delete this submission?',
            onOkAsync: () => confirmArchive(submission.code)
        })
    }

    const showDocumentMerge = (submission: FormSubmission) => {
        setSelectedSubmission(submission);
        setDocumentMergeVisible(true);
    }

    const closeDocumentMerge = () => {
        setSelectedSubmission(undefined);
        setDocumentMergeVisible(false);
    }

    const columns: ColumnsType<FormSubmission> = [...defaultColumns, ...dataColumns, ...actionColumns];
    const tableWidth = calculateTableWidth(dataColumns?.length || 0);

    const handleExport = () => {
        if (!form) {
            return;
        }
        const request: ExportFormSubmissionRequest = {
            formCode: form?.code,
            fileName: form.title + '.csv',
        }
        const exportCsvPromise = exportCsv(request);
        toast.promise(
            exportCsvPromise,
            {
                pending: 'Exporting...',
                success: 'Exported submissions successfully!',
                error: 'There was an error has ocurred. Please try again!'
            }
        )
    }

    const onReloading = () => {
        setReloading(true);
        refetch();
        setTimeout(() => {
            setReloading(false);
        }, 1000)
    }

    if (!form) {
        return <></>
    }

    const onDateRangeClick = ({ key }: { key: any }) => {
        const dateRangeSelected: DateRange = key;
        setDateRangeSelected(dateRangeSelected);

        switch (dateRangeSelected) {
            case 'anyTime': {
                setFromDate(undefined);
                setToDate(undefined);
                break;
            }
            case 'pastHour': {
                setFromDate(moment().subtract(1, 'hour').toDate());
                break;
            }
            case 'past24Hours': {
                setFromDate(moment().subtract(24, 'hours').toDate());
                break;
            }
            case 'pastWeek': {
                setFromDate(moment().subtract(7, 'weeks').toDate());
                break;
            }
            case 'pastMonth': {
                setFromDate(moment().subtract(1, 'month').toDate());
                break;
            }
            case 'pastYear': {
                setFromDate(moment().subtract(1, 'year').toDate());
                break;
            }
        }
    }

    const dateRange = (
        <Menu className="text-sm" onClick={onDateRangeClick}>
            <MenuItem key="anyTime">
                <span>Any time</span>
            </MenuItem>
            <MenuItem key="pastHour">
                <span>Past hour</span>
            </MenuItem>
            <MenuItem key="past24Hours">
                <span>Past 24 hours</span>
            </MenuItem>
            <MenuItem key="pastWeek">
                <span>Past week</span>
            </MenuItem>
            <MenuItem key="pastMonth">
                <span>Past month</span>
            </MenuItem>
            <MenuItem key="pastYear">
                <span>Past year</span>
            </MenuItem>
        </Menu>
    )

    return (
        <>
            <div className="flex items-center justify-between min-h-[40px] mt-3">
                <div className="flex items-center gap-3">
                    <span>Total {formData?.totalElements || 0}</span>
                    <Dropdown overlay={dateRange} trigger={['click']} placement="bottomRight">
                        <div className="hidden md:flex gap-2 py-1.5 px-3 cursor-pointer bg-slate-50 dark:bg-steel-gray-900 rounded items-center justify-center border border-slate-900/10 dark:border-steel-gray-800">
                            <i className="fi fi-rr-calendar text-xs text-gray-500"></i>
                            <span className="text-sm">
                                {DateRangeLabels[dateRangeSelected]}
                            </span>
                        </div>
                    </Dropdown>
                </div>
                <div className="flex items-center gap-2">
                    {
                        form?.status !== 'Archived' &&
                        <Tooltip overlay="Open form in new tab" placement='bottom'>
                            <Link to={`/f/v/${params.formCode}`} target="_blank">
                                <ButtonAction>
                                    <i className="fi fi-rr-arrow-up-right-from-square"></i>
                                </ButtonAction>
                            </Link>
                        </Tooltip>
                    }
                    <Tooltip overlay="Export" placement='bottom'>
                        <ButtonAction onClick={handleExport} disabled={isExporting}>
                            <i className="fi fi-rr-cloud-download-alt"></i>
                        </ButtonAction>
                    </Tooltip>
                    <Tooltip overlay="Reload database" placement='bottom'>
                        <ButtonAction onClick={onReloading} disabled={isLoading || isFetching || reloading}>
                            <i className={`fi fi-rr-rotate-right ${isFetching || reloading ? 'animate-spin' : ''}`}></i>
                        </ButtonAction>
                    </Tooltip>
                    {
                        !fullscreen &&
                        <Tooltip overlay="Fullscreen" placement='bottom'>
                            <Link to={`/${urlPrefix}/f/${params.formCode}/full`}>
                                <ButtonAction>
                                    <i className="fi fi-rr-expand"></i>
                                </ButtonAction>
                            </Link>
                        </Tooltip>
                    }
                    {
                        fullscreen &&
                        <Tooltip overlay="Exit" placement='bottom'>
                            <Link to={`/${urlPrefix}/f/${params.formCode}`}>
                                <ButtonAction>
                                    <i className="fi fi-rr-compress"></i>
                                </ButtonAction>
                            </Link>
                        </Tooltip>
                    }
                </div>
            </div>
            <div className="mt-6">
                <Table
                    columns={columns}
                    data={formData?.content}
                    tableLayout={'fixed'}
                    rowKey={'id'}
                    scroll={{
                        x: tableWidth,
                    }}
                    sticky={sticky}
                    emptyText={isLoading || isFetching ? 'Loading...' : 'No data'}
                    className="table-form-data text-slate-900 dark:text-white"
                />
                <div className="w-full mt-3 p-0.5 z-[200] bg-white/90 border border-slate-900/10 dark:bg-steel-gray-900/60 dark:border-steel-gray-900 backdrop-blur supports-backdrop-blur:bg-white/80 sticky bottom-0 flex items-center justify-center">
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
                            <span>Submission detail</span>
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
                <MergeDocumentModal
                    visible={documentMergeVisible}
                    form={form}
                    onClose={closeDocumentMerge}
                    submission={selectedSubmission}
                />
            </div>
        </>
    );
}

export default FormDataTable;
