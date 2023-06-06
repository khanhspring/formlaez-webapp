import { useParams } from "react-router-dom";
import usePublishedPageView from "../../hooks/page-views/usePublishedPageView";
import JobBoardPageView from "./components/job-board-page-view";
import PageViewNotFound from "./components/page-view-not-found";
import SimpleListPageView from "./components/simple-list-page-view";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hook";
import { changeTheme, selectTheme } from "../../slices/app-config";
import { useState } from "react";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";

function PageView() {

    const params = useParams();
    const { data: pageView, error } = usePublishedPageView(params.pageViewCode);

    const dispatch = useAppDispatch();
    const currentTheme = useAppSelector(selectTheme);
    const [theme, setTheme] = useState<'dark' | 'light'>(currentTheme);

    const onThemeSelect = () => {
        if (theme === 'dark') {
            setTheme('light');
            dispatch(changeTheme('light'));
        } else {
            setTheme('dark');
            dispatch(changeTheme('dark'));
        }
    }

    if (error) {
        return (
            <PageViewNotFound />
        );
    }

    const themSwitcher = (
        <div className='flex items-center justify-center gap-2 absolute top-5 right-5'>
            <div
                onClick={onThemeSelect}
                className="w-9 h-9 p-2 text-lg rounded-full flex items-center justify-center transition cursor-pointer text-slate-900 bg-white/70 dark:text-white dark:bg-slate-800/70 hover:bg-white dark:hover:bg-slate-800 border border-bg-slate-900 dark:border-transparent group"
            >
                {theme !== 'dark' && <MoonIcon className="w-5 h-5" />}
                {theme === 'dark' && <SunIcon className="w-5 h-5" />}
            </div>
        </div>
    )

    return (
        <div>
            {themSwitcher}
            {
                pageView && pageView.template.code === 'SimpleList' &&
                <SimpleListPageView
                    pageView={pageView}
                />
            }
            {
                pageView && pageView.template.code === 'JobBoard' &&
                <JobBoardPageView
                    pageView={pageView}
                />
            }
        </div>
    );
}

export default PageView;
