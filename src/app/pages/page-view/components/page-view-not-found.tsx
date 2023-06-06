import { Link } from "react-router-dom";
import Button from "../../../components/common/button";

function PageViewNotFound() {
    return (
        <div className="min-h-[100vh] flex flex-col items-center justify-center">
            <div className="flex items-center justify-center text-lg">
                <span>Page not found or unavailable</span>
            </div>
            <Link to={`/`} className="mt-5">
                <Button className="px-2 py-1 text-sm">Create your own now</Button>
            </Link>
        </div>
    );
}

export default PageViewNotFound;
