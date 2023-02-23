import { FC } from "react";
import { ActionContext, FormField } from "../../../../models/form";
import { useUpdateBasicInfo } from "../../hooks/useUpdateBasicInfo";

type Props = {
    field: FormField;
    context: ActionContext;
}

const RatingField: FC<Props> = ({ field, context }) => {

    const { label, onLabelChange } = useUpdateBasicInfo(field, context);

    return (
        <div className="flex flex-col gap-1.5 mb-2">
            {
                !(field.hideTitle === true) &&
                <div className="flex items-center">
                    {
                        field.required &&
                        <span className="pr-1 pt-[7px] text-lg leading-3 text-red-500">*</span>
                    }
                    <input
                        value={label}
                        className="flex-1 w-full text-gray-100 bg-transparent outline-none"
                        onChange={onLabelChange}
                        placeholder="Rating"
                    />
                </div>
            }
            <div className="relative w-full flex items-center gap-2 text-3xl justify-center text-gray-200">
                <i className="fi fi-ss-star cursor-pointer"></i>
                <i className="fi fi-ss-star cursor-pointer"></i>
                <i className="fi fi-ss-star cursor-pointer"></i>
                <i className="fi fi-ss-star cursor-pointer"></i>
                <i className="fi fi-rs-star cursor-pointer"></i>
            </div>
        </div>
    );
}

export default RatingField;