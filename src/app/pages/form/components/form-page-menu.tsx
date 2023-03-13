import { Link, useLocation, useParams, useRouteLoaderData } from "react-router-dom";
import { Workspace } from "../../../models/workspace";
import StringUtils from "../../../util/string-utils";

function FormPageMenu() {

    const workspace = useRouteLoaderData("workspace") as Workspace;
    const { pathname } = useLocation();
    const params = useParams();

    const isActive = (pathSegment?: string) => {
        if (!pathSegment) {
            return false;
        }
        const fullPath = StringUtils.trimCharAtEnd(pathname, '/');
        return fullPath.endsWith(pathSegment);
    }

    return (
        <>
            <Link to={`/${workspace.code}/private/forms/${params.formCode}`}>
                <span className={
                    `text-slate-600 dark:text-gray-500 dark:hover:text-gray-300 cursor-pointer`
                    + ` ${isActive(params.formCode) ? '!text-slate-900 dark:!text-white border-b border-slate-800 dark:border-slate-500' : ''}`
                }>
                    Database
                </span>
            </Link>
            <Link to={`/${workspace.code}/private/forms/${params.formCode}/edit`}>
                <span className={
                    `text-slate-600 dark:text-gray-500 dark:hover:text-gray-300 cursor-pointer`
                    + ` ${isActive('edit') ? '!text-slate-900 dark:!text-white border-b border-slate-800 dark:border-slate-500' : ''}`
                }>
                    Builder
                </span>
            </Link>
            <Link to={`/${workspace.code}/private/forms/${params.formCode}/document-templates`}>
                <span className={
                    `text-slate-600 dark:text-gray-500 dark:hover:text-gray-300 cursor-pointer`
                    + ` ${isActive('document-templates') ? '!text-slate-900 dark:!text-white border-b border-slate-800 dark:border-slate-500' : ''}`
                }>
                    Document templates
                </span>
            </Link>
            <Link to={`/${workspace.code}/private/forms/${params.formCode}/settings`}>
                <span className={
                    `text-slate-600 dark:text-gray-500 dark:hover:text-gray-300 cursor-pointer`
                    + ` ${isActive('settings') ? '!text-slate-900 dark:!text-white border-b border-slate-800 dark:border-slate-500' : ''}`
                }>
                    Settings
                </span>
            </Link>
        </>
    );
}

export default FormPageMenu;
