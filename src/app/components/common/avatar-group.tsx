import Tooltip from 'rc-tooltip';
import { FC } from 'react';
import Avatar from './avatar';

type Props = {
    className?: string;
    wrapClassName?: string;
    users: string[]
}

const AvatarGroup: FC<Props> = ({ className, wrapClassName, users = [] }) => {

    let items;
    if (users.length <= 5) {
        items = users;
    } else {
        items = users.slice(0, 5);
    }

    return (
        <div className={`flex gap-[2px] items-center ${wrapClassName}`}>
            {
                items.map((name, index) =>
                    <Tooltip overlay={name} placement="bottom" key={index}>
                        <div>
                            <Avatar className={className} name={name} />
                        </div>
                    </Tooltip>
                )
            }
            {
                users.length > 5 &&
                <Avatar className={className} name={"+" + (users.length - 5)} />
            }
        </div>
    );
}

export default AvatarGroup;
