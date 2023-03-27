import RestClient from "../configurations/axios-config";
import { FormDataAnalysis } from "../models/form-data-analysis";

function getAnalysis(formCode?: string): Promise<FormDataAnalysis> {
  return RestClient.get<any>(
    "/admin/forms/" + formCode + "/analysis"
  ).then((response) => response.data);
}

const FormDataAnalysisService = {
  getAnalysis
};

export default FormDataAnalysisService;
