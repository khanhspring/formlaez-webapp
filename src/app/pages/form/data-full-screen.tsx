import { Link, useParams, useRouteLoaderData } from "react-router-dom";
import ButtonAction from "../../components/layout/button-action";
import useFormDetail from "../../hooks/form/useFormDetail";
import { Workspace } from "../../models/workspace";
import FormDataTable from "./components/form-data-table";

function DataFullScreen() {

    const workspace = useRouteLoaderData("workspace") as Workspace;
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
