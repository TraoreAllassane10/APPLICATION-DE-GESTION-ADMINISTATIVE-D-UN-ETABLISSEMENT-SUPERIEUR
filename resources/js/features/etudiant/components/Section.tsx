import { Card, CardContent } from "@/components/ui/card";


export default function Section({
    title,
    children,
}: {
    title: string;
    children: React.ReactNode;
}) {
    return (
        <div>
            <p className="mb-1 text-xs font-bold tracking-wider text-muted-foreground uppercase">
                {title}
            </p>
            <Card className="overflow-hidden shadow-sm">
                <CardContent className="divide-y-0 p-4">{children}</CardContent>
            </Card>
        </div>
    );
}