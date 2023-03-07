import moment from 'moment';
import { FC } from 'react';
import { Form } from '../../models/form';

type Props = {
    form?: Form
}

const FormItem: FC<Props> = ({ form }) => {

    if (!form) {
        return <></>
    }

    return (
        <div className="flex items-center p-2 rounded-md border border-slate-900/10 bg-slate-50 dark:border-transparent dark:bg-cinder-700 relative group">
            <div className="flex items-center justify-center w-10 h-10 rounded-full group-hover:ring-2 bg-gradient-to-r from-cyan-500 to-blue-500 transition">
                <span className="font-bold text-lg text-white dark:text-white">C</span>
            </div>
            <div className="flex-1 flex gap-1 flex-col px-2 overflow-hidden ml-0.5">
                <h3 className="text-sm overflow-hidden text-ellipsis whitespace-nowrap">
                    {form.title}
                </h3>
                <div className="flex items-center gap-1 text-gray-500">
                    <i className="fi fi-rr-clock text-xs"></i>
                    <span className="text-xs">
                        {moment(form.createdDate).format("DD MMM YYYY HH:mm")}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default FormItem;
