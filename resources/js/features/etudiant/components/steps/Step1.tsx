import SelectInput from '@/components/Entreprise/Personnel/SelectInput';
import { EtudiantFormData } from '@/types';
import {
    CIVILITES,
    GENRES,
    NATIONALITES,
    PAYS,
    STATUTS,
} from '../EtudiantForm';
import Field from './Field';
import TextInput from './TextInput';
import ImageUploader from './ImageUploader';

export default function Step1({
    data,
    setData,
    isEdit,
}: {
    data: EtudiantFormData;
    setData: (d: EtudiantFormData) => void;
    isEdit: boolean;
}) {
 
    return (
        <div className="space-y-5">
           <Field label=''>
              <ImageUploader data={data} setData={setData}   />
           </Field>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                <Field label="Civilité" required>
                    <SelectInput
                        field="civilite"
                        data={data}
                        setData={setData}
                        options={CIVILITES}
                    />
                </Field>
                <Field label="Genre" required>
                    <SelectInput
                        field="genre"
                        data={data}
                        setData={setData}
                        options={GENRES}
                    />
                </Field>
                <Field label="Statut" required>
                    <SelectInput
                        field="statut"
                        data={data}
                        setData={setData}
                        options={STATUTS}
                    />
                </Field>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Nom" required>
                    <TextInput
                        field="nom"
                        data={data}
                        setData={setData}
                        placeholder="En majuscules"
                    />
                </Field>
                <Field label="Prénom" required>
                    <TextInput
                        field="prenom"
                        data={data}
                        setData={setData}
                        placeholder="Prénom(s)"
                    />
                </Field>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Date de naissance" required>
                    <TextInput
                        field="date_naissance"
                        data={data}
                        setData={setData}
                        type="date"
                    />
                </Field>
                <Field label="Lieu de naissance" required>
                    <TextInput
                        field="lieu_naissance"
                        data={data}
                        setData={setData}
                        placeholder="Ville"
                    />
                </Field>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Nationalité" required>
                    <SelectInput
                        field="nationnalite"
                        data={data}
                        setData={setData}
                        options={NATIONALITES}
                    />
                </Field>
                <Field label="Pays de résidence">
                    <SelectInput
                        field="pays_residence"
                        data={data}
                        setData={setData}
                        options={PAYS}
                        placeholder="Sélectionner un pays"
                    />
                </Field>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="IP (identifiant permanent)" required>
                    <TextInput
                        field="ip"
                        data={data}
                        setData={setData}
                        placeholder="ETU-2024-XXX"
                        disabled={isEdit}
                    />
                    {isEdit && (
                        <p className="mt-1 text-xs text-muted-foreground">
                            L'identifiant permanent ne peut pas être modifié.
                        </p>
                    )}
                </Field>
                <Field label="Matricule secondaire">
                    <TextInput
                        field="matricule_secondaire"
                        data={data}
                        setData={setData}
                        placeholder="Optionnel"
                    />
                </Field>
            </div>
        </div>
    );
}
