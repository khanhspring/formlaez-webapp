import logoBlack from "../../../assets/images/logo-dark.svg";
import logo from "../../../assets/images/logo-w.svg";
import { useAppSelector } from "../../hooks/redux-hook";
import { selectTheme } from "../../slices/app-config";

function Logo() {

    const theme = useAppSelector(selectTheme);

    return (
        <h1 className="w-full select-none flex justify-center items-center font-black text-sm">
            {
                theme === 'dark' &&
                <img src={logo} alt="logo"/>
            }
            {
                theme !== 'dark' &&
                <img src={logoBlack} alt="logo"/>
            }
        </h1>
    );
}

export default Logo;
