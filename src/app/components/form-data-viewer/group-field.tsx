import { FC } from 'react';
import { FormSection } from '../../models/form';

type Props = {
    section: FormSection;
}

const GroupField: FC<Props> = ({section}) => {

    return (
        <div>
            {section?.code}
        </div>
    );
}

export default GroupField;
