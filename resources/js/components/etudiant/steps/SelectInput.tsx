import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { EtudiantFormData } from "@/types";

type StrKey = keyof EtudiantFormData;

function SelectInput({
    field,
    data,
    setData,
    options,
    placeholder,
}: {
    field: StrKey;
    data: EtudiantFormData;
    setData: (d: EtudiantFormData) => void;
    options: string[];
    placeholder?: string;
}) {
    return (
        <Select
            value={(data[field] as string) ?? ''}
            onValueChange={(v) => setData({ ...data, [field]: v || null })}
        >
            <SelectTrigger>
                <SelectValue placeholder={placeholder ?? 'Sélectionner…'} />
            </SelectTrigger>
            <SelectContent>
                {options.map((o) => (
                    <SelectItem key={o} value={o}>
                        {o}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}