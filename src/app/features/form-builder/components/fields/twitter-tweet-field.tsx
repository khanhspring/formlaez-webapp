import { Popup } from "ez-rc-popup";
import Form, { useForm } from "rc-field-form";
import { FC, useState } from "react";
import {TwitterTweetEmbed} from "react-twitter-embed";
import Button from "../../../../components/common/button";
import Loading from "../../../../components/common/loading";
import Input from "../../../../components/form/form-controls/input";
import FormItem from "../../../../components/form/form-item";
import { useAppSelector } from "../../../../hooks/redux-hook";
import { ActionContext, FormField } from "../../../../models/form";
import { selectTheme } from "../../../../slices/app-config";
import { useUpdateField } from "../../hooks/useUpdateField";
import { selectForm } from "../../slice";

const tweetUrlRegex = /twitter.com\/(.*)\/status\/([0-9]+)/;
type Props = {
    field: FormField;
    context: ActionContext;
}

const TwitterTweetField: FC<Props> = ({ field, context }) => {

    const [embedUrlVisible, setEmbedUrlVisible] = useState(false);
    const formInfo = useAppSelector(selectForm);

    const theme = useAppSelector(selectTheme);
    const options: any = {};
    if (theme === 'dark') {
        options['theme'] = 'dark'
    }

    const { values, update } = useUpdateField(field, context);

    const [form] = useForm();

    const onFinish = ({ embedUrl }: { embedUrl: string }) => {
        setEmbedUrlVisible(false);
        const match = embedUrl.match(tweetUrlRegex);
        const tweetId = match?.[2];
        update({ url: tweetId });
    }

    const resetForm = () => {
        form.resetFields();
    }

    const configForm = (
        <div className="w-[450px] bg-white dark:bg-steel-gray-950 rounded p-3">
            <Form
                form={form}
                onFinish={onFinish}
            >
                <FormItem
                    title='Embed a Tweet'
                    name={'embedUrl'}
                    rules={[
                        { required: true, message: "This field is required" },
                        { pattern: tweetUrlRegex, message: 'The Tweet url is invalid' }
                    ]}
                >
                    <Input placeholder="Paste the Tweet url..." maxLength={2000} />
                </FormItem>
                <Button>
                    Embed Tweet
                </Button>
            </Form>
        </div>
    )

    if (!values.url) {
        return (
            <Popup
                content={configForm}
                className="bg-transparent !text-slate-900 dark:!text-white"
                open={embedUrlVisible}
                onOpenChange={setEmbedUrlVisible}
                afterClose={resetForm}
                disabled={formInfo?.status === 'Archived'}
            >
                <div className="p-3 bg-slate-200 dark:bg-steel-gray-900 rounded cursor-pointer flex gap-2 items-center dark:text-gray-400">
                    <i className="fi fi-brands-twitter"></i>
                    <span className="font-light">Embed a Tweet</span>
                </div>
            </Popup>
        );
    }

    return (
        <div className="w-full flex justify-center">
            <div className="max-w-[470px] w-full">
                <TwitterTweetEmbed
                    tweetId={values.url}
                    options={options}
                    placeholder={<div className="w-full flex justify-center"><Loading /></div>}
                />
            </div>
        </div>
    );
}

export default TwitterTweetField;