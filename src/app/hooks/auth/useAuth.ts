import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { auth } from "../../configurations/firebase";
import { UserInfo, setAuthenticated, setUserId, setUserInfo } from "../../slices/auth";
import { useAppDispatch } from "../redux-hook";

export const useAuth = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const fullName = user.displayName || '';
        const fullNameArr: string[] = fullName.split(" ");
        const lastName = fullNameArr[fullNameArr.length - 1];
        fullNameArr[fullNameArr.length - 1] = "";
        const firstName = fullNameArr.join(" ");

        const userInfo: UserInfo = {
            id: user.uid,
            email: user.email || '',
            firstName: firstName,
            lastName: lastName
        }

        dispatch(setUserInfo(userInfo));
        dispatch(setUserId(user.uid));
        dispatch(setAuthenticated(true));
      } else {
        dispatch(setAuthenticated(false));
      }
    });
    return unsubscribe;
  }, [dispatch]);
};
