import { FormattedNumber } from "react-intl";
import { useRouteLoaderData } from "react-router-dom";
import { FreePlan, Plans } from "../../constants/plans";
import useWorkspaceCurrentUsage from "../../hooks/workspace-usage/useWorkspaceCurrentUsage";
import { Workspace } from "../../models/workspace";
import UsageBar from "./components/usage-bar";

function WorkspaceBilling() {
    const workspace = useRouteLoaderData("workspace") as Workspace;

    const currentPlan = Plans[workspace.type] || FreePlan;
    const { data: usages } = useWorkspaceCurrentUsage(workspace.id);

    return (
        <>
            <div className="mt-6 flex flex-col gap-6">
                <h2 className="pb-1 border-b border-slate-900/10 dark:border-gray-800">Usages</h2>
                <div className='w-full'>
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-slate-900/10 dark:border-slate-600 ">
                                <th className="px-3 py-3 align-bottom">
                                    <div className="flex flex-col items-start font-normal gap-1">
                                        <span className="font-bold">Content</span>
                                    </div>
                                </th>
                                <th className="px-3 py-3 align-bottom min-w-[170px]">
                                    <div className="flex flex-col items-start font-normal gap-1">
                                        <span className="font-bold">Usages</span>
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className={`px-3 py-3 font-bold`}>
                                    Forms
                                </td>
                                <td className={`px-3 py-3`}>
                                    <UsageBar
                                        title={<><FormattedNumber value={usages?.totalForm || 0} /> / <FormattedNumber value={currentPlan.formLimit} /></>}
                                        maxValue={currentPlan.formLimit}
                                        used={usages?.totalForm || 0}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td className={`px-3 py-3 font-bold`}>
                                    Members
                                </td>
                                <td className={`px-3 py-3`}>
                                    <UsageBar
                                        title={<><FormattedNumber value={usages?.totalMember || 0} /> / <FormattedNumber value={currentPlan.workspaceMember} /></>}
                                        maxValue={currentPlan.workspaceMember}
                                        used={usages?.totalMember || 0}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td className={`px-3 py-3 font-bold`}>
                                    File storages
                                </td>
                                <td className={`px-3 py-3`}>
                                    <UsageBar
                                        title={<><FormattedNumber value={Math.round((usages?.totalFileStorage || 0) / 1024)} roundingMode={'halfEven'} /> KB / {currentPlan.fileStorageLimit}</>}
                                        maxValue={currentPlan.fileStorageLimitInBytes}
                                        used={usages?.totalFileStorage || 0}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td className={`px-3 py-3 font-bold`}>
                                    Submissions this month
                                </td>
                                <td className={`px-3 py-3`}>
                                    <UsageBar
                                        title={<><FormattedNumber value={usages?.totalSubmission || 0} /> / <FormattedNumber value={currentPlan.submissionPerMonth} /></>}
                                        maxValue={currentPlan.submissionPerMonth}
                                        used={usages?.totalSubmission || 0}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td className={`px-3 py-3 font-bold`}>
                                    Document merges this month
                                </td>
                                <td className={`px-3 py-3`}>
                                    <UsageBar
                                        title={<><FormattedNumber value={usages?.totalDocumentMerge || 0} /> / <FormattedNumber value={currentPlan.documentMergePerMonth} /></>}
                                        maxValue={currentPlan.documentMergePerMonth}
                                        used={usages?.totalDocumentMerge || 0}
                                    />
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
