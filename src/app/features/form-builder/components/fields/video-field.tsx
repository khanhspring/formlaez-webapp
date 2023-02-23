import Form, { useForm } from "rc-field-form";
import { Popup } from "ez-rc-popup";
import { FC, useState } from "react";
import Button from "../../../../components/common/button";
import FormItem from "../../../../components/form/form-item";
import { ActionContext, FormField } from "../../../../models/form";
import { useUpdateMedia } from "../../hooks/useUpdateMedia";
import Input from "../../../../components/form/form-controls/input";

const youtubeUrlRegex = /(youtu.*be.*)\/(watch\?v=|embed\/|v|shorts|)(.*?((?=[&#?])|$))/;
type Props = {
    field: FormField;
    context: ActionContext;
}

const VideoField: FC<Props> = ({ field, context }) => {

    const [embedUrlVisible, setEmbedUrlVisible] = useState(false);
    const { url, onUrlChange } = useUpdateMedia(field, context);
    const [form] = useForm();

    const onFinish = ({ embedUrl }: { embedUrl: string }) => {
        setEmbedUrlVisible(false);
        const match = embedUrl.match(youtubeUrlRegex);
        const youtubeId = match?.[3];
        onUrlChange(`https://www.youtube.com/embed/${youtubeId}`);
    }

    const resetForm = () => {
        form.resetFields();
    }

    const videoConfig = (
        <div className="w-[450px] bg-cinder-800 rounded p-3">
            <Form
                form={form}
                onFinish={onFinish}
            >
                <FormItem
                    title='Embed link'
                    name={'embedUrl'}
                    rules={[
                        { required: true, message: "This field is required" },
                        { pattern: youtubeUrlRegex, message: 'Just support Youtube video for now' }
                    ]}
                >
                    <Input placeholder="Paste the video link..." maxLength={2000} />
                </FormItem>
                <Button>
                    Embed video
                </Button>
            </Form>
        </div>
    )

    if (!url) {
        return (
            <Popup
                content={videoConfig}
                className="bg-transparent"
                open={embedUrlVisible}
                onOpenChange={setEmbedUrlVisible}
                afterClose={resetForm}
            >
                <div className="p-3 dark:bg-cinder-600 rounded cursor-pointer flex gap-2 items-center text-gray-400">
                    <i className="fi fi-rr-picture"></i>
                    <span className="font-light">Embed a video</span>
                </div>
            </Popup>
        );
    }

    return (
        <div className="w-full">
            <iframe
                width="100%"
                height="325"
                src={`${url}?modestbranding=0&rel=0`}
                title="YouTube video player"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
            ></iframe>
        </div>
    );
}

export default VideoField;