import { FC } from 'react';
import { FormSection } from '../../models/form';
import Field from './field';
import GroupField from './group-field';

type Props = {
    section: FormSection;
    data: any;
    showContentBlocks: boolean;
}

const Section: FC<Props> = ({ section, data, showContentBlocks }) => {

    const fields = section.fields || [];
    if (fields.length === 0) {
        return <></>
    }

    if (section.type === 'Group') {
        return <GroupField section={section} showContentBlocks={showContentBlocks} data={data} />
    }

    const field = fields[0];
    return (
        <Field field={field} data={data} showContentBlocks={showContentBlocks} />
    );
}

export default Section;
