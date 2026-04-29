import { EtudiantFormData } from '@/types';
import Field from '../Field';
import TextInput from '../TextInput';

export function Step2({
    data,
    setData,
}: {
    data: EtudiantFormData;
    setData: (d: EtudiantFormData) => void;
}) {
    return (
        <div className="space-y-5">
            <div className="text-md flex place-items-center gap-2">
                <input
                    type="checkbox"
                    value={data['proprietaire']}
                    onChange={(e) =>
                        setData({
                            ...data,
                            ['proprietaire']: !data.proprietaire,
                        })
                    }
                    className="h-4 w-4"
                />
                <label htmlFor="">Est-il proprietaire de son entreprise</label>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Nom de son entreprise">
                    <TextInput
                        field="nom_entreprise"
                        data={data}
                        setData={setData}
                        disabled={!data.proprietaire}
                    />
                </Field>
                <Field label="Numero registre de commerce">
                    <TextInput
                        field="numero_registre_commerce"
                        data={data}
                        setData={setData}
                        disabled={!data.proprietaire}
                    />
                </Field>
            </div>
        </div>
    );
}
