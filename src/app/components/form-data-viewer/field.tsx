import { FC } from 'react';
import { FormField } from '../../models/form';

type Props = {
    field: FormField;
    data: any;
}

const Field: FC<Props> = ({ field, data }) => {

    return (
        <div>
            <label>
                {field.title}
            </label>
            <div>
                {data[field.code]}
            </div>
        </div>
    );
}

export default Field;
