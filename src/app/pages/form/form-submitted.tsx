import * as _ from "lodash";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "../../components/common/button";
import DocumentTemplatePublicItem from "../../components/common/document-template-public-item";
import useDocumentTemplatesByFormId from "../../hooks/document-template/useDocumentTemplatesByFormId";
import usePublishedForm from "../../hooks/form/usePublishedForm";
import useMergeSubmittedDocument from "../../hooks/submissions/useMergeSubmittedDocument";
import { DocumentTemplate } from "../../models/document-template";
import { MergeDocumentRequest } from "../../models/form-submission";

const defaultContent = (
    <>
        <p>Thanks for completing this form.</p>
        <p>Now create your own — it's free, easy, & beautiful</p>
    </>
)

function FormSubmitted() {

    const params = useParams();
    const { data: form } = usePublishedForm(params.formCode);
    const { data: templates } = useDocumentTemplatesByFormId(form?.id, !!form?.allowPrinting);
    const { mutateAsync: mergeDocument } = useMergeSubmittedDocument();

    const downloadDocument = (template: DocumentTemplate) => {
        if (!params.submissionCode) {
            return;
        }

        const request: MergeDocumentRequest = {
            code: params.submissionCode,
            templateId: template.id,
            fileName: template.title + ".docx"
        }
        const mergeDocumentPromise = mergeDocument(request)

        toast.promise(
            mergeDocumentPromise,
            {
                pending: 'Merging...',
                success: 'Merged successfully!',
                error: 'There was an error has ocurred. Please try again!'
            }
        )
    }

    const hasTemplates = !_.isEmpty(templates);

    return (
        <div className="w-full min-h-screen flex flex-col">
            <div className="flex-1 container max-w-[550px] m-auto flex flex-col items-center mt-28">
                <h1 className="text-4xl font-bold text-center">{form?.title}</h1>
                <div className="w-full text-center mt-10 text-xl">
                    {
                        !form?.ending?.content &&
                        <>{defaultContent}</>
                    }
                    {
                        !!form?.ending?.content &&
                        <div className="w-full whitespace-pre-line leading-8">
                            {form?.ending?.content}
                        </div>
                    }
                </div>

                {
                    hasTemplates &&
                    <div className="grid grid-cols-2 gap-4 py-3 mt-10">
                        {
                            templates?.map((item, index) =>
                                <DocumentTemplatePublicItem
                                    documentTemplate={item}
                                    key={index}
                                    onClick={() => downloadDocument(item)}
                                />
                            )
                        }
                    </div>
                }

                <div className="flex justify-center mt-10">
                    {
                        !form?.ending?.hideButton &&
                        <Link to={"/"} target="_blank">
                            <Button className="gap-4 px-4">
                                <span className="text-lg">Create a form now</span>
                                <i className="fi fi-rr-arrow-right text-xl"></i>
                            </Button>
                        </Link>
                    }
                </div>
            </div>
            <div className="w-full flex justify-center mt-10">
                <div className="mx-auto h-10 flex items-center justify-center gap-2 dark:text-gray-300 text-xs">
                    <span>2023©</span>
                    <a href="https://formlaez.com" rel="noreferrer" target="_blank" className="hover:text-sky-500">Formlaez.com</a>
                </div>
            </div>
        </div>
    );
}

export default FormSubmitted;
