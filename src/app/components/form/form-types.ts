const FIELD_STATUSES = ["success", "warning", "error"] as const;
export type FieldStatus = typeof FIELD_STATUSES[number];