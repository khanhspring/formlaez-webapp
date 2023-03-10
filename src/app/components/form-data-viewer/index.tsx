import { FC } from 'react';
import { Form } from '../../models/form';
import { FormSubmission } from '../../models/form-submission';
import Section from './section';

type Props = {
    form?: Form;
    submission?: FormSubmission;
}

const FormDataViewer: FC<Props> = ({form, submission}) => {

    if (!form || !form.pages || form.pages.length === 0) {
        return <></>
    }

    const sections = form.pages[0]?.sections || [];

    return (
        <div>
            {
                sections.map((item, index) =>
                    <Section section={item} data={submission?.data || {}} key={index} />
                )
            }
        </div>
    );
}

export default FormDataViewer;
