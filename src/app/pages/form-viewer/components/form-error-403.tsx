import { FC } from "react";
import { Link } from "react-router-dom";
import Button from "../../../components/common/button";
import FormSkeleton from "./form-skeleton";

type Props = {

}

const FormError403: FC<Props> = ({ }) => {

    return (
        <div className='flex justify-center w-full'>
            <FormSkeleton />
            <div className="flex justify-center items-center fixed top-0 left-0 bottom-0 right-0 w-full h-screen">
                <div className="w-full max-w-[420px] h-[300px] bg-slate-100 dark:bg-steel-gray-950 rounded-lg shadow flex flex-col items-center justify-center gap-5 p-5">
                    <i className="fi fi-rr-exclamation text-3xl"></i>
                    <h2 className="text-md text-center">
                        This form is no longer accepting submissions or the form owner has restricted access,
                        please contact the form owner for more information.
                    </h2>
                    <Link to={"/"}>
                        <Button>
                            Go to home page
                            <i className="fi fi-rr-arrow-right"></i>
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default FormError403;
