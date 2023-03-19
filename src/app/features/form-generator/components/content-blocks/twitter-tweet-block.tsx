import { FC } from "react";
import {TwitterTweetEmbed} from "react-twitter-embed";
import Loading from "../../../../components/common/loading";
import { useAppSelector } from "../../../../hooks/redux-hook";
import { selectTheme } from "../../../../slices/app-config";

type Props = {
    url?: string;
}

const TwitterTweetBlock: FC<Props> = ({ url }) => {

    const theme = useAppSelector(selectTheme);
    const options: any = {};
    if (theme === 'dark') {
        options['theme'] = 'dark'
    }

    if (!url) {
        return <></>
    }

    return (
        <div className="w-full mt-1 mb-2 flex justify-center">
            <div className="max-w-[470px] w-full">
                <TwitterTweetEmbed
                    tweetId={url}
                    placeholder={<div className="w-full flex justify-center"><Loading /></div>}
                    options={options}
                />
            </div>
        </div>
    );
}

export default TwitterTweetBlock;
