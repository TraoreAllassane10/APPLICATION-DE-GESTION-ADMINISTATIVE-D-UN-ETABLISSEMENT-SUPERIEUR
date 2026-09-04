import { Alert, AlertDescription } from "@/components/ui/alert";
import { EtudiantFormData } from "@/types";
import { Users } from "lucide-react";
import Field from "./Field";
import SelectInput from "@/components/Entreprise/Personnel/SelectInput";
import { TYPES_RESPONSABLE } from "../EtudiantForm";
import TextInput from "./TextInput";


export default function Step4({
    data,
    setData,
}: {
    data: EtudiantFormData;
    setData: (d: EtudiantFormData) => void;
}) {
    return (
        <div className="space-y-5">
            <Alert className="border-muted bg-muted/40">
                <Users className="h-4 w-4" />
                <AlertDescription className="text-sm text-muted-foreground">
                    Ces informations sont optionnelles mais recommandées pour le
                    contact d'urgence.
                </AlertDescription>
            </Alert>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Type de responsable">
                    <SelectInput
                        field="type_responsable"
                        data={data}
                        setData={setData}
                        options={TYPES_RESPONSABLE}
                        placeholder="Père / Mère / Tuteur…"
                    />
                </Field>
                <Field label="Nom du responsable">
                    <TextInput
                        field="nom_responsable"
                        data={data}
                        setData={setData}
                        placeholder="Nom et prénom"
                    />
                </Field>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Numéro du responsable">
                    <TextInput
                        field="numero_responsable"
                        data={data}
                        setData={setData}
                        placeholder="+225 07 XX XX XX"
                    />
                </Field>
                <Field label="Profession du responsable">
                    <TextInput
                        field="profession_responsable"
                        data={data}
                        setData={setData}
                        placeholder="Ex : Ingénieur"
                    />
                </Field>
            </div>
        </div>
    );
}