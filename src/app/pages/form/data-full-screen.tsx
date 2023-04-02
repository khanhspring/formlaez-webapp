import { useParams } from "react-router-dom";
import useFormDetail from "../../hooks/form/useFormDetail";
import FormDataTable from "./components/form-data-table";

function DataFullScreen() {

    const params = useParams();
    const { data: form } = useFormDetail(params.formCode);

    return (
        <div className="w-full flex flex-col gap-2 p-5">
            <FormDataTable
                form={form}
                sticky={{
                    offsetHeader: 0
                }}
                pageSize={50}
                fullscreen
            />
        </div >
    );
}

export default DataFullScreen;
