import logoBlack from "../../../assets/images/logo-d.svg";
import logo from "../../../assets/images/logo-w.svg";
import { useAppSelector } from "../../hooks/redux-hook";
import { selectTheme } from "../../slices/app-config";

function Logo() {

    const theme = useAppSelector(selectTheme);

    return (
        <h1 className="w-20 select-none flex justify-center items-center">
            {
                theme === 'dark' &&
                <img src={logo} alt="logo" className="w-full"/>
            }
            {
                theme !== 'dark' &&
                <img src={logoBlack} alt="logo" className="w-full"/>
            }
        </h1>
    );
}

export default Logo;
