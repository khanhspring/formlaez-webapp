import RcForm from 'rc-field-form';
import { FC } from 'react';
import Loading from '../../../components/common/loading';
import Modal from "../../../components/common/modal";
import useAttachmentDownloadUrl from '../../../hooks/attachment/useAttachmentDownloadUrl';
import { DocumentTemplate } from '../../../models/document-template';

type Props = {
    documentTemplate: DocumentTemplate;
    visible: boolean;
    onClose: () => void;
}
const DocumentTemplateDetailModal: FC<Props> = ({ documentTemplate, visible, onClose }) => {

    const { data: presignedUrl } = useAttachmentDownloadUrl(documentTemplate?.attachmentCode);

    const encodedUrl = presignedUrl && encodeURIComponent(presignedUrl?.url);

    return (
        <Modal
            visible={visible}
            onClose={onClose}
            title={documentTemplate.title}
            hideOk
            hideCancel
            width={800}
            wrapClassName="pt-0"
        >
            <div className='flex min-h-[calc(100vh_-_140px)] w-full'>
                {
                    presignedUrl &&
                    <iframe
                        title={documentTemplate.title}
                        src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodedUrl}`}
                        width="100%"
                    ></iframe>
                }
                {
                    !presignedUrl &&
                    <Loading center />
                }
            </div>
        </Modal>
    );
}

export default DocumentTemplateDetailModal;
