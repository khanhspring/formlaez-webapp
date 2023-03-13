import { FC } from "react";
import { useAppSelector } from "../../../../hooks/redux-hook";
import { ActionContext, FormField } from "../../../../models/form";
import { selectForm } from "../../slice";
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

    const form = useAppSelector(selectForm);

    return (
        <>
            <VariableNameProperty field={field} context={context} disabled={form?.status === 'Archived'} />
            <MinLengthProperty field={field} context={context} disabled={form?.status === 'Archived'}/>
            <MaxLengthProperty field={field} context={context} disabled={form?.status === 'Archived'}/>
            <MinProperty field={field} context={context} disabled={form?.status === 'Archived'}/>
            <MaxProperty field={field} context={context} disabled={form?.status === 'Archived'}/>
            <AcceptedDomainsProperty field={field} context={context} disabled={form?.status === 'Archived'}/>
            <ReadonlyProperty field={field} context={context} disabled={form?.status === 'Archived'}/>
            <OptionsProperty field={field} context={context} disabled={form?.status === 'Archived'}/>
        </>
    );
}

export default FieldProperties;