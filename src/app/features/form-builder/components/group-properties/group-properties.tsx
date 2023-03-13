import { FC } from "react";
import { useAppSelector } from "../../../../hooks/redux-hook";
import { ActionContext, FormSection } from "../../../../models/form";
import { selectForm } from "../../slice";
import VariableNameProperty from "./variable-name-property";

type Props = {
    section: FormSection;
    context: ActionContext;
}

const GroupProperties: FC<Props> = ({ section, context }) => {

    const form = useAppSelector(selectForm);

    return (
        <>
            <VariableNameProperty section={section} context={context} disabled={form?.status === 'Archived'}/>
        </>
    );
}

export default GroupProperties;