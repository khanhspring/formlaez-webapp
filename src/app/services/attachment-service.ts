import RestClient from "../configurations/axios-config";
import { PresignedUrl } from "../models/attachment";

function getDownloadUrl(code: string): Promise<PresignedUrl> {
  return RestClient.get<any>("/admin/attachments/" + code + "/download-url").then(
    (response) => response.data
  );
}

const AttachmentService = {
  getDownloadUrl
};

export default AttachmentService;