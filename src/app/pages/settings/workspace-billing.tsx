import { BoltIcon, CheckCircleIcon, FireIcon, GiftIcon } from "@heroicons/react/24/solid";
import moment from "moment";
import { useState } from "react";
import ReactConfetti from "react-confetti";
import { FormattedNumber } from "react-intl";
import { useRevalidator, useRouteLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "../../components/common/button";
import confirm from "../../components/common/confirm/confirm";
import { BusinessPlan, FreePlan, Plans, PlusPlan } from "../../constants/plans";
import useChangeWorkspacePlan from "../../hooks/subscription/useChangeWorkspacePlan";
import useCurrentSubscription from "../../hooks/subscription/useCurrentSubscription";
import { ChangeWorkspacePlanRequest } from "../../models/subscription";
import { Workspace, WorkspaceType } from "../../models/workspace";
import { showErrorIgnore403 } from "../../util/common";
import UpgradePlanModal from "./components/upgrade-plan-modal";
import UpgradePlanSuccessModal from "./components/upgrade-plan-success-modal";

function WorkspaceBilling() {
    const workspace = useRouteLoaderData("workspace") as Workspace;
    const [upgradeVisible, setUpgradeVisible] = useState(false);
    const [upgradeSuccessVisible, setUpgradeSuccessVisible] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState<string>();

    const currentPlan = Plans[workspace.type] || FreePlan;
    const { data: currentSubscription, refetch: refetchCurrentSubscription } = useCurrentSubscription(workspace.id);

    const { mutateAsync: changePlan } = useChangeWorkspacePlan();
    const { revalidate } = useRevalidator();

    const onSelectPlan = (plan: string) => {
        setSelectedPlan(plan);
        setUpgradeVisible(true);
    }

    const onSuccess = () => {
        setUpgradeSuccessVisible(true);
        refetchCurrentSubscription();
        revalidate();
    }

    const confirmChangePlan = (type: WorkspaceType) => {
        const request: ChangeWorkspacePlanRequest = {
            workspaceId: workspace.id,
            type: type
        };
        return changePlan(request, {
            onError: (e) => showErrorIgnore403(e),
            onSuccess: () => {
                toast.success("Changed plan successfully!");
                revalidate();
            }
        })
    }

    const showConfirmChangePlan = (type: WorkspaceType) => {
        confirm({
            title: 'Confirm',
            content: 'Change workspace plan to ' + type,
            onOkAsync: () => confirmChangePlan(type)
        })
    }

    if (process.env.REACT_APP_BILLING_ENABLED !== 'true') {
        return (
            <div className="flex-1 flex justify-center items-center">
                <span className="italic">This feature is currently unavailable</span>
            </div>
        )
    }

    return (
        <>
            <div className="mt-6 flex flex-col gap-6">
                <h2 className="pb-1 border-b border-slate-900/10 dark:border-gray-800">Plan & Billing</h2>
                <div className='w-full'>
                    <div className="flex items-center py-5">
                        <div className="flex-1">
                            <div className="flex justify-center flex-col items-center gap-2">
                                {workspace.type === 'Free' && <GiftIcon className="w-12 h-12"/>}
                                {workspace.type === 'Plus' && <FireIcon className="w-12 h-12"/>}
                                {workspace.type === 'Business' && <BoltIcon className="w-12 h-12"/>}
                                <span className="text-lg font-bold">{workspace.type} Plan</span>
                                {
                                    currentSubscription?.status === 'Cancelled' && currentSubscription.validTill &&
                                    <div className="italic flex flex-col items-center gap-1">
                                        <div className="flex justify-center gap-1.5">
                                            <span>Valid till {moment(currentSubscription.validTill).format("YYYY MMM DD")}</span>
                                            {
                                                !moment().isAfter(moment(currentSubscription.validTill)) &&
                                                <i className="fi fi-sr-triangle-warning text-yellow-600 text-lg"></i>
                                            }
                                            {
                                                moment().isAfter(moment(currentSubscription.validTill)) &&
                                                <i className="fi fi-sr-triangle-warning text-rose-700 text-lg"></i>
                                            }
                                        </div>
                                        <p>After this day your workspace will be changed to Free plan</p>
                                    </div>
                                }
                                {
                                    currentSubscription?.status === 'Active' && currentSubscription.validTill &&
                                    <div className="italic flex flex-col items-center gap-1">
                                        <span>
                                            Auto renew on {moment(currentSubscription.validTill).format("YYYY MMM DD")}
                                        </span>
                                    </div>
                                }
                                {
                                    currentSubscription?.status === 'Active' &&
                                    <a href={currentSubscription?.cancelUrl} target="_blank" rel="noreferrer">
                                        <Button className="mt-2 text-white" status="danger">Unsubscribe</Button>
                                    </a>
                                }
                                {
                                    currentSubscription?.status === 'Cancelled' &&
                                    <span className="mt-1 px-2.5 py-1.5 rounded transition flex justify-center items-center gap-1 bg-slate-200 dark:bg-slate-600">
                                        Cancelled
                                    </span>
                                }
                            </div>
                        </div>
                        <div className="flex-1">
                            <h3 className="font-bold">Includes</h3>
                            <div className="flex flex-col gap-2 mt-3">
                                <div className="flex gap-2 items-center">
                                    <CheckCircleIcon className="w-5 h-5"/>
                                    <span>{currentPlan.formLimit} forms</span>
                                </div>
                                <div className="flex gap-2 items-center">
                                    <CheckCircleIcon className="w-5 h-5"/>
                                    <span>{currentPlan.submissionPerMonth} submissions / month</span>
                                </div>
                                <div className="flex gap-2 items-center">
                                    <CheckCircleIcon className="w-5 h-5"/>
                                    <span>{currentPlan.documentMergePerMonth} document merges / month</span>
                                </div>
                                <div className="flex gap-2 items-center">
                                    <CheckCircleIcon className="w-5 h-5"/>
                                    <span>{currentPlan.fileStorageLimit} storage</span>
                                </div>
                                <div className="flex gap-2 items-center">
                                    <CheckCircleIcon className="w-5 h-5"/>
                                    <span>{currentPlan.workspaceMember} workspace members</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-9 pt-3 border-t border-slate-900/10 dark:border-gray-800">
                        <p className="italic">
                            We always appreciate your feedback to improve the system better and better.
                        </p>
                        <p className="italic">
                            Leave your feedback
                            <a href={process.env.REACT_APP_FEEDBACK_URL} target="_blank" rel="noreferrer" className="underline text-blue-700 mx-1 cursor-pointer">here</a>
                            to receive discount code up to 10%
                        </p>
                    </div>

                    <div className="mt-3">
                        <table className="w-full">
                            <thead>
                                <tr>
                                    <th className="border border-slate-900/10 dark:border-slate-600 px-4 py-5 align-bottom">
                                        <div className="flex flex-col items-start font-normal gap-1">
                                            <span className="font-bold">Content</span>
                                        </div>
                                    </th>
                                    <th className={`w-52 border border-slate-900/10 dark:border-slate-600 px-4 py-5 align-top ${workspace.type === 'Free' ? 'bg-zinc-50 dark:bg-steel-gray-900' : ''}`}>
                                        <div className="flex flex-col items-start font-normal gap-1">
                                            <span className="text-xl h-10">
                                                <div className="w-10">{FreePlan.icon}</div>
                                            </span>

                                            <span className="font-bold mt-1">Free</span>
                                            <div className="flex items-center h-10">
                                                <span className="font-bold text-lg">${FreePlan.price}</span>
                                            </div>
                                            {
                                                workspace.type === 'Free' &&
                                                <span className="mt-2 w-full px-2.5 py-1.5 rounded flex justify-center items-center gap-1 bg-zinc-200 dark:bg-steel-gray-800 border border-slate-900/10 dark:border-slate-600">
                                                    Current plan
                                                </span>
                                            }
                                        </div>
                                    </th>
                                    <th className={`w-52 border border-slate-900/10 dark:border-slate-600 px-4 py-5 align-top ${workspace.type === 'Plus' ? 'bg-zinc-50 dark:bg-steel-gray-900' : ''}`}>
                                        <div className="flex flex-col items-start font-normal gap-1">
                                            <span className="text-xl h-10">
                                                <div className="w-10">{PlusPlan.icon}</div>
                                            </span>

                                            <span className="font-bold mt-1">Plus</span>
                                            <div className="flex items-center h-10">
                                                <span className="font-bold text-lg">${PlusPlan.price}</span>
                                            </div>
                                            {
                                                workspace.type === 'Plus' && currentSubscription?.status !== 'Cancelled' &&
                                                <span className="mt-2 w-full px-2.5 py-1.5 rounded flex justify-center items-center gap-1 bg-zinc-200 dark:bg-steel-gray-800 border border-slate-900/10 dark:border-slate-600">
                                                    Current plan
                                                </span>
                                            }
                                            {
                                                workspace.type === 'Plus' && currentSubscription?.status === 'Cancelled' &&
                                                <Button
                                                    onClick={() => onSelectPlan('Plus')}
                                                    className="w-full mt-2"
                                                >
                                                    Resubscribe
                                                </Button>
                                            }
                                            {
                                                workspace.type !== 'Plus' && workspace.type !== 'Free' && currentSubscription?.status === 'Cancelled' &&
                                                <Button
                                                    onClick={() => onSelectPlan('Plus')}
                                                    className="w-full mt-2"
                                                >
                                                    Subscribe
                                                </Button>
                                            }
                                            {
                                                workspace.type !== 'Plus' && workspace.type !== 'Free' && currentSubscription?.status === 'Active' &&
                                                <Button
                                                    onClick={() => showConfirmChangePlan('Plus')}
                                                    className="w-full mt-2"
                                                >
                                                    Change
                                                </Button>
                                            }
                                            {
                                                workspace.type !== 'Plus' && workspace.type === 'Free' &&
                                                <Button
                                                    onClick={() => onSelectPlan('Plus')}
                                                    className="w-full mt-2"
                                                >
                                                    Upgrade
                                                </Button>
                                            }
                                        </div>
                                    </th>
                                    <th className={`w-52 border border-slate-900/10 dark:border-slate-600 px-4 py-5 align-top ${workspace.type === 'Business' ? 'bg-zinc-50 dark:bg-steel-gray-900' : ''}`}>
                                        <div className="flex flex-col items-start font-normal gap-1">
                                            <span className="text-xl h-10">
                                                <div className="w-10">{BusinessPlan.icon}</div>
                                            </span>

                                            <span className="font-bold mt-1">Business</span>
                                            <div className="flex items-center h-10">
                                                <span className="font-bold text-lg">${BusinessPlan.price}</span>
                                            </div>
                                            {
                                                workspace.type === 'Business' && currentSubscription?.status !== 'Cancelled' &&
                                                <span className="mt-2 w-full px-2.5 py-1.5 rounded flex justify-center items-center gap-1 bg-zinc-200 dark:bg-steel-gray-800 border border-slate-900/10 dark:border-slate-600">
                                                    Current plan
                                                </span>
                                            }
                                            {
                                                workspace.type === 'Business' && currentSubscription?.status === 'Cancelled' &&
                                                <Button
                                                    onClick={() => onSelectPlan('Business')}
                                                    className="w-full mt-2"
                                                >
                                                    Resubscribe
                                                </Button>
                                            }
                                            {
                                                workspace.type !== 'Business' && workspace.type !== 'Free' && currentSubscription?.status === 'Cancelled' &&
                                                <Button
                                                    onClick={() => onSelectPlan('Business')}
                                                    className="w-full mt-2"
                                                >
                                                    Subscribe
                                                </Button>
                                            }
                                            {
                                                workspace.type !== 'Business' && workspace.type !== 'Free' && currentSubscription?.status === 'Active' &&
                                                <Button
                                                    onClick={() => showConfirmChangePlan('Business')}
                                                    className="w-full mt-2"
                                                >
                                                    Change
                                                </Button>
                                            }
                                            {
                                                workspace.type !== 'Business' && workspace.type === 'Free' &&
                                                <Button
                                                    onClick={() => onSelectPlan('Business')}
                                                    className="w-full mt-2"
                                                >
                                                    Upgrade
                                                </Button>
                                            }
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className={`border border-slate-900/10 dark:border-slate-600 px-4 py-4 font-semibold`}>
                                        Forms
                                    </td>
                                    <td className={`border border-slate-900/10 dark:border-slate-600 px-4 py-4 ${workspace.type === 'Free' ? 'bg-zinc-50 dark:bg-steel-gray-900' : ''}`}>
                                        <FormattedNumber value={FreePlan.formLimit} />
                                    </td>
                                    <td className={`border border-slate-900/10 dark:border-slate-600 px-4 py-4  ${workspace.type === 'Plus' ? 'bg-zinc-50 dark:bg-steel-gray-900' : ''}`}>
                                        <FormattedNumber value={PlusPlan.formLimit} />
                                    </td>
                                    <td className={`border border-slate-900/10 dark:border-slate-600 px-4 py-4 ${workspace.type === 'Business' ? 'bg-zinc-50 dark:bg-steel-gray-900' : ''}`}>
                                        <FormattedNumber value={BusinessPlan.formLimit} />
                                    </td>
                                </tr>
                                <tr>
                                    <td className={`border border-slate-900/10 dark:border-slate-600 px-4 py-4 font-semibold`}>
                                        Document merges (per month)
                                    </td>
                                    <td className={`border border-slate-900/10 dark:border-slate-600 px-4 py-4 ${workspace.type === 'Free' ? 'bg-zinc-50 dark:bg-steel-gray-900' : ''}`}>
                                        <FormattedNumber value={FreePlan.documentMergePerMonth} />
                                    </td>
                                    <td className={`border border-slate-900/10 dark:border-slate-600 px-4 py-4  ${workspace.type === 'Plus' ? 'bg-zinc-50 dark:bg-steel-gray-900' : ''}`}>
                                        <FormattedNumber value={PlusPlan.documentMergePerMonth} />
                                    </td>
                                    <td className={`border border-slate-900/10 dark:border-slate-600 px-4 py-4 ${workspace.type === 'Business' ? 'bg-zinc-50 dark:bg-steel-gray-900' : ''}`}>
                                        <FormattedNumber value={BusinessPlan.documentMergePerMonth} />
                                    </td>
                                </tr>
                                <tr>
                                    <td className={`border border-slate-900/10 dark:border-slate-600 px-4 py-4 font-semibold`}>
                                        Submissions (per month)
                                    </td>
                                    <td className={`border border-slate-900/10 dark:border-slate-600 px-4 py-4 ${workspace.type === 'Free' ? 'bg-zinc-50 dark:bg-steel-gray-900' : ''}`}>
                                        <FormattedNumber value={FreePlan.submissionPerMonth} />
                                    </td>
                                    <td className={`border border-slate-900/10 dark:border-slate-600 px-4 py-4  ${workspace.type === 'Plus' ? 'bg-zinc-50 dark:bg-steel-gray-900' : ''}`}>
                                        <FormattedNumber value={PlusPlan.submissionPerMonth} />
                                    </td>
                                    <td className={`border border-slate-900/10 dark:border-slate-600 px-4 py-4  ${workspace.type === 'Business' ? 'bg-zinc-50 dark:bg-steel-gray-900' : ''}`}>
                                        <FormattedNumber value={BusinessPlan.submissionPerMonth} />
                                    </td>
                                </tr>
                                <tr>
                                    <td className={`border border-slate-900/10 dark:border-slate-600 px-4 py-4 font-semibold`}>
                                        File storage
                                    </td>
                                    <td className={`border border-slate-900/10 dark:border-slate-600 px-4 py-4 ${workspace.type === 'Free' ? 'bg-zinc-50 dark:bg-steel-gray-900' : ''}`}>
                                        Up to {FreePlan.fileStorageLimit}
                                    </td>
                                    <td className={`border border-slate-900/10 dark:border-slate-600 px-4 py-4  ${workspace.type === 'Plus' ? 'bg-zinc-50 dark:bg-steel-gray-900' : ''}`}>
                                        Up to {PlusPlan.fileStorageLimit}
                                    </td>
                                    <td className={`border border-slate-900/10 dark:border-slate-600 px-4 py-4 ${workspace.type === 'Business' ? 'bg-zinc-50 dark:bg-steel-gray-900' : ''}`}>
                                        Up to {BusinessPlan.fileStorageLimit}
                                    </td>
                                </tr>
                                <tr>
                                    <td className={`border border-slate-900/10 dark:border-slate-600 px-4 py-4 font-semibold`}>
                                        Workspace members
                                    </td>
                                    <td className={`border border-slate-900/10 dark:border-slate-600 px-4 py-4 ${workspace.type === 'Free' ? 'bg-zinc-50 dark:bg-steel-gray-900' : ''}`}>
                                        <FormattedNumber value={FreePlan.workspaceMember} />
                                    </td>
                                    <td className={`border border-slate-900/10 dark:border-slate-600 px-4 py-4  ${workspace.type === 'Plus' ? 'bg-zinc-50 dark:bg-steel-gray-900' : ''}`}>
                                        <FormattedNumber value={PlusPlan.workspaceMember} />
                                    </td>
                                    <td className={`border border-slate-900/10 dark:border-slate-600 px-4 py-4 ${workspace.type === 'Business' ? 'bg-zinc-50 dark:bg-steel-gray-900' : ''}`}>
                                        <FormattedNumber value={BusinessPlan.workspaceMember} />
                                    </td>
                                </tr>
                                <tr>
                                    <td className={`border border-slate-900/10 dark:border-slate-600 px-4 py-4 font-semibold`}>
                                        Teams
                                    </td>
                                    <td className={`border border-slate-900/10 dark:border-slate-600 px-4 py-4 ${workspace.type === 'Free' ? 'bg-zinc-50 dark:bg-steel-gray-900' : ''}`}>
                                        Unlimited
                                    </td>
                                    <td className={`border border-slate-900/10 dark:border-slate-600 px-4 py-4  ${workspace.type === 'Plus' ? 'bg-zinc-50 dark:bg-steel-gray-900' : ''}`}>
                                        Unlimited
                                    </td>
                                    <td className={`border border-slate-900/10 dark:border-slate-600 px-4 py-4 ${workspace.type === 'Business' ? 'bg-zinc-50 dark:bg-steel-gray-900' : ''}`}>
                                        Unlimited
                                    </td>
                                </tr>
                                <tr>
                                    <td className={`border border-slate-900/10 dark:border-slate-600 px-4 py-4 font-semibold`}>
                                        Document templates
                                    </td>
                                    <td className={`border border-slate-900/10 dark:border-slate-600 px-4 py-4 ${workspace.type === 'Free' ? 'bg-zinc-50 dark:bg-steel-gray-900' : ''}`}>
                                        Unlimited
                                    </td>
                                    <td className={`border border-slate-900/10 dark:border-slate-600 px-4 py-4  ${workspace.type === 'Plus' ? 'bg-zinc-50 dark:bg-steel-gray-900' : ''}`}>
                                        Unlimited
                                    </td>
                                    <td className={`border border-slate-900/10 dark:border-slate-600 px-4 py-4 ${workspace.type === 'Business' ? 'bg-zinc-50 dark:bg-steel-gray-900' : ''}`}>
                                        Unlimited
                                    </td>
                                </tr>
                                <tr>
                                    <td className={`border border-slate-900/10 dark:border-slate-600 px-4 py-4 font-semibold`}>
                                        Workspace joining per user
                                    </td>
                                    <td className={`border border-slate-900/10 dark:border-slate-600 px-4 py-4 ${workspace.type === 'Free' ? 'bg-zinc-50 dark:bg-steel-gray-900' : ''}`}>
                                        Unlimited
                                    </td>
                                    <td className={`border border-slate-900/10 dark:border-slate-600 px-4 py-4  ${workspace.type === 'Plus' ? 'bg-zinc-50 dark:bg-steel-gray-900' : ''}`}>
                                        Unlimited
                                    </td>
                                    <td className={`border border-slate-900/10 dark:border-slate-600 px-4 py-4 ${workspace.type === 'Business' ? 'bg-zinc-50 dark:bg-steel-gray-900' : ''}`}>
                                        Unlimited
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="mt-3">
                        <p className="italic">After you subscribe, you can cancel whenever you want.</p>
                    </div>
                </div>
            </div>
            {
                selectedPlan && currentSubscription &&
                <UpgradePlanModal
                    visible={upgradeVisible}
                    onClose={() => setUpgradeVisible(false)}
                    plan={selectedPlan}
                    onSuccess={onSuccess}
                    currentSubscription={currentSubscription}
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
            {
                selectedPlan && upgradeSuccessVisible &&
                <div className="fixed top-0 left-0 w-full h-screen overflow-hidden pointer-events-none z-[1100]">
                    <ReactConfetti gravity={0.15} />
                </div>
            }
        </>
    );
}

export default WorkspaceBilling;
