export default function InfoRow({
    icon: Icon,
    label,
    value,
}: {
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    value: string | null | undefined;
}) {
    return (
        <div className="flex items-start gap-3 py-2.5">
            <div className="mt-0.5 shrink-0 rounded-md bg-muted p-1.5">
                <Icon className="h-3.5 w-3.5 text-muted-foreground" />
            </div>
            <div className="min-w-0 flex-1">
                <p className="text-[11px] font-semibold tracking-wide text-muted-foreground uppercase">
                    {label}
                </p>
                <p
                    className={`${label == 'Fonction' && 'rounded-full bg-green-100 px-4 text-green-500 ring-1 ring-green-500'} mt-0.5 text-sm font-medium break-words`}
                >
                    {value ? value : <span className="italic">aucun</span>}
                </p>
            </div>
        </div>
    );
}
