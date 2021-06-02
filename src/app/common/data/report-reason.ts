export enum ReportReason {
    INAPPROPRIATE_CONTENT = "კონტენტი მიუღებელია",
    OFFENSIVE_CONTENT = "კონტენტი შეურაწმყოფელია",
    IRRELEVANT = "კონტენტი არააქტუალურია"
}

export const reportReasons: Map<ReportReason, string> = new Map([
    [ReportReason.INAPPROPRIATE_CONTENT, "INAPPROPRIATE_CONTENT"],
    [ReportReason.OFFENSIVE_CONTENT, "OFFENSIVE_CONTENT"],
    [ReportReason.IRRELEVANT, "IRRELEVANT"],
])