import moment from "moment";
import { useState } from "react";
import { FormattedNumber } from "react-intl";
import { useRouteLoaderData } from "react-router-dom";
import Button from "../../components/common/button";
import { BusinessPlan, FreePlan, Plans, PlusPlan } from "../../constants/plans";
import useCurrentSubscription from "../../hooks/subscription/useCurrentSubscription";
import { Workspace } from "../../models/workspace";
import UpgradePlanModal from "./components/upgrade-plan-modal";
import UpgradePlanSuccessModal from "./components/upgrade-plan-sucess-modal";

function WorkspaceBilling() {
    const workspace = useRouteLoaderData("workspace") as Workspace;
    const [upgradeVisible, setUpgradeVisible] = useState(false);
    const [upgradeSuccessVisible, setUpgradeSuccessVisible] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState<string>();

    const currentPlan = Plans[workspace.type] || FreePlan;
    const { data: currentSubscription, refetch: refetchCurrentSubscription } = useCurrentSubscription(workspace.id);

    const onSelectPlan = (plan: string) => {
        setSelectedPlan(plan);
        setUpgradeVisible(true);
    }

    const onSuccess = () => {
        setUpgradeSuccessVisible(true);
        refetchCurrentSubscription();
    }

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
                                currentSubscription?.status === 'Active' &&
                                <a href={currentSubscription?.cancelUrl} target="_blank" rel="noreferrer">
                                    <Button className="mt-2" status="danger">Unsubscribe</Button>
                                </a>
                            }
                            {
                                currentSubscription?.status === 'Cancelled' && currentSubscription.validTill &&
                                <span className="text-sm italic">(Valid till {moment(currentSubscription.validTill).format("YYYY MMM DD")})</span>
                            }
                            {
                                currentSubscription?.status === 'Cancelled' &&
                                <span className="mt-1 px-2.5 py-1.5 rounded text-sm transition flex justify-center items-center gap-1 bg-slate-200 dark:bg-cinder-600">
                                    Cancelled
                                </span>
                            }
                        </div>
                    </div>
                    <div className="flex-1">
                        <h3 className="font-bold">Includes</h3>
                        <div className="flex flex-col gap-2 text-sm mt-3">
                            <div className="flex gap-2 items-center">
                                <i className="fi fi-rr-checkbox"></i>
                                <span>{currentPlan.formLimit} forms</span>
                            </div>
                            <div className="flex gap-2 items-center">
                                <i className="fi fi-rr-checkbox"></i>
                                <span>{currentPlan.submissionPerMonth} submissions / month</span>
                            </div>
                            <div className="flex gap-2 items-center">
                                <i className="fi fi-rr-checkbox"></i>
                                <span>{currentPlan.documentMergePerMonth} document merges / month</span>
                            </div>
                            <div className="flex gap-2 items-center">
                                <i className="fi fi-rr-checkbox"></i>
                                <span>{currentPlan.fileStorageLimit} storage</span>
                            </div>
                            <div className="flex gap-2 items-center">
                                <i className="fi fi-rr-checkbox"></i>
                                <span>{currentPlan.workspaceMember} workspace members</span>
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
                                <th className={`w-52 border border-slate-900/10 dark:border-cinder-600 px-3 py-5 align-top ${workspace.type === 'Free' ? 'bg-slate-50 dark:bg-cinder-600/50' : ''}`}>
                                    <div className="flex flex-col items-start font-normal gap-1">
                                        <span className="text-xl h-6">
                                            {FreePlan.icon}
                                        </span>

                                        <span className="font-bold mt-1">Free</span>
                                        <div className="flex items-center h-10">
                                            <span className="font-bold text-lg">${FreePlan.price}</span>
                                        </div>
                                        {
                                            workspace.type === 'Free' &&
                                            <span className="text-sm mt-2 w-full px-2.5 py-1.5 rounded flex justify-center items-center gap-1 bg-slate-200 dark:bg-cinder-700 border border-slate-900/10 dark:border-cinder-600">
                                                Current plan
                                            </span>
                                        }
                                    </div>
                                </th>
                                <th className={`w-52 border border-slate-900/10 dark:border-cinder-600 px-3 py-5 align-top ${workspace.type === 'Plus' ? 'bg-slate-50 dark:bg-cinder-600/50' : ''}`}>
                                    <div className="flex flex-col items-start font-normal gap-1">
                                        <span className="text-xl h-6">
                                            {PlusPlan.icon}
                                        </span>

                                        <span className="font-bold mt-1">Plus</span>
                                        <div className="flex items-center h-10">
                                            <span className="font-bold text-lg">${PlusPlan.price}</span>
                                        </div>
                                        {
                                            workspace.type === 'Plus' &&
                                            <span className="text-sm mt-2 w-full px-2.5 py-1.5 rounded flex justify-center items-center gap-1 bg-slate-200 dark:bg-cinder-700 border border-slate-900/10 dark:border-cinder-600">
                                                Current plan
                                            </span>
                                        }
                                        {
                                            workspace.type !== 'Plus' &&
                                            <Button
                                                onClick={() => onSelectPlan('Plus')}
                                                className="w-full mt-2"
                                            >
                                                {workspace.type !== 'Free' ? 'Change' : 'Upgrade'}
                                            </Button>
                                        }
                                    </div>
                                </th>
                                <th className={`w-52 border border-slate-900/10 dark:border-cinder-600 px-3 py-5 align-top ${workspace.type === 'Business' ? 'bg-slate-50 dark:bg-cinder-600/50' : ''}`}>
                                    <div className="flex flex-col items-start font-normal gap-1">
                                        <span className="text-xl h-6">
                                            {BusinessPlan.icon}
                                        </span>

                                        <span className="font-bold mt-1">Business</span>
                                        <div className="flex items-center h-10">
                                            <span className="font-bold text-lg">${BusinessPlan.price}</span>
                                        </div>
                                        {
                                            workspace.type === 'Business' &&
                                            <span className="text-sm mt-2 w-full px-2.5 py-1.5 rounded flex justify-center items-center gap-1 bg-slate-200 dark:bg-cinder-700 border border-slate-900/10 dark:border-cinder-600">
                                                Current plan
                                            </span>
                                        }
                                        {
                                            workspace.type !== 'Business' &&
                                            <Button
                                                onClick={() => onSelectPlan('Business')}
                                                className="w-full mt-2"
                                            >
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
                                    <FormattedNumber value={FreePlan.formLimit} />
                                </td>
                                <td className={`border border-slate-900/10 dark:border-cinder-600 px-3 py-2 text-sm  ${workspace.type === 'Plus' ? 'bg-slate-50 dark:bg-cinder-600/50' : ''}`}>
                                    <FormattedNumber value={PlusPlan.formLimit} />
                                </td>
                                <td className={`border border-slate-900/10 dark:border-cinder-600 px-3 py-2 text-sm ${workspace.type === 'Business' ? 'bg-slate-50 dark:bg-cinder-600/50' : ''}`}>
                                    <FormattedNumber value={BusinessPlan.formLimit} />
                                </td>
                            </tr>
                            <tr>
                                <td className={`border border-slate-900/10 dark:border-cinder-600 px-3 py-2 text-sm`}>
                                    Document merges (per month)
                                </td>
                                <td className={`border border-slate-900/10 dark:border-cinder-600 px-3 py-2 text-sm ${workspace.type === 'Free' ? 'bg-slate-50 dark:bg-cinder-600/50' : ''}`}>
                                    <FormattedNumber value={FreePlan.documentMergePerMonth} />
                                </td>
                                <td className={`border border-slate-900/10 dark:border-cinder-600 px-3 py-2 text-sm  ${workspace.type === 'Plus' ? 'bg-slate-50 dark:bg-cinder-600/50' : ''}`}>
                                    <FormattedNumber value={PlusPlan.documentMergePerMonth} />
                                </td>
                                <td className={`border border-slate-900/10 dark:border-cinder-600 px-3 py-2 text-sm ${workspace.type === 'Business' ? 'bg-slate-50 dark:bg-cinder-600/50' : ''}`}>
                                    <FormattedNumber value={BusinessPlan.documentMergePerMonth} />
                                </td>
                            </tr>
                            <tr>
                                <td className={`border border-slate-900/10 dark:border-cinder-600 px-3 py-2 text-sm`}>
                                    Submissions (per month)
                                </td>
                                <td className={`border border-slate-900/10 dark:border-cinder-600 px-3 py-2 text-sm ${workspace.type === 'Free' ? 'bg-slate-50 dark:bg-cinder-600/50' : ''}`}>
                                    <FormattedNumber value={FreePlan.submissionPerMonth} />
                                </td>
                                <td className={`border border-slate-900/10 dark:border-cinder-600 px-3 py-2 text-sm  ${workspace.type === 'Plus' ? 'bg-slate-50 dark:bg-cinder-600/50' : ''}`}>
                                    <FormattedNumber value={PlusPlan.submissionPerMonth} />
                                </td>
                                <td className={`border border-slate-900/10 dark:border-cinder-600 px-3 py-2 text-sm  ${workspace.type === 'Plus' ? 'bg-slate-50 dark:bg-cinder-600/50' : ''}`}>
                                    <FormattedNumber value={BusinessPlan.submissionPerMonth} />
                                </td>
                            </tr>
                            <tr>
                                <td className={`border border-slate-900/10 dark:border-cinder-600 px-3 py-2 text-sm`}>
                                    File storage
                                </td>
                                <td className={`border border-slate-900/10 dark:border-cinder-600 px-3 py-2 text-sm ${workspace.type === 'Free' ? 'bg-slate-50 dark:bg-cinder-600/50' : ''}`}>
                                    Up to {FreePlan.fileStorageLimit}
                                </td>
                                <td className={`border border-slate-900/10 dark:border-cinder-600 px-3 py-2 text-sm  ${workspace.type === 'Plus' ? 'bg-slate-50 dark:bg-cinder-600/50' : ''}`}>
                                    Up to {PlusPlan.fileStorageLimit}
                                </td>
                                <td className={`border border-slate-900/10 dark:border-cinder-600 px-3 py-2 text-sm ${workspace.type === 'Business' ? 'bg-slate-50 dark:bg-cinder-600/50' : ''}`}>
                                    Up to {BusinessPlan.fileStorageLimit}
                                </td>
                            </tr>
                            <tr>
                                <td className={`border border-slate-900/10 dark:border-cinder-600 px-3 py-2 text-sm`}>
                                    Workspace members
                                </td>
                                <td className={`border border-slate-900/10 dark:border-cinder-600 px-3 py-2 text-sm ${workspace.type === 'Free' ? 'bg-slate-50 dark:bg-cinder-600/50' : ''}`}>
                                    <FormattedNumber value={FreePlan.workspaceMember} />
                                </td>
                                <td className={`border border-slate-900/10 dark:border-cinder-600 px-3 py-2 text-sm  ${workspace.type === 'Plus' ? 'bg-slate-50 dark:bg-cinder-600/50' : ''}`}>
                                    <FormattedNumber value={PlusPlan.workspaceMember} />
                                </td>
                                <td className={`border border-slate-900/10 dark:border-cinder-600 px-3 py-2 text-sm ${workspace.type === 'Business' ? 'bg-slate-50 dark:bg-cinder-600/50' : ''}`}>
                                    <FormattedNumber value={BusinessPlan.workspaceMember} />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            {
                selectedPlan &&
                <UpgradePlanModal
                    visible={upgradeVisible}
                    onClose={() => setUpgradeVisible(false)}
                    plan={selectedPlan}
                    onSuccess={onSuccess}
                />
            }
            {
                selectedPlan &&
                <UpgradePlanSuccessModal
                    visible={upgradeSuccessVisible}
                    plan={selectedPlan}
                    onClose={() => setUpgradeSuccessVisible(false)}
                />
            }
        </>
    );
}

export default WorkspaceBilling;
