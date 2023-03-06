import { useEffect } from 'react';
import { useAppSelector } from '../../hooks/redux-hook';
import { selectUserInfo } from '../../slices/auth';
const Paddle = (window as any).Paddle;

const Checkout = () => {

    const userInfo = useAppSelector(selectUserInfo);

    useEffect(() => {
        Paddle.Checkout.open(
            {
                method: 'inline', // set to `inline`
                product: 46383, // replace with a product ID or plan ID
                allowQuantity: true,
                disableLogout: true,
                frameTarget: 'checkout-container', // className of your checkout <div>
                frameInitialHeight: 450, // `450` or above
                frameStyle: 'width:100%; min-width:312px; background-color: transparent; border: none;', // `min-width` must be set to `286px` or above with checkout padding off; `312px` with checkout padding on.
                email: '', // TODO
                passthrough: `{"user_id": ${userInfo?.id}, "firstName": ${userInfo?.firstName}, "lastName": ${userInfo?.lastName}}`
            }
        )
    })

    return (
        <div className="checkout-container">

        </div>
    )
}

export default Checkout;