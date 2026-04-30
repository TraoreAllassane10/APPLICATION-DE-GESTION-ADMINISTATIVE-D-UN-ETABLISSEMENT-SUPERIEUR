import { Input } from '@/components/ui/input';
import { PersonnelFormData } from '@/types';

type StrKey = keyof PersonnelFormData;

function TextInput({
    field,
    data,
    setData,
    placeholder,
    type = 'text',
    disabled,
}: {
    field: StrKey;
    data: PersonnelFormData;
    setData: (d: PersonnelFormData) => void;
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
            onChange={e => setData({...data, [field] : e.target.value || null})}
        />
    );
}

export default TextInput;
