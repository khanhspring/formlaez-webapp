import { useParams } from "react-router-dom";
import Empty from "../../components/common/empty";
import PageTitle from "../../components/layout/page-title";
import useFormDataAnalysis from "../../hooks/form-data-analysis/useFormDataAnalysis";
import useForm from "../../hooks/form/useForm";
import { firstLetters } from "../../util/string-utils";
import AnalysisChart from "./components/analysis-charts/analysis-chart";
import FormPageMenu from "./components/form-page-menu";
import FormPageTitle from "./components/form-page-title";
import FormPageTitlePrefix from "./components/form-page-title-prefix";

function FormDataAnalysis() {

    const params = useParams();
    const { data: form } = useForm(params.formCode);
    const { data: analysis } = useFormDataAnalysis(params.formCode);

    return (
        <div className="flex-1 w-full flex flex-col gap-2">
            <PageTitle
                title={<FormPageTitle form={form} />}
                actions={<FormPageMenu form={form} />}
                shortTitle={firstLetters(form?.title)?.toUpperCase()}
                prefix={<FormPageTitlePrefix form={form} />}
            />
            <div className="flex-1 flex flex-col items-center w-full pt-5 gap-5">
                {
                    (analysis && analysis.count > 0 && analysis?.items) &&
                    <div className="max-w-4xl w-full flex flex-col gap-5">
                        <div className="w-full flex items-center justify-start py-3 px-5 font-bold bg-zinc-50 dark:bg-steel-gray-900 rounded">
                            <span>
                                {analysis?.count} submission{analysis?.count && analysis?.count > 1 ? 's' : ''}
                            </span>
                        </div>
                        <div className="w-full flex flex-col items-center justify-between gap-5">
                            {
                                analysis && analysis?.count > 0 && analysis?.items.map((item, index) =>
                                    <AnalysisChart analysisItem={item} key={index} />
                                )
                            }
                        </div>
                    </div>
                }

                {
                    (!analysis || analysis?.count === 0 || !analysis?.items) &&
                    <div className="flex-1 w-full flex flex-col items-center justify-center">
                        <Empty description="No data for analysis" />
                    </div>
                }
            </div>
        </div>
    );
}

export default FormDataAnalysis;
