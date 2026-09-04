import { Input } from "@/components/ui/input";
import { EtudiantFormData } from "@/types";

type StrKey = keyof EtudiantFormData;

export default function TextInput({
    field,
    data,
    setData,
    placeholder,
    type = 'text',
    disabled,
}: {
    field: StrKey;
    data: EtudiantFormData;
    setData: (d: EtudiantFormData) => void;
    placeholder?: string;
    type?: string;
    disabled?: boolean;
}) {
    return (
        <Input
            type={type}
            placeholder={placeholder}
            disabled={disabled}
            value={(data[field] as string) ?? ''}
            onChange={(e) =>
                setData({ ...data, [field]: e.target.value || null })
            }
        />
    );
}