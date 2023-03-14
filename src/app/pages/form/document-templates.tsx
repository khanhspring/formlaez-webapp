import { useState } from "react";
import { useParams } from "react-router-dom";
import DocumentTemplateItem from "../../components/common/document-template-item";
import Empty from "../../components/common/empty";
import ButtonAction from "../../components/layout/button-action";
import PageTitle from "../../components/layout/page-title";
import useDocumentTemplates from "../../hooks/document-template/useDocumentTemplates";
import useForm from "../../hooks/form/useForm";
import { DocumentTemplate } from "../../models/document-template";
import CreateDocumentTemplateModal from "./components/create-document-template-modal";
import DocumentTemplateDetailModal from "./components/document-template-detail-modal";
import FormPageMenu from "./components/form-page-menu";

function DocumentTemplates() {
    const [createModalVisible, setCreateModelVisible] = useState(false);
    const [detailVisible, setDetailVisible] = useState(false);
    const [selectedTemplate, setSelectedTemplate] = useState<DocumentTemplate>();

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

    const isEmpty = !isLoading && pages?.totalElements === 0

    return (
        <>
            <div className="w-full flex flex-col gap-2">
                <PageTitle title="Hồ sơ lao động" actions={<FormPageMenu />} />
                <div className="flex items-center justify-between min-h-[40px] mt-3">
                    <div className="flex items-center gap-3">
                        <span>Total {pages?.totalElements || 0}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <ButtonAction onClick={showCreateModal}>
                            <i className="fi fi-rr-plus"></i>
                        </ButtonAction>
                    </div>
                </div>

                {
                    isEmpty &&
                    <div className="mt-6">
                        <Empty description="No data" />
                    </div>
                }

                <div className="grid gap-5 grid-cols-1 2xl:grid-cols-4 xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 mt-6">
                    {
                        pages?.content?.map((item, index) => (
                            <DocumentTemplateItem documentTemplate={item} key={index} onClick={() => showDetail(item)} />
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
