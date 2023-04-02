import moment from 'moment';
import { FC, useMemo } from 'react';
import { Form } from '../../models/form';
import { FormSubmission } from '../../models/form-submission';
import Section from './section';

type Props = {
    form?: Form;
    submission?: FormSubmission;
    showContentBlocks?: boolean;
}

const FormDataViewer: FC<Props> = ({ form, submission, showContentBlocks = false }) => {

    const submitter = useMemo(() => {
        if (!submission) {
            return <></>
        }
        if (submission?.createdBy) {
            return (
                <div className='flex gap-1'>
                    <span>{submission.createdBy?.firstName + ' ' + submission.createdBy?.lastName}</span>
                    <span>({submission.createdBy.email})</span>
                </div>
            );
        }
        return (
            <span className="flex items-center gap-1">
                <i className="fi fi-rr-incognito"></i>
                Anonymous
            </span>
        )
    }, [submission])

    if (!form || !form.pages || form.pages.length === 0) {
        return <></>
    }

    const sections = form.pages[0]?.sections || [];


    return (
        <>
            <div className='flex flex-col gap-4'>
                <div className='border-b border-slate-900/10 dark:border-slate-600 flex flex-col gap-4 py-5'>
                    <div className='flex flex-col gap-1'>
                        <label className='text-xs text-slate-900/70 dark:text-gray-300'>
                            Submitter
                        </label>
                        <div className='text-sm'>
                            {submitter}
                        </div>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label className='text-xs text-slate-900/70 dark:text-gray-300'>
                            Submitted date
                        </label>
                        <div className='text-sm'>
                            {moment(submission?.createdDate).format("DD MMM YYYY HH:mm")}
                        </div>
                    </div>
                </div>
                {
                    sections.map((item, index) =>
                        <Section section={item} data={submission?.data || {}} key={index} showContentBlocks={showContentBlocks} />
                    )
                }
            </div>
        </>
    );
}

export default FormDataViewer;
