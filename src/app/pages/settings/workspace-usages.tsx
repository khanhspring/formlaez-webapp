import { FormattedNumber } from "react-intl";
import { useRouteLoaderData } from "react-router-dom";
import { FreePlan, Plans } from "../../constants/plans";
import useWorkspaceCurrentUsage from "../../hooks/workspace-usage/useWorkspaceCurrentUsage";
import { Workspace } from "../../models/workspace";

function WorkspaceBilling() {
    const workspace = useRouteLoaderData("workspace") as Workspace;

    const currentPlan = Plans[workspace.type] || FreePlan;
    const { data: usages, refetch } = useWorkspaceCurrentUsage(workspace.id);

    return (
        <>
            <div className='px-6 py-4 border-b border-slate-900/10 dark:border-slate-700'>
                <h1 className='leading-5 font-bold'>Workspace usages</h1>
            </div>
            <div className='p-6'>
                <table className="w-full">
                    <thead>
                        <tr>
                            <th className="border border-slate-900/10 dark:border-slate-600 px-3 py-5 align-bottom">
                                <div className="flex flex-col items-start font-normal gap-1">
                                    <span className="text-sm font-bold">Content</span>
                                </div>
                            </th>
                            <th className="border border-slate-900/10 dark:border-slate-600 px-3 py-5 align-bottom">
                                <div className="flex flex-col items-start font-normal gap-1">
                                    <span className="text-sm font-bold">Usages</span>
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className={`border border-slate-900/10 dark:border-slate-600 px-3 py-2 text-sm`}>
                                Forms
                            </td>
                            <td className={`border border-slate-900/10 dark:border-slate-600 px-3 py-2 text-sm`}>
                                <FormattedNumber value={usages?.totalForm || 0} /> / <FormattedNumber value={currentPlan.formLimit} />
                            </td>
                        </tr>
                        <tr>
                            <td className={`border border-slate-900/10 dark:border-slate-600 px-3 py-2 text-sm`}>
                                Members
                            </td>
                            <td className={`border border-slate-900/10 dark:border-slate-600 px-3 py-2 text-sm`}>
                                <FormattedNumber value={usages?.totalMember || 0} /> / <FormattedNumber value={currentPlan.workspaceMember} />
                            </td>
                        </tr>
                        <tr>
                            <td className={`border border-slate-900/10 dark:border-slate-600 px-3 py-2 text-sm`}>
                                File storages
                            </td>
                            <td className={`border border-slate-900/10 dark:border-slate-600 px-3 py-2 text-sm`}>
                                <FormattedNumber value={Math.round((usages?.totalFileStorage || 0) / 1024)} roundingMode={'halfEven'} /> KB / {currentPlan.fileStorageLimit}
                            </td>
                        </tr>
                        <tr>
                            <td className={`border border-slate-900/10 dark:border-slate-600 px-3 py-2 text-sm`}>
                                Submissions this month
                            </td>
                            <td className={`border border-slate-900/10 dark:border-slate-600 px-3 py-2 text-sm`}>
                                <FormattedNumber value={usages?.totalSubmission || 0} /> / <FormattedNumber value={currentPlan.submissionPerMonth} />
                            </td>
                        </tr>
                        <tr>
                            <td className={`border border-slate-900/10 dark:border-slate-600 px-3 py-2 text-sm`}>
                                Document merges this month
                            </td>
                            <td className={`border border-slate-900/10 dark:border-slate-600 px-3 py-2 text-sm`}>
                                <FormattedNumber value={usages?.totalDocumentMerge || 0} /> / <FormattedNumber value={currentPlan.documentMergePerMonth} />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default WorkspaceBilling;
