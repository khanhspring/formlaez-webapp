import { FC } from "react";
import Modal from "../../../components/common/modal";
import { Plans } from "../../../constants/plans";

type Props = {
    visible: boolean;
    onClose: () => void;
    plan: string;
}
const UpgradePlanSuccessModal: FC<Props> = ({ visible, onClose, plan }) => {

    const selectedPlan = Plans[plan];

    return (
        <Modal
            visible={visible}
            onClose={onClose}
            title={false}
            hideCancel
            hideOk
        >
            <div className="p-10 py-16 flex gap-5">
                <div className="w-20 h-20 bg-emerald-700 rounded-full flex justify-center items-center">
                    <i className="fi fi-br-check text-3xl"></i>
                </div>
                <div className="flex-1 flex items-center">
                    <p className="text-lg font-semibold">
                        Congratulations! You have successfully upgraded your workspace to plan {selectedPlan.name}.
                    </p>
                </div>
            </div>
        </Modal>
    );
}

export default UpgradePlanSuccessModal;
