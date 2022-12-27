import FieldGroup from "../../components/fields/field-group";
import FieldItem from "../../components/fields/field-item";
import FieldTable from "../../components/fields/field-table";

function Page() {

    return (
        <div className="w-full max-w-2xl m-auto flex flex-col mt-2">
            <FieldItem type="text" />
            <FieldItem type="input-text" />
            <FieldItem type="text" />
            <FieldItem type="input-text" />
            <FieldItem type="input-text" />
            <FieldItem type="input-text" />
            <FieldItem type="input-number" />
            <FieldGroup />
            <FieldItem type="input-text" />
            <FieldItem type="input-text" />
            <FieldItem type="line" />
            <FieldItem type="image" />
            <FieldItem type="video" />
            <FieldTable />
            <FieldItem type="pdf" />
        </div>
    );
}

export default Page;
