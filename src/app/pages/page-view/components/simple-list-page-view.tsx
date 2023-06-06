import { FC, useState } from "react";
import usePageViewData from "../../../hooks/page-views/usePageViewData";
import { PageView } from "../../../models/page-view";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid";

type Props = {
    pageView: PageView;
}

const SimpleListPageView: FC<Props> = ({ pageView }) => {

    const [page, setPage] = useState(0);
    const { data } = usePageViewData({ pageViewCode: pageView.code, page: page, size: 20 });

    const prevPage = () => {
        if (!data) {
            return;
        }
        if (page > 0) {
            setPage(page - 1);
        }
    }

    const nextPage = () => {
        if (!data) {
            return;
        }
        if (page < data.totalPages - 1) {
            setPage(page + 1);
        }
    }

    return (
        <div className="w-full max-w-2xl m-auto py-10">
            <div className="mb-7">
                <h1 className="font-semibold text-lg">{pageView.title}</h1>
                {
                    pageView.description &&
                    <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-200">{pageView.description}</p>
                }
            </div>
            <div className="w-full grid grid-cols-1 gap-4">
                {
                    data?.content.map((item, index) => (
                        <SimpleListPageViewItem
                            key={index}
                            pageView={pageView}
                            data={item}
                        />
                    ))
                }
            </div>
            {
                data?.totalPages && data?.totalPages > 1 &&
                <div className="flex items-center justify-between mt-5">
                    <div
                        className={
                            `flex items-center gap-1 transition`
                            + ` ${page <= 0 ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:text-blue-500'}`
                        }
                        onClick={prevPage}
                    >
                        <ArrowLeftIcon className="w-5 h-5" />
                        <span>Previous page</span>
                    </div>
                    <div
                        className={
                            `flex items-center gap-1 transition`
                            + ` ${page >= data.totalPages - 1 ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:text-blue-500'}`
                        }
                        onClick={nextPage}
                    >
                        <span>Next page</span>
                        <ArrowRightIcon className="w-5 h-5" />
                    </div>
                </div>
            }
        </div>
    )
}

type ItemProps = {
    pageView: PageView;
    data: any;
}

const SimpleListPageViewItem: FC<ItemProps> = ({ pageView, data }) => {


    const titleField = pageView.listingFields.find(item => item.fieldCode === 'title')?.targetFieldCode || '';
    const titleUrlField = pageView.listingFields.find(item => item.fieldCode === 'titleUrl')?.targetFieldCode || '';
    const descriptionField = pageView.listingFields.find(item => item.fieldCode === 'description')?.targetFieldCode || '';
    const statusField = pageView.listingFields.find(item => item.fieldCode === 'status')?.targetFieldCode || '';

    let status = undefined;
    if (Array.isArray(data[statusField]) && (data[statusField] as Array<any>).length > 0) {
        status = (data[statusField] as Array<any>)[0];
    }

    return (
        <div className="bg-zinc-100 dark:bg-steel-gray-900 shadow hover:shadow-sm transition px-5 py-4 rounded">
            <div className="flex items-center justify-between">
                <h2 className="font-semibold text-base mb-1">
                    <a href={data[titleUrlField] || '#'} className="hover:underline" target="_blank" rel="noreferrer">{data[titleField]}</a>
                </h2>
                {
                    status &&
                    <span className="rounded-xl flex items-center px-2 py-0.5 text-xs bg-slate-600 text-white" style={status.bgColor ? {backgroundColor: status.bgColor} : {}}>
                        {status['label']}
                    </span>
                }
            </div>
            <p className="text-sm text-zinc-500 dark:text-zinc-200">{data[descriptionField]}</p>
        </div>
    )
}

export default SimpleListPageView;