import { Label } from '@/components/ui/label';

const Field = ({
    label,
    required,
    children,
}: {
    label: string;
    required?: boolean;
    children: React.ReactNode;
}) => {
    return (
        <div>
            <Label className="text-sm">
                {label}
                {required && <span className="ml-0.5 text-destructive">*</span>}
            </Label>
            {children}
        </div>
    );
};

export default Field;
