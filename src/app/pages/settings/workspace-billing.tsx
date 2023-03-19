import { FormattedNumber } from "react-intl";
import { useRouteLoaderData } from "react-router-dom";
import Button from "../../components/common/button";
import { Workspace } from "../../models/workspace";

function WorkspaceBilling() {
    const workspace = useRouteLoaderData("workspace") as Workspace;

    return (
        <>
            <div className='px-6 py-4 border-b border-slate-900/10 dark:border-cinder-700'>
                <h1 className='leading-5 font-bold'>Workspace Plan & Billing</h1>
            </div>
            <div className='p-6'>
                <div className="flex items-center">
                    <div className="flex-1">
                        <div className="flex justify-center flex-col items-center gap-2">
                            {workspace.type === 'Free' && <i className="fi fi-rr-gift text-3xl"></i>}
                            {workspace.type === 'Plus' && <i className="fi fi-rr-flame text-3xl"></i>}
                            {workspace.type === 'Business' && <i className="fi fi-rr-comet text-3xl"></i>}
                            {workspace.type === 'Enterprise' && <i className="fi fi-rr-diamond text-3xl"></i>}
                            <span className="text-lg font-bold">{workspace.type} Plan</span>
                            {
                                workspace.type !== 'Free' &&
                                <Button className="mt-2" status="danger">Unsubscribe</Button>
                            }
                        </div>
                    </div>
                    <div className="flex-1">
                        <h3 className="font-bold">Includes</h3>
                        <div className="flex flex-col gap-2 text-sm mt-3">
                            <div className="flex gap-2 items-center">
                                <i className="fi fi-rr-checkbox"></i>
                                <span>5 forms</span>
                            </div>
                            <div className="flex gap-2 items-center">
                                <i className="fi fi-rr-checkbox"></i>
                                <span>100 submissions / month</span>
                            </div>
                            <div className="flex gap-2 items-center">
                                <i className="fi fi-rr-checkbox"></i>
                                <span>25 document merges / month</span>
                            </div>
                            <div className="flex gap-2 items-center">
                                <i className="fi fi-rr-checkbox"></i>
                                <span>1 GB storage</span>
                            </div>
                            <div className="flex gap-2 items-center">
                                <i className="fi fi-rr-checkbox"></i>
                                <span>1 workspace members</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-7 border-t border-slate-900/10 dark:border-cinder-700">
                    <table className="mt-7 w-full">
                        <thead>
                            <tr>
                                <th className="border border-slate-900/10 dark:border-cinder-600 px-3 py-5 align-bottom">
                                    <div className="flex flex-col items-start font-normal gap-1">
                                        <span className="text-sm font-bold">Content</span>
                                    </div>
                                </th>
                                <th className={`w-40 border border-slate-900/10 dark:border-cinder-600 px-3 py-5 align-top ${workspace.type === 'Free' ? 'bg-slate-50 dark:bg-cinder-600/50' : ''}`}>
                                    <div className="flex flex-col items-start font-normal gap-1">
                                        <i className="fi fi-rr-gift text-xl h-6"></i>
                                        <span className="font-bold mt-1">Free</span>
                                        <div className="flex items-center h-10">
                                            <span className="font-bold text-lg">$0</span>
                                        </div>
                                        {
                                            workspace.type === 'Free' &&
                                            <span className="text-sm mt-2 w-full px-2.5 py-1.5 rounded flex justify-center items-center gap-1 bg-slate-200 dark:bg-cinder-700 border border-slate-900/10 dark:border-cinder-600">
                                                Current plan
                                            </span>
                                        }
                                    </div>
                                </th>
                                <th className={`w-40 border border-slate-900/10 dark:border-cinder-600 px-3 py-5 align-top ${workspace.type === 'Plus' ? 'bg-slate-50 dark:bg-cinder-600/50' : ''}`}>
                                    <div className="flex flex-col items-start font-normal gap-1">
                                        <i className="fi fi-rr-flame text-xl h-6"></i>
                                        <span className="font-bold mt-1">Plus</span>
                                        <div className="flex items-center h-10">
                                            <span className="font-bold text-lg">$10</span>
                                        </div>
                                        {
                                            workspace.type === 'Plus' &&
                                            <span className="text-sm mt-2 w-full px-2.5 py-1.5 rounded flex justify-center items-center gap-1 bg-slate-200 dark:bg-cinder-700 border border-slate-900/10 dark:border-cinder-600">
                                                Current plan
                                            </span>
                                        }
                                        {
                                            workspace.type !== 'Plus' &&
                                            <Button className="w-full mt-2">
                                                {workspace.type !== 'Free' ? 'Change' : 'Upgrade'}
                                            </Button>
                                        }
                                    </div>
                                </th>
                                <th className={`w-40 border border-slate-900/10 dark:border-cinder-600 px-3 py-5 align-top ${workspace.type === 'Business' ? 'bg-slate-50 dark:bg-cinder-600/50' : ''}`}>
                                    <div className="flex flex-col items-start font-normal gap-1">
                                        <i className="fi fi-rr-comet text-xl h-6"></i>
                                        <span className="font-bold mt-1">Business</span>
                                        <div className="flex items-center h-10">
                                            <span className="font-bold text-lg">$25</span>
                                        </div>
                                        {
                                            workspace.type === 'Business' &&
                                            <span className="text-sm mt-2 w-full px-2.5 py-1.5 rounded flex justify-center items-center gap-1 bg-slate-200 dark:bg-cinder-700 border border-slate-900/10 dark:border-cinder-600">
                                                Current plan
                                            </span>
                                        }
                                        {
                                            workspace.type !== 'Business' &&
                                            <Button className="w-full mt-2">
                                                {workspace.type !== 'Free' ? 'Change' : 'Upgrade'}
                                            </Button>
                                        }
                                    </div>
                                </th>
                                <th className={`w-40 border border-slate-900/10 dark:border-cinder-600 px-3 py-5 align-top ${workspace.type === 'Enterprise' ? 'bg-slate-50 dark:bg-cinder-600/50' : ''}`}>
                                    <div className="flex flex-col items-start font-normal gap-1">
                                        <i className="fi fi-rr-diamond text-xl h-6"></i>
                                        <span className="font-bold mt-1">Enterprise</span>
                                        <div className="flex items-center gap-2 h-10">
                                            <span className="font-bold text-lg">$20</span>
                                            <div className="flex flex-col justify-center items-start text-xs">
                                                <span>per member</span>
                                                <span>per month</span>
                                            </div>
                                        </div>
                                        {
                                            workspace.type === 'Enterprise' &&
                                            <span className="text-sm mt-2 w-full px-2.5 py-1.5 rounded flex justify-center items-center gap-1 bg-slate-200 dark:bg-cinder-700 border border-slate-900/10 dark:border-cinder-600">
                                                Current plan
                                            </span>
                                        }
                                        {
                                            workspace.type !== 'Enterprise' &&
                                            <Button className="w-full mt-2">
                                                {workspace.type !== 'Free' ? 'Change' : 'Upgrade'}
                                            </Button>
                                        }
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className={`border border-slate-900/10 dark:border-cinder-600 px-3 py-2 text-sm`}>
                                    Forms
                                </td>
                                <td className={`border border-slate-900/10 dark:border-cinder-600 px-3 py-2 text-sm ${workspace.type === 'Free' ? 'bg-slate-50 dark:bg-cinder-600/50' : ''}`}>
                                    5
                                </td>
                                <td className={`border border-slate-900/10 dark:border-cinder-600 px-3 py-2 text-sm  ${workspace.type === 'Plus' ? 'bg-slate-50 dark:bg-cinder-600/50' : ''}`}>
                                    20
                                </td>
                                <td className={`border border-slate-900/10 dark:border-cinder-600 px-3 py-2 text-sm ${workspace.type === 'Business' ? 'bg-slate-50 dark:bg-cinder-600/50' : ''}`}>
                                    100
                                </td>
                                <td className={`border border-slate-900/10 dark:border-cinder-600 px-3 py-2 text-sm  ${workspace.type === 'Enterprise' ? 'bg-slate-50 dark:bg-cinder-600/50' : ''}`}>
                                    <FormattedNumber value={1000} />
                                </td>
                            </tr>
                            <tr>
                                <td className={`border border-slate-900/10 dark:border-cinder-600 px-3 py-2 text-sm`}>
                                    Document merges (per month)
                                </td>
                                <td className={`border border-slate-900/10 dark:border-cinder-600 px-3 py-2 text-sm ${workspace.type === 'Free' ? 'bg-slate-50 dark:bg-cinder-600/50' : ''}`}>
                                    25
                                </td>
                                <td className={`border border-slate-900/10 dark:border-cinder-600 px-3 py-2 text-sm  ${workspace.type === 'Plus' ? 'bg-slate-50 dark:bg-cinder-600/50' : ''}`}>
                                    100
                                </td>
                                <td className={`border border-slate-900/10 dark:border-cinder-600 px-3 py-2 text-sm ${workspace.type === 'Business' ? 'bg-slate-50 dark:bg-cinder-600/50' : ''}`}>
                                    500
                                </td>
                                <td className={`border border-slate-900/10 dark:border-cinder-600 px-3 py-2 text-sm  ${workspace.type === 'Enterprise' ? 'bg-slate-50 dark:bg-cinder-600/50' : ''}`}>
                                    <FormattedNumber value={5000} />
                                </td>
                            </tr>
                            <tr>
                                <td className={`border border-slate-900/10 dark:border-cinder-600 px-3 py-2 text-sm`}>
                                    Submissions (per month)
                                </td>
                                <td className={`border border-slate-900/10 dark:border-cinder-600 px-3 py-2 text-sm ${workspace.type === 'Free' ? 'bg-slate-50 dark:bg-cinder-600/50' : ''}`}>
                                    100
                                </td>
                                <td className={`border border-slate-900/10 dark:border-cinder-600 px-3 py-2 text-sm  ${workspace.type === 'Plus' ? 'bg-slate-50 dark:bg-cinder-600/50' : ''}`}>
                                    <FormattedNumber value={1000} />
                                </td>
                                <td className={`border border-slate-900/10 dark:border-cinder-600 px-3 py-2 text-sm ${workspace.type === 'Business' ? 'bg-slate-50 dark:bg-cinder-600/50' : ''}`}>
                                    <FormattedNumber value={2000} />
                                </td>
                                <td className={`border border-slate-900/10 dark:border-cinder-600 px-3 py-2 text-sm  ${workspace.type === 'Enterprise' ? 'bg-slate-50 dark:bg-cinder-600/50' : ''}`}>
                                    <FormattedNumber value={10000} />
                                </td>
                            </tr>
                            <tr>
                                <td className={`border border-slate-900/10 dark:border-cinder-600 px-3 py-2 text-sm`}>
                                    File storage
                                </td>
                                <td className={`border border-slate-900/10 dark:border-cinder-600 px-3 py-2 text-sm ${workspace.type === 'Free' ? 'bg-slate-50 dark:bg-cinder-600/50' : ''}`}>
                                    Up to 100 MB
                                </td>
                                <td className={`border border-slate-900/10 dark:border-cinder-600 px-3 py-2 text-sm  ${workspace.type === 'Plus' ? 'bg-slate-50 dark:bg-cinder-600/50' : ''}`}>
                                    Up to 1 GB
                                </td>
                                <td className={`border border-slate-900/10 dark:border-cinder-600 px-3 py-2 text-sm ${workspace.type === 'Business' ? 'bg-slate-50 dark:bg-cinder-600/50' : ''}`}>
                                    Up to 5 GB
                                </td>
                                <td className={`border border-slate-900/10 dark:border-cinder-600 px-3 py-2 text-sm  ${workspace.type === 'Enterprise' ? 'bg-slate-50 dark:bg-cinder-600/50' : ''}`}>
                                    Up to 100 GB
                                </td>
                            </tr>
                            <tr>
                                <td className={`border border-slate-900/10 dark:border-cinder-600 px-3 py-2 text-sm`}>
                                    Workspace members
                                </td>
                                <td className={`border border-slate-900/10 dark:border-cinder-600 px-3 py-2 text-sm ${workspace.type === 'Free' ? 'bg-slate-50 dark:bg-cinder-600/50' : ''}`}>
                                    1
                                </td>
                                <td className={`border border-slate-900/10 dark:border-cinder-600 px-3 py-2 text-sm  ${workspace.type === 'Plus' ? 'bg-slate-50 dark:bg-cinder-600/50' : ''}`}>
                                    2
                                </td>
                                <td className={`border border-slate-900/10 dark:border-cinder-600 px-3 py-2 text-sm ${workspace.type === 'Business' ? 'bg-slate-50 dark:bg-cinder-600/50' : ''}`}>
                                    5
                                </td>
                                <td className={`border border-slate-900/10 dark:border-cinder-600 px-3 py-2 text-sm  ${workspace.type === 'Enterprise' ? 'bg-slate-50 dark:bg-cinder-600/50' : ''}`}>
                                    Unlimited
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default WorkspaceBilling;
