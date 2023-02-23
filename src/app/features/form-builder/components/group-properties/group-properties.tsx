import { FC } from "react";
import { ActionContext, FormSection } from "../../../../models/form";
import VariableNameProperty from "./variable-name-property";

type Props = {
    section: FormSection;
    context: ActionContext;
}

const GroupProperties: FC<Props> = ({ section, context }) => {

    return (
        <>
            <VariableNameProperty section={section} context={context} />
        </>
    );
}

export default GroupProperties;