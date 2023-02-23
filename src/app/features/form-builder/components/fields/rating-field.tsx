import { FC } from "react";
import { ActionContext, FormField } from "../../../../models/form";
import { useUpdateField } from "../../hooks/useUpdateField";

type Props = {
    field: FormField;
    context: ActionContext;
}

const RatingField: FC<Props> = ({ field, context }) => {

    const { values, updateDebounce } = useUpdateField(field, context);

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
                        value={values.title}
                        className="flex-1 w-full text-gray-100 bg-transparent outline-none"
                        onChange={(e) => updateDebounce({title: e.target.value})}
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