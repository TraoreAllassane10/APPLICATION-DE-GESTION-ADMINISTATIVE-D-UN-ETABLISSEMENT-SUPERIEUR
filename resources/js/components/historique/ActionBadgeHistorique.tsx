export default function ActionBadgeHistorique({
    action,
    getActionConfig,
}: {
    action: string;
    getActionConfig: any;
}) {
    const { icon: Icon, className, dotClass } = getActionConfig(action);
    return (
        <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ${className}`}
        >
            <span className={`h-1.5 w-1.5 rounded-full ${dotClass}`} />
            {action}
        </span>
    );
}
