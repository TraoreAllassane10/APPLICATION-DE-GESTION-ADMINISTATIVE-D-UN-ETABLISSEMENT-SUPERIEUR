export default function InfoField({
    icon: Icon,
    label,
    value,
}: {
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    value: string;
}) {
    return (
        <div className="flex items-start gap-3 rounded-lg bg-muted/40 p-3">
            <div className="rounded-md border bg-background p-1.5">
                <Icon className="h-3.5 w-3.5 text-muted-foreground" />
            </div>
            <div>
                <p className="text-[11px] font-semibold tracking-wide text-muted-foreground uppercase">
                    {label}
                </p>
                <p className="mt-0.5 text-sm font-medium">{value}</p>
            </div>
        </div>
    );
}