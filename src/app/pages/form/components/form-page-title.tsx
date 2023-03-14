import Tooltip from "rc-tooltip";
import { FC } from "react";
import { Form } from "../../../models/form";

type Props = {
    form?: Form;
}

const FormPageTitle: FC<Props> = ({ form }) => {

    return (
        <div className='flex items-center gap-3'>
            {form?.title || ''}
            <span className={
                `text-xs font-normal px-2 py-1 rounded text-white`
                + ` ${form?.status === 'Draft' ? 'bg-yellow-500 dark:bg-yellow-600' : ''}`
                + ` ${form?.status === 'Published' ? 'bg-green-700' : ''}`
                + ` ${form?.status === 'Archived' ? 'bg-rose-700' : ''}`
            }>{form?.status}</span>
            {
                form?.sharingScope === 'Public' &&
                <Tooltip overlay="Public">
                    <i className="fi fi-rr-world"></i>
                </Tooltip>
            }
            {
                form?.sharingScope === 'Private' &&
                <Tooltip overlay="Private">
                    <i className="fi fi-rr-user"></i>
                </Tooltip>
            }
        </div>
    );
}

export default FormPageTitle;
