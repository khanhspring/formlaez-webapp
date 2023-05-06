import { FC } from "react";
import { Link, useLocation, useParams, useRouteLoaderData } from "react-router-dom";
import { Form } from "../../../models/form";
import { Workspace } from "../../../models/workspace";
import StringUtils from "../../../util/string-utils";
import { EllipsisHorizontalIcon, Squares2X2Icon } from "@heroicons/react/24/solid";
import Dropdown from "rc-dropdown";
import Menu, { MenuItem } from 'rc-menu';

type Props = {
    form?: Form;
}
const FormPageMenu: FC<Props> = ({ form }) => {

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

    const mobileMenu = (
        <Menu className="text-sm box-shadow-none">
            <MenuItem key="database">
                <Link to={`/${urlPrefix}/f/${params.formCode}`}>
                    Database
                </Link>
            </MenuItem>
            <MenuItem key="analysis">
                <Link to={`/${urlPrefix}/f/${params.formCode}/analysis`}>
                    Analysis
                </Link>
            </MenuItem>
            <MenuItem key="builder">
                <Link to={`/${urlPrefix}/f/${params.formCode}/builder`}>
                    Builder
                </Link>
            </MenuItem>
            <MenuItem key="document-templates">
                <Link to={`/${urlPrefix}/f/${params.formCode}/document-templates`}>
                    Document templates
                </Link>
            </MenuItem>
            <MenuItem key="settings">
                <Link to={`/${urlPrefix}/f/${params.formCode}/settings`}>
                    Settings
                </Link>
            </MenuItem>
        </Menu>
    )

    return (
        <>
            <div className="hidden lg:flex items-center justify-end gap-3 text-xs transition">
                <Link to={`/${urlPrefix}/f/${params.formCode}`}>
                    <span className={
                        `text-slate-600 dark:text-gray-500 dark:hover:text-gray-300 cursor-pointer whitespace-nowrap`
                        + ` ${isActive(params.formCode) ? '!text-slate-900 dark:!text-white border-b border-slate-800 dark:border-slate-500' : ''}`
                    }>
                        Database
                    </span>
                </Link>
                <Link to={`/${urlPrefix}/f/${params.formCode}/analysis`}>
                    <span className={
                        `text-slate-600 dark:text-gray-500 dark:hover:text-gray-300 cursor-pointer whitespace-nowrap`
                        + ` ${isActive('analysis') ? '!text-slate-900 dark:!text-white border-b border-slate-800 dark:border-slate-500' : ''}`
                    }>
                        Analysis
                    </span>
                </Link>
                <Link to={`/f/${params.formCode}/builder`}>
                    <span className={
                        `text-slate-600 dark:text-gray-500 dark:hover:text-gray-300 cursor-pointer whitespace-nowrap`
                        + ` ${isActive('builder') ? '!text-slate-900 dark:!text-white border-b border-slate-800 dark:border-slate-500' : ''}`
                    }>
                        Builder
                    </span>
                </Link>
                <Link to={`/${urlPrefix}/f/${params.formCode}/document-templates`}>
                    <span className={
                        `text-slate-600 dark:text-gray-500 dark:hover:text-gray-300 cursor-pointer whitespace-nowrap`
                        + ` ${isActive('document-templates') ? '!text-slate-900 dark:!text-white border-b border-slate-800 dark:border-slate-500' : ''}`
                    }>
                        Document templates
                    </span>
                </Link>
                <Link to={`/${urlPrefix}/f/${params.formCode}/settings`}>
                    <span className={
                        `text-slate-600 dark:text-gray-500 dark:hover:text-gray-300 cursor-pointer whitespace-nowrap`
                        + ` ${isActive('settings') ? '!text-slate-900 dark:!text-white border-b border-slate-800 dark:border-slate-500' : ''}`
                    }>
                        Settings
                    </span>
                </Link>
            </div>
            <div className="flex lg:hidden items-center justify-center">
                <Dropdown overlay={mobileMenu} placement="bottomRight" trigger={['click']}>
                    <EllipsisHorizontalIcon className="w-6 h-6 cursor-pointer" />
                </Dropdown>
            </div>
        </>
    );
}

export default FormPageMenu;
