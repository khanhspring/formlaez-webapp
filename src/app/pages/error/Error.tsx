import { Link } from "react-router-dom";
import Button from "../../components/common/button";

function Error() {
    return (
        <div className="min-h-[100vh] flex flex-col items-center justify-center">
            <div className="flex items-center justify-center text-lg">
                <span>Something went wrong. Please try again.</span>
            </div>
            <Link to={"/"} className="mt-5">
                <Button className="px-2 py-1 text-sm">Back to homepage</Button>
            </Link>
        </div>
    );
}

export default Error;
