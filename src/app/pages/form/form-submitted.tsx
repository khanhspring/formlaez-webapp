import { Link, useParams } from "react-router-dom";
import Button from "../../components/common/button";
import usePublishedForm from "../../hooks/form/usePublishedForm";

function FormSubmitted() {

    const params = useParams();
    const { data: form } = usePublishedForm(params.formCode);

    return (
        <div className="w-full min-h-screen flex flex-col">
            <div className="flex-1 container max-w-[550px] m-auto flex flex-col items-center mt-28">
                <h1 className="text-4xl font-bold text-center">{form?.title}</h1>
                <div className="text-center mt-10 text-xl">
                    <p>
                        Thanks for completing this form.
                    </p>
                    <p>
                        Now create your own — it's free, easy, & beautiful
                    </p>
                </div>
                <div className="flex justify-center mt-10">
                    <Link to={"/"} target="_blank">
                        <Button className="gap-4 px-4">
                            <span className="text-lg">Create a form now</span>
                            <i className="fi fi-rr-arrow-right text-xl"></i>
                        </Button>
                    </Link>
                </div>
            </div>
            <div className="w-full flex justify-center">
                <div className="mx-auto h-10 flex items-center justify-center gap-2 dark:text-gray-300 text-xs">
                    <span>2023©</span>
                    <a href="https://formlaez.com" rel="noreferrer" target="_blank" className="hover:text-sky-500">Formlaez.com</a>
                </div>
            </div>
        </div>
    );
}

export default FormSubmitted;
