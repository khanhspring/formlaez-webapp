import { useQuery } from "@tanstack/react-query";
import AttachmentService from "../../services/attachment-service";

export default function useAttachmentDownloadUrl(code: string) {
  return useQuery({
    queryKey: ["attachment-download-url", code],
    queryFn: () => AttachmentService.getDownloadUrl(code),
    enabled: !!code
  });
}
