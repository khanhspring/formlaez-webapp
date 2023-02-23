import { Popup } from "ez-rc-popup";
import Form, { useForm } from "rc-field-form";
import { FC, useState } from "react";
import Button from "../../../../components/common/button";
import Input from "../../../../components/form/form-controls/input";
import FormItem from "../../../../components/form/form-item";
import { ActionContext, FormField } from "../../../../models/form";
import { useUpdateField } from "../../hooks/useUpdateField";

type Props = {
    field: FormField;
    context: ActionContext;
}

const PdfField: FC<Props> = ({ field, context }) => {

    const [embedUrlVisible, setEmbedUrlVisible] = useState(false);

    const { values, update } = useUpdateField(field, context);

    const [form] = useForm();


    const onFinish = ({ embedUrl }: any) => {
        update({url: embedUrl});
        setEmbedUrlVisible(false);
    }

    const resetForm = () => {
        form.resetFields();
    }

    const imageConfig = (
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
                        { type: 'url', message: "Please enter a valid link" },
                    ]}
                >
                    <Input placeholder="Paste the PDF link..." maxLength={2000} />
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
                className="bg-transparent"
                open={embedUrlVisible}
                onOpenChange={setEmbedUrlVisible}
                afterClose={resetForm}
            >
                <div className="p-3 dark:bg-cinder-600 rounded cursor-pointer flex gap-2 items-center text-gray-400">
                    <i className="fi fi-rr-picture"></i>
                    <span className="font-light">Embed a PDF</span>
                </div>
            </Popup>
        );
    }

    return (
        <div className="w-full">
            <iframe src={`${values.url}#view=FitH`}
                title="PDF"
                width="100%"
                height="500px"
            >
            </iframe>
        </div>
    );
}


export default PdfField;