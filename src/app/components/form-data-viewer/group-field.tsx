import { FC } from 'react';
import { FormSection } from '../../models/form';
import Field from './field';

type Props = {
    section: FormSection;
    showContentBlocks: boolean;
    data: any;
}

const GroupField: FC<Props> = ({ section, data = {}, showContentBlocks }) => {

    const fields = section.fields || [];
    const records: any[] = data[section.code] || [];

    return (
        <div className='border border-slate-900/10 dark:border-cinder-600 rounded p-3 flex flex-col gap-4'>
            <div>{section.title || 'Untitled group'}</div>
            {
                records.map((record, index) =>
                    <div className='flex gap-2 items-stretch'>
                        <div className='w-4 border-r border-slate-900/10 dark:border-cinder-600'>
                            <span>{index + 1}</span>
                        </div>
                        <div className='flex-1 flex flex-col gap-4'>
                        {
                            fields.map((field, index) =>
                                <Field field={field} data={record} showContentBlocks={showContentBlocks} key={index + "_" + index} />
                            )
                        }
                        </div>
                    </div>
                )
            }
        </div>
    );
}

export default GroupField;
