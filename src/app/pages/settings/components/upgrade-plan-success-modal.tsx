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
            <div className="py-16 flex gap-5 flex-col justify-center items-center">
                <div className="w-20 h-20 bg-emerald-700 rounded-full flex justify-center items-center">
                    <i className="fi fi-br-check text-3xl"></i>
                </div>
                <div className="w-full flex flex-col justify-center items-center gap-3">
                    <h1 className="text-2xl font-semibold">Congratulations!</h1>
                    <p className="text-base">
                        You have successfully changed your workspace to plan {selectedPlan.name}.
                    </p>
                    <p className="text-3xl">
                        😍🥳🎉
                    </p>
                </div>
            </div>
        </Modal>
    );
}

export default UpgradePlanSuccessModal;
