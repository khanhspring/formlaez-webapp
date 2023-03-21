import { FC, useCallback, useEffect, useRef } from "react";
import { useRevalidator, useRouteLoaderData } from 'react-router-dom';
import { toast } from "react-toastify";
import Modal from "../../../components/common/modal";
import { Plans } from "../../../constants/plans";
import { useAppSelector } from "../../../hooks/redux-hook";
import useGetWorkspace from "../../../hooks/workspace/useGetWorkspace";
import { Subscription } from "../../../models/subscription";
import { Workspace } from '../../../models/workspace';
import { selectUserInfo } from "../../../slices/auth";
const Paddle = (window as any).Paddle;

type Props = {
    visible: boolean;
    onClose: () => void;
    plan: string;
    onSuccess: () => void;
    currentSubscription: Subscription;
}
const UpgradePlanModal: FC<Props> = ({ visible, onClose, onSuccess, plan, currentSubscription }) => {

    const workspace = useRouteLoaderData("workspace") as Workspace;
    const userInfo = useAppSelector(selectUserInfo);
    const { mutateAsync: getWorkspace } = useGetWorkspace();

    const { revalidate } = useRevalidator();
    const intervalRef = useRef<any>(null);

    const selectedPlan = Plans[plan];

    const checkoutComplete = useCallback((_data: any) => {
        const loading = toast.loading("Processing...", { autoClose: false });

        intervalRef.current = setInterval(() => {
            getWorkspace(workspace.code, {
                onSuccess: () => {
                    revalidate();
                    setTimeout(() => {
                        onSuccess();
                        onClose();
                        toast.dismiss(loading);
                        toast.success("Subscribed successfully!");
                    }, 700)
                    clearInterval(intervalRef.current);
                }
            })
        }, 2000)

    }, [getWorkspace, onClose, onSuccess, revalidate, workspace.code])

    useEffect(() => {
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        }
    }, [])

    useEffect(() => {
        if (visible && selectedPlan && (workspace.type === 'Free' || currentSubscription.status === 'Cancelled')) {
            Paddle.Checkout.open(
                {
                    method: 'inline',
                    product: selectedPlan.productId,
                    allowQuantity: false,
                    disableLogout: true,
                    frameTarget: 'checkout-container',
                    frameInitialHeight: 450,
                    frameStyle: 'width:100%; min-width:312px; background-color: transparent; border: none;',
                    email: userInfo?.email,
                    passthrough: `{"userId": "${userInfo?.id}", "workspaceId": "${workspace.id}"}`,
                    successCallback: checkoutComplete,
                }
            )
        }
    }, [
        checkoutComplete,
        selectedPlan,
        selectedPlan.productId,
        userInfo?.email,
        userInfo?.firstName,
        userInfo?.id,
        userInfo?.lastName,
        visible,
        workspace.id,
        workspace.type,
        currentSubscription.status
    ]);

    if (workspace.type !== 'Free' && currentSubscription.status === 'Active') {
        return <></>
    }

    return (
        <Modal
            visible={visible}
            onClose={onClose}
            title={false}
            hideCancel
            hideOk
            width="100%"
            wrapClassName="flex items-center"
            bodyClassName="min-h-screen !p-7 dark:bg-white flex items-center w-full"
            closeIcon={<i className="fi fi-rr-cross text-shadow-none text-sm dark:text-slate-900"></i>}
        >
            <div className="max-w-[800px] w-full m-auto flex items-center dark:text-slate-900">
                <div className="flex-1 flex flex-col items-center justify-center">
                    <div className="w-full flex flex-col gap-2">
                        <h2 className="text-3xl">
                            {selectedPlan.icon}
                        </h2>
                        <p className="text-2xl font-bold">{selectedPlan.name}</p>
                        <h3 className="text-2xl font-semibold">
                            ${selectedPlan.price}
                        </h3>
                    </div>
                    <div className="flex w-full mt-5">
                        <span className="font-semibold">
                            Apply for {workspace.name}
                        </span>
                    </div>
                    <div className="w-full mt-5">
                        <h3 className="font-bold">Includes</h3>
                        <div className="flex flex-col gap-2 text-sm mt-3">
                            <div className="flex gap-2 items-center">
                                <i className="fi fi-rr-checkbox"></i>
                                <span>{selectedPlan.formLimit} forms</span>
                            </div>
                            <div className="flex gap-2 items-center">
                                <i className="fi fi-rr-checkbox"></i>
                                <span>{selectedPlan.submissionPerMonth} submissions / month</span>
                            </div>
                            <div className="flex gap-2 items-center">
                                <i className="fi fi-rr-checkbox"></i>
                                <span>{selectedPlan.documentMergePerMonth} document merges / month</span>
                            </div>
                            <div className="flex gap-2 items-center">
                                <i className="fi fi-rr-checkbox"></i>
                                <span>{selectedPlan.fileStorageLimit} storage</span>
                            </div>
                            <div className="flex gap-2 items-center">
                                <i className="fi fi-rr-checkbox"></i>
                                <span>{selectedPlan.workspaceMember} workspace members</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-[450px] flex items-center">
                    <div className="checkout-container w-full" />
                </div>
            </div>
        </Modal>
    );
}

export default UpgradePlanModal;
