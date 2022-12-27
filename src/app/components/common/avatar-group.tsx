import { FC } from 'react';
import Avatar from './avatar';

type Props = {
    className?: string;
    wrapClassName?: string;
}

const AvatarGroup: FC<Props> = ({ className, wrapClassName }) => {
    return (
        <div className={`flex gap-[2px] items-center ${wrapClassName}`}>
            <Avatar className={className} name="Nguyễn Thị Thu Trang"/>
            <Avatar className={className} name="Trần Xuân Khánh"/>
            <Avatar className={className} name="Nguyễn Văn An"/>
            <Avatar className={className} name="Lê Thu Hà"/>
            <Avatar className={className} name="Nguyễn Văn Nam"/>
        </div>
    );
}

export default AvatarGroup;
