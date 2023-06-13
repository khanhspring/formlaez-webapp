import { PlusIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Empty from "../../components/common/empty";
import PageViewItem from "../../components/common/page-view-item";
import ButtonAction from "../../components/layout/button-action";
import PageTitle from "../../components/layout/page-title";
import useFormDetail from "../../hooks/form/useFormDetail";
import usePageViews from "../../hooks/page-views/usePageViews";
import { firstLetters } from "../../util/string-utils";
import CreatePageViewDetailModal from "./components/create-page-view-detail-modal";
import CreatePageViewModal from "./components/create-page-view-modal";
import FormPageMenu from "./components/form-page-menu";
import FormPageTitle from "./components/form-page-title";
import FormPageTitlePrefix from "./components/form-page-title-prefix";
import usePublishPageView from "../../hooks/page-views/usePublishPageView";
import { showError } from "../../util/common";
import { toast } from "react-toastify";
import useUnPublishPageView from "../../hooks/page-views/useUnPublishPageView";
import confirm from "../../components/common/confirm/confirm";
import useRemovePageView from "../../hooks/page-views/useRemovePageView";
import UpdatePageViewDetailModal from "./components/update-page-view-detail-modal";
import { PageView } from "../../models/page-view";

function PageViews() {

    const params = useParams();
    const { data: form } = useFormDetail(params.formCode);
    const { data: pageViews, isLoading, refetch } = usePageViews(form?.id);
    const { mutateAsync: publish } = usePublishPageView();
    const { mutateAsync: unPublish } = useUnPublishPageView();
    const { mutateAsync: remove } = useRemovePageView();

    const [createModalVisible, setCreateModalVisible] = useState(false);
    const [detailModalVisible, setDetailModalVisible] = useState(false);
    const [selectedTemplateCode, setSelectedTemplateCode] = useState<string>();
    const [updateModalVisible, setUpdateModalVisible] = useState(false);
    const [selectedPageView, setSelectedPageView] = useState<PageView>();

    const isEmpty = !isLoading && pageViews?.length === 0;

    const onSelectTemplate = (code: string) => {
        setCreateModalVisible(false);
        setDetailModalVisible(true);
        setSelectedTemplateCode(code);
    }

    const onPublish = (id: number) => {
        publish(id, {
            onError: showError,
            onSuccess: () => {
                toast.success("Published page view successfully!");
                refetch();
            }
        })
    }

    const onUnPublish = (id: number) => {
        unPublish(id, {
            onError: showError,
            onSuccess: () => {
                toast.success("UnPublished page view successfully!");
                refetch();
            }
        })
    }

    const handleDelete = (id: number) => {
        remove(id, {
            onError: showError,
            onSuccess: () => {
                toast.success("Deleted page view successfully!");
                refetch();
            }
        })
    }

    const onDelete = (id: number) => {
        confirm({
            title: 'Confirm',
            content: 'Are you sure you want to delete this?',
            onOk: () => handleDelete(id),
        })
    }

    const onEdit = (pageView: PageView) => {
        setSelectedPageView(pageView);
        setUpdateModalVisible(true);
    }

    return (
        <>
            <div className="flex-1 w-full flex flex-col gap-2">
                <PageTitle
                    title={<FormPageTitle form={form} />}
                    actions={<FormPageMenu form={form} />}
                    shortTitle={firstLetters(form?.title)?.toUpperCase()}
                    prefix={<FormPageTitlePrefix form={form} />}
                />
                <div className="flex items-center justify-between min-h-[40px] mt-3">
                    <div className="flex items-center gap-3">
                        <span>Total {pageViews?.length || 0}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <ButtonAction shape="circle" onClick={() => setCreateModalVisible(true)}>
                            <PlusIcon className="w-6 h-6" />
                        </ButtonAction>
                    </div>
                </div>

                {
                    isEmpty &&
                    <div className="flex-1 flex items-center justify-center">
                        <Empty description="No page views" />
                    </div>
                }

                <div className="grid gap-5 grid-cols-1 3xl:grid-cols-4 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 mt-6">
                {
                        pageViews?.map((item, index) => (
                            <PageViewItem
                                pageView={item}
                                key={index}
                                onPublish={() => onPublish(item.id)}
                                onUnPublish={() => onUnPublish(item.id)}
                                onDelete={() => onDelete(item.id)}
                                onEdit={() => onEdit(item)}
                            />
                        ))
                    }
                </div>
            </div>
            {
                form &&
                <CreatePageViewModal
                    visible={createModalVisible}
                    onClose={() => setCreateModalVisible(false)}
                    form={form}
                    onSelect={onSelectTemplate}
                />
            }
            {
                form && selectedTemplateCode &&
                <CreatePageViewDetailModal
                    visible={detailModalVisible}
                    onClose={() => setDetailModalVisible(false)}
                    form={form}
                    templateCode={selectedTemplateCode}
                    onSuccess={refetch}
                />
            }
            {
                form && selectedPageView &&
                <UpdatePageViewDetailModal
                    visible={updateModalVisible}
                    pageView={selectedPageView}
                    form={form}
                    onSuccess={refetch}
                    onClose={() => setUpdateModalVisible(false)}
                />
            }
        </>
    );
}

export default PageViews;
