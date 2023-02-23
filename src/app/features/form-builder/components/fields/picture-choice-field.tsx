import { FC } from "react";
import { ActionContext, FormField } from "../../../../models/form";
import { useUpdateField } from "../../hooks/useUpdateField";

type Props = {
    field: FormField;
    context: ActionContext;
}

const PictureChoiceField: FC<Props> = ({ field, context }) => {

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
                        placeholder="Picture choice"
                    />
                </div>
            }
            <div className="w-full grid grid-cols-1 md:grid-cols-4 sm:grid-cols-3 gap-4">
                <div className="p-2 h-40 rounded overflow-hidden border border-gray-700 cursor-pointer flex items-center justify-center">
                    <i className="fi fi-rr-plus text-lg text-gray-400"></i>
                </div>
            </div>
        </div>
    );
}

export default PictureChoiceField;