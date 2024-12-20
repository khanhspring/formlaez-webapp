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

type Props = {
    field: FormField;
    context: ActionContext;
}

const ImageField: FC<Props> = ({ field, context }) => {

    const [embedUrlVisible, setEmbedUrlVisible] = useState(false);
    const { values, update } = useUpdateField(field, context);
    const formInfo = useAppSelector(selectForm);
    const [form] = useForm();

    const onFinish = ({ embedUrl }: any) => {
        update({url: embedUrl});
        setEmbedUrlVisible(false);
    }

    const resetForm = () => {
        form.resetFields();
    }

    const imageConfig = (
        <div className="w-[450px] bg-white dark:bg-steel-gray-950 rounded p-3">
            <Form
                form={form}
                onFinish={onFinish}
            >
                <FormItem
                    title='Embed link'
                    name={'embedUrl'}
                    rules={[
                        { required: true, message: "This field is required" },
                        { type: 'url', message: "Please enter a valid link" },
                    ]}
                >
                    <Input placeholder="Paste the image link..." maxLength={2000} />
                </FormItem>
                <Button>
                    Embed link
                </Button>
            </Form>
        </div>
    )

    if (!values.url) {
        return (
            <Popup
                content={imageConfig}
                className="bg-transparent !text-slate-900 dark:!text-white"
                open={embedUrlVisible}
                onOpenChange={setEmbedUrlVisible}
                afterClose={resetForm}
                disabled={formInfo?.status === 'Archived'}
            >
                <div className="p-3 bg-slate-200 dark:bg-steel-gray-900 rounded cursor-pointer flex gap-2 items-center dark:text-gray-400">
                    <i className="fi fi-rr-picture"></i>
                    <span className="font-light">Add an image</span>
                </div>
            </Popup>
        );
    }

    return (
        <div className="w-full mt-1 mb-3">
            <img src={values.url} alt={values.url} className="w-full rounded" />
        </div>
    );
}

export default ImageField;