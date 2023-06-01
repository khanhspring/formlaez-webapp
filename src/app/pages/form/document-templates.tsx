import { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import confirm from "../../components/common/confirm/confirm";
import DocumentTemplateItem from "../../components/common/document-template-item";
import Empty from "../../components/common/empty";
import ButtonAction from "../../components/layout/button-action";
import PageTitle from "../../components/layout/page-title";
import useDocumentTemplates from "../../hooks/document-template/useDocumentTemplates";
import useRemoveDocumentTemplate from "../../hooks/document-template/useRemoveDocumentTemplate";
import useForm from "../../hooks/form/useForm";
import { DocumentTemplate } from "../../models/document-template";
import { showErrorIgnore403 } from "../../util/common";
import { firstLetters } from "../../util/string-utils";
import CreateDocumentTemplateModal from "./components/create-document-template-modal";
import DocumentTemplateDetailModal from "./components/document-template-detail-modal";
import FormPageMenu from "./components/form-page-menu";
import FormPageTitle from "./components/form-page-title";
import FormPageTitlePrefix from "./components/form-page-title-prefix";
import UpdateDocumentTemplateModal from "./components/update-document-template-modal";
import { PlusIcon } from "@heroicons/react/24/outline";

function DocumentTemplates() {

    const [createModalVisible, setCreateModelVisible] = useState(false);
    const [detailVisible, setDetailVisible] = useState(false);
    const [updateVisible, setUpdateVisible] = useState(false);
    const [selectedTemplate, setSelectedTemplate] = useState<DocumentTemplate>();

    const { mutateAsync: remove } = useRemoveDocumentTemplate();

    const params = useParams();
    const { data: form } = useForm(params.formCode);
    const { data: pages, refetch, isLoading } = useDocumentTemplates({ formId: form?.id, size: -1 });

    const showCreateModal = () => {
        setCreateModelVisible(true);
    }

    const closeCreateModal = () => {
        setCreateModelVisible(false);
    }

    const showDetail = (document: DocumentTemplate) => {
        setSelectedTemplate(document);
        setDetailVisible(true);
    }

    const closeDetail = () => {
        setSelectedTemplate(undefined);
        setDetailVisible(false);
    }

    const showUpdate = (document: DocumentTemplate) => {
        setSelectedTemplate(document);
        setUpdateVisible(true);
    }

    const closeUpdate = () => {
        setSelectedTemplate(undefined);
        setUpdateVisible(false);
    }

    const confirmRemove = (id: number) => {
        return remove(id, {
            onError: (e) => showErrorIgnore403(e),
            onSuccess: () => {
                toast.success("Deleted template successfully!");
                refetch();
            }
        })
    }

    const showConfirmRemove = (template: DocumentTemplate) => {
        confirm({
            title: 'Confirm',
            content: 'Are you sure you want to delete this template?',
            onOkAsync: () => confirmRemove(template.id)
        })
    }

    const isEmpty = !isLoading && pages?.totalElements === 0

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
                        <span>Total {pages?.totalElements || 0}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <ButtonAction onClick={showCreateModal} shape="circle">
                            <PlusIcon className="w-6 h-6"/>
                        </ButtonAction>
                    </div>
                </div>

                {
                    isEmpty &&
                    <div className="flex-1 flex items-center justify-center">
                        <Empty description="No data" />
                    </div>
                }

                <div className="grid gap-5 grid-cols-1 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 mt-6">
                    {
                        pages?.content?.map((item, index) => (
                            <DocumentTemplateItem
                                documentTemplate={item}
                                key={index}
                                onClick={() => showDetail(item)}
                                onEdit={() => showUpdate(item)}
                                onDelete={() => showConfirmRemove(item)}
                            />
                        ))
                    }
                </div>
            </div>
            {
                form &&
                <CreateDocumentTemplateModal
                    visible={createModalVisible}
                    onClose={closeCreateModal}
                    refetch={refetch}
                    form={form}
                />
            }
            {
                selectedTemplate &&
                <UpdateDocumentTemplateModal
                    visible={updateVisible}
                    onClose={closeUpdate}
                    documentTemplate={selectedTemplate}
                    refetch={refetch}
                />
            }
            {
                selectedTemplate &&
                <DocumentTemplateDetailModal
                    visible={detailVisible}
                    onClose={closeDetail}
                    documentTemplate={selectedTemplate}
                />
            }
        </>
    );
}

export default DocumentTemplates;
