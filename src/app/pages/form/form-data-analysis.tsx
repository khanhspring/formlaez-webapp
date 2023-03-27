import { useParams } from "react-router-dom";
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
        <div className="w-full flex flex-col gap-2">
            <PageTitle
                title={<FormPageTitle form={form} />}
                actions={<FormPageMenu form={form} />}
                shortTitle={firstLetters(form?.title)?.toUpperCase()}
                prefix={<FormPageTitlePrefix form={form} />}
            />
            <div className="flex flex-col items-center w-full">
                <div className="flex flex-col items-center justify-between max-w-4xl w-full gap-5">
                    {
                        analysis?.items.map((item, index) =>
                            <AnalysisChart analysisItem={item} key={index} />
                        )
                    }
                </div>
            </div>
        </div>
    );
}

export default FormDataAnalysis;
