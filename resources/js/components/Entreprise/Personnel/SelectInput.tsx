import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { PersonnelFormData } from '@/types';

type StrKey = keyof PersonnelFormData;

const SelectInput = ({
    field,
    data,
    setData,
    options,
    placeholder,
}: {
    field: StrKey;
    data: PersonnelFormData;
    setData: (d: PersonnelFormData) => void;
    options: string[];
    placeholder?: string;
}) => {
    return (
        <Select
        value={(data[field] as string ?? '')}
        onValueChange={v => setData({ ...data, [field]: v || null })}
        >
            <SelectTrigger>
                <SelectValue placeholder={placeholder ?? 'Sélectionner...'} />
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
};

export default SelectInput;
