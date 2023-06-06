import { useParams } from "react-router-dom";
import usePublishedPageView from "../../hooks/page-views/usePublishedPageView";
import JobBoardPageView from "./components/job-board-page-view";
import PageViewNotFound from "./components/page-view-not-found";
import SimpleListPageView from "./components/simple-list-page-view";

function PageView() {

    const params = useParams();
    const { data: pageView, error } = usePublishedPageView(params.pageViewCode);

    if (error) {
        return (
            <PageViewNotFound />
        );
    }

    return (
        <div>
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
