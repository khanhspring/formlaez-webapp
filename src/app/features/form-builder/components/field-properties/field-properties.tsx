import { FC } from "react";
import { ActionContext, FormField } from "../../../../models/form";
import AcceptedDomainsProperty from "./accepted-domains-property";
import MaxLengthProperty from "./max-length-property";
import MaxProperty from "./max-property";
import MinLengthProperty from "./min-length-property";
import MinProperty from "./min-property";
import OptionsProperty from "./options-property";
import ReadonlyProperty from "./readonly-property";
import VariableNameProperty from "./variable-name-property";

type Props = {
    field: FormField;
    context: ActionContext;
}

const FieldProperties: FC<Props> = ({ field, context }) => {

    return (
        <>
            <VariableNameProperty field={field} context={context} />
            <MinLengthProperty field={field} context={context} />
            <MaxLengthProperty field={field} context={context} />
            <MinProperty field={field} context={context} />
            <MaxProperty field={field} context={context} />
            <AcceptedDomainsProperty field={field} context={context} />
            <ReadonlyProperty field={field} context={context} />
            <OptionsProperty field={field} context={context} />
        </>
    );
}

export default FieldProperties;