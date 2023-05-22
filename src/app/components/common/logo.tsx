import logoBlue from "../../../assets/images/formini-logo-blue.svg";
import logo from "../../../assets/images/formini-logo.svg";
import { useAppSelector } from "../../hooks/redux-hook";
import { selectTheme } from "../../slices/app-config";

function Logo() {

    const theme = useAppSelector(selectTheme);

    return (
        <h1 className="w-24 select-none flex justify-center items-center">
            {
                theme === 'dark' &&
                <img src={logo} alt="logo" className="w-full"/>
            }
            {
                theme !== 'dark' &&
                <img src={logoBlue} alt="logo" className="w-full"/>
            }
        </h1>
    );
}

export default Logo;
