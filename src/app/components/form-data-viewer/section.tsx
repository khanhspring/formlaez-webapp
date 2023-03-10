import { FC } from 'react';
import { FormSection } from '../../models/form';
import Field from './field';
import GroupField from './group-field';

type Props = {
    section: FormSection;
    data: any;
}

const Section: FC<Props> = ({section, data}) => {

    const fields = section.fields || [];
    if (fields.length === 0) {
        return <></>
    }

    if (section.type === 'Group') {
        <GroupField section={section}/>
    }

const field = fields[0];

    return (
        <Field field={field} data={data} />
    );
}

export default Section;
