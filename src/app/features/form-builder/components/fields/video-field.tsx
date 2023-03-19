import { Popup } from "ez-rc-popup";
import Form, { useForm } from "rc-field-form";
import { FC, useState } from "react";
import Button from "../../../../components/common/button";
import Input from "../../../../components/form/form-controls/input";
import FormItem from "../../../../components/form/form-item";
import { useAppSelector } from "../../../../hooks/redux-hook";
import { ActionContext, FormField } from "../../../../models/form";
import { useUpdateField } from "../../hooks/useUpdateField";
import { selectForm } from "../../slice";

const youtubeUrlRegex = /(youtu.*be.*)\/(watch\?v=|embed\/|v|shorts|)(.*?((?=[&#?])|$))/;
type Props = {
    field: FormField;
    context: ActionContext;
}

const VideoField: FC<Props> = ({ field, context }) => {

    const [embedUrlVisible, setEmbedUrlVisible] = useState(false);
    const formInfo = useAppSelector(selectForm);

    const { values, update } = useUpdateField(field, context);

    const [form] = useForm();

    const onFinish = ({ embedUrl }: { embedUrl: string }) => {
        setEmbedUrlVisible(false);
        const match = embedUrl.match(youtubeUrlRegex);
        const youtubeId = match?.[3];
        update({url: `https://www.youtube.com/embed/${youtubeId}`});
    }

    const resetForm = () => {
        form.resetFields();
    }

    const videoConfig = (
        <div className="w-[450px] bg-white dark:bg-cinder-800 rounded p-3">
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

    if (!values.url) {
        return (
            <Popup
                content={videoConfig}
                className="bg-transparent !text-slate-900 dark:!text-white"
                open={embedUrlVisible}
                onOpenChange={setEmbedUrlVisible}
                afterClose={resetForm}
                disabled={formInfo?.status === 'Archived'}
            >
                <div className="p-3 bg-slate-200 dark:bg-cinder-600 rounded cursor-pointer flex gap-2 items-center dark:text-gray-400">
                    <i className="fi fi-rr-picture"></i>
                    <span className="font-light">Embed a video</span>
                </div>
            </Popup>
        );
    }

    return (
        <div className="w-full mt-1 mb-3">
            <iframe
                className="w-full aspect-video"
                src={`${values.url}?modestbranding=0&rel=0`}
                title="YouTube video player"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
                allowFullScreen
            ></iframe>
        </div>
    );
}

export default VideoField;