import Tooltip from "rc-tooltip";
import { FC } from "react";
import { Link, useRouteLoaderData } from "react-router-dom";
import { Form } from "../../../models/form";
import { Workspace } from "../../../models/workspace";
import { firstLetters } from "../../../util/string-utils";

type Props = {
    form?: Form;
}

const FormPageTitlePrefix: FC<Props> = ({ form }) => {

    const workspace = useRouteLoaderData("workspace") as Workspace;

    return (
        <>
            {
                form?.team &&
                <div className="flex gap-2">
                    <Tooltip overlay={form?.team.name} placement="bottom">
                        <Link to={`/${workspace?.code}/t/${form?.team.code}`}>
                            <div className="flex items-center justify-center w-6 h-6 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full transition group-hover:ring-2 text-white hover:ring-2 cursor-pointer">
                                <span className="font-semibold flex justify-center items-center">{firstLetters(form?.team?.name)}</span>
                            </div>
                        </Link>
                    </Tooltip>
                    <i className="fi fi-rr-arrow-small-right"></i>
                </div>
            }

            {
                form && !form.team &&
                <div className="flex gap-2">
                    <Tooltip overlay="Private" placement="bottom">
                        <Link to={`/${workspace?.code}/p`}>
                            <div className="flex items-center justify-center w-6 h-6 bg-gradient-to-r from-yellow-600 to-red-600 rounded-full transition group-hover:ring-2 ring-yellow-600/30 text-white hover:ring-2 cursor-pointer">
                                <span className="font-semibold flex justify-center items-center">
                                    <i className='fi fi-rr-user text-xs' />
                                </span>
                            </div>
                        </Link>
                    </Tooltip>
                    <i className="fi fi-rr-arrow-small-right"></i>
                </div>
            }
        </>
    );
}

export default FormPageTitlePrefix;
