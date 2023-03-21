import RestClient from "../configurations/axios-config";
import { WorkspaceUsageStatistic } from "../models/workspace-usage";

function getCurrentUsage(workspaceId: number): Promise<WorkspaceUsageStatistic> {
    return RestClient.get<any>("/admin/workspaces/" + workspaceId + "/usage").then(
      (response) => response.data
    );
}

const WorkspaceUsageService = {
    getCurrentUsage
};

export default WorkspaceUsageService;