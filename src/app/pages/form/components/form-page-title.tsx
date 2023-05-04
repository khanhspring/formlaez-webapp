import Tooltip from "rc-tooltip";
import { FC } from "react";
import { Form } from "../../../models/form";

type Props = {
    form?: Form;
}

const FormPageTitle: FC<Props> = ({ form }) => {

    return (
        <div className='w-full overflow-hidden flex items-center gap-3'>
            <Tooltip overlay={form?.title || ''} showArrow={false} placement="bottomLeft">
                <span className="whitespace-nowrap text-ellipsis overflow-hidden">{form?.title || ''}</span>
            </Tooltip>
            <div className="flex-1 flex items-center gap-3">
                <span className={
                    `text-xs font-normal px-2 py-1 rounded text-white`
                    + ` ${form?.status === 'Draft' ? 'bg-yellow-500 dark:bg-yellow-600' : ''}`
                    + ` ${form?.status === 'Published' ? 'bg-green-700' : ''}`
                    + ` ${form?.status === 'Archived' ? 'bg-rose-700' : ''}`
                }>{form?.status}</span>
                {
                    form?.sharingScope === 'Public' &&
                    <Tooltip overlay="Public" placement="bottom">
                        <i className="fi fi-rr-world"></i>
                    </Tooltip>
                }
                {
                    form?.sharingScope === 'Private' &&
                    <Tooltip overlay="Private" placement="bottom">
                        <i className="fi fi-rr-user"></i>
                    </Tooltip>
                }
                {
                    form?.sharingScope === 'Authenticated' &&
                    <Tooltip overlay="Authenticated" placement="bottom">
                        <i className="fi fi-rr-users-alt"></i>
                    </Tooltip>
                }
            </div>
        </div>
    );
}

export default FormPageTitle;
