import { FC } from "react";
import { Link, useLocation, useParams, useRouteLoaderData } from "react-router-dom";
import { Form } from "../../../models/form";
import { Workspace } from "../../../models/workspace";
import StringUtils from "../../../util/string-utils";

type Props = {
    form?: Form;
}
const FormPageMenu: FC<Props> = ({form}) => {

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


    let urlPrefix = undefined;
    if (form?.scope === 'Private') {
        urlPrefix = `${workspace?.code}/p`;
    }
    if (form?.scope === 'Team') {
        urlPrefix = `${workspace?.code}/t/${form.team?.code}`;
    }

    return (
        <>
            <Link to={`/${urlPrefix}/f/${params.formCode}`}>
                <span className={
                    `text-slate-600 dark:text-gray-500 dark:hover:text-gray-300 cursor-pointer`
                    + ` ${isActive(params.formCode) ? '!text-slate-900 dark:!text-white border-b border-slate-800 dark:border-slate-500' : ''}`
                }>
                    Database
                </span>
            </Link>
            <Link to={`/f/${params.formCode}/builder`}>
                <span className={
                    `text-slate-600 dark:text-gray-500 dark:hover:text-gray-300 cursor-pointer`
                    + ` ${isActive('builder') ? '!text-slate-900 dark:!text-white border-b border-slate-800 dark:border-slate-500' : ''}`
                }>
                    Builder
                </span>
            </Link>
            <Link to={`/${urlPrefix}/f/${params.formCode}/document-templates`}>
                <span className={
                    `text-slate-600 dark:text-gray-500 dark:hover:text-gray-300 cursor-pointer`
                    + ` ${isActive('document-templates') ? '!text-slate-900 dark:!text-white border-b border-slate-800 dark:border-slate-500' : ''}`
                }>
                    Document templates
                </span>
            </Link>
            <Link to={`/${urlPrefix}/f/${params.formCode}/settings`}>
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
