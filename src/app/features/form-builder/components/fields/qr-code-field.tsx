import { Popup } from "ez-rc-popup";
import { QRCodeSVG } from "qrcode.react";
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

const QrCodeField: FC<Props> = ({ field, context }) => {

    const [qrCodeContentVisible, setQRCodeContentVisible] = useState(false);
    const { values, update } = useUpdateField(field, context);
    const formInfo = useAppSelector(selectForm);
    const [form] = useForm();

    const onFinish = ({ content }: any) => {
        update({ content: content });
        setQRCodeContentVisible(false);
    }

    const resetForm = () => {
        form.resetFields();
    }

    const qrCodeConfig = (
        <div className="w-[450px] bg-white dark:bg-steel-gray-950 rounded p-3">
            <Form
                form={form}
                onFinish={onFinish}
            >
                <FormItem
                    title='QR code content'
                    name={'content'}
                    rules={[
                        { required: true, message: "This field is required" },
                    ]}
                >
                    <Input placeholder="QR code content..." maxLength={2000} />
                </FormItem>
                <Button>
                    Generate QR
                </Button>
            </Form>
        </div>
    )

    if (!values.content) {
        return (
            <Popup
                content={qrCodeConfig}
                className="bg-transparent !text-slate-900 dark:!text-white"
                open={qrCodeContentVisible}
                onOpenChange={setQRCodeContentVisible}
                afterClose={resetForm}
                disabled={formInfo?.status === 'Archived'}
            >
                <div className="p-3 bg-slate-200 dark:bg-steel-gray-900 rounded cursor-pointer flex gap-2 items-center dark:text-gray-400">
                    <i className="fi fi-rr-qrcode"></i>
                    <span className="font-light">Generate QR code</span>
                </div>
            </Popup>
        );
    }

    return (
        <div className="w-full mt-1 mb-3 flex items-center justify-center">
            <div className="p-2 bg-slate-100 dark:bg-white rounded">
                <QRCodeSVG value={values.content} />
            </div>
        </div>
    );
}

export default QrCodeField;