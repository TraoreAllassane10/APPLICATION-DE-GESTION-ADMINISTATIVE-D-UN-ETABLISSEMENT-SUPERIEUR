import { PersonnelFormData } from '@/types';
import Field from '../Field';
import SelectInput from '../SelectInput';
import TextInput from '../TextInput';

export type Genre = 'Masculin' | 'Féminin';

export const GENRES: Genre[] = ['Masculin', 'Féminin'];

export const NATIONALITES = [
    'Ivoirienne',
    'Burkinabè',
    'Malienne',
    'Guinéenne',
    'Sénégalaise',
    'Togolaise',
    'Béninoise',
    'Nigériane',
    'Ghanéenne',
    'Autre',
];

export function Step1({
    data,
    setData,
    isEdit,
}: {
    data: PersonnelFormData;
    setData: (d: PersonnelFormData) => void;
    isEdit: boolean;
}) {
    return (
        <div className="space-y-5">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                <Field label="Nom" required>
                    <TextInput field="nom" data={data} setData={setData} />
                </Field>
                <Field label="Prenoms" required>
                    <TextInput field="prenom" data={data} setData={setData} />
                </Field>
                <Field label="Genre" required>
                    <SelectInput
                        field="genre"
                        data={data}
                        setData={setData}
                        options={GENRES}
                    />
                </Field>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                <Field label="Date de naissance" required>
                    <TextInput
                        field="date_naissance"
                        type="date"
                        data={data}
                        setData={setData}
                    />
                </Field>

                <Field label="Lieu de naissance" required>
                    <TextInput
                        field="lieu_naissance"
                        data={data}
                        setData={setData}
                    />
                </Field>

                <Field label="Nationnalité" required>
                    <SelectInput
                        field="nationalite"
                        data={data}
                        setData={setData}
                        options={NATIONALITES}
                    />
                </Field>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                <Field label="Fonction" required>
                    <TextInput field="fonction" data={data} setData={setData} />
                </Field>

                <Field label="Matricule">
                    <TextInput
                        field="matricule"
                        data={data}
                        setData={setData}
                    />
                </Field>

                <Field label="Situation matrimoniale">
                    <TextInput
                        field="situation_matrimoniale"
                        data={data}
                        setData={setData}
                    />
                </Field>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                <Field label="Telephone">
                    <TextInput
                        field="telephone"
                        data={data}
                        setData={setData}
                    />
                </Field>

                <Field label="Nombre d'enfant">
                    <TextInput
                        field="nombre_enfant"
                        type="number"
                        data={data}
                        setData={setData}
                    />
                </Field>

                <Field label="Nombre d'enfant en charge">
                    <TextInput
                        field="nombre_enfant_charge"
                        type="number"
                        data={data}
                        setData={setData}
                    />
                </Field>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                <Field label="Email">
                    <TextInput
                        field="email"
                        type="email"
                        data={data}
                        setData={setData}
                    />
                </Field>

                <Field label="BP">
                    <TextInput field="bp" data={data} setData={setData} />
                </Field>

                <Field label="RIB de l'employé">
                    <TextInput field="rib" data={data} setData={setData} />
                </Field>
            </div>
        </div>
    );
}
