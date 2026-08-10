import { EtudiantFormData } from "@/types";
import TextInput from "./TextInput";
import { SERIES_BAC } from "../EtudiantForm";
import SelectInput from "@/components/Entreprise/Personnel/SelectInput";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { BookOpen } from "lucide-react";
import Field from "./Field";

export default function Step2({
    data,
    setData,
}: {
    data: EtudiantFormData;
    setData: (d: EtudiantFormData) => void;
}) {
    return (
        <div className="space-y-5">
            <Field label="Établissement d'origine">
                <TextInput
                    field="etablissement_origine"
                    data={data}
                    setData={setData}
                    placeholder="Lycée / École de provenance"
                />
            </Field>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <Field label="Série du BAC">
                    <SelectInput
                        field="serie_bac"
                        data={data}
                        setData={setData}
                        options={SERIES_BAC}
                        placeholder="Série"
                    />
                </Field>
                <Field label="Année d'obtention">
                    <TextInput
                        field="annee_obtention_bac"
                        data={data}
                        setData={setData}
                        placeholder="Ex : 2022"
                        type="number"
                    />
                </Field>
                <Field label="N° de table BAC">
                    <TextInput
                        field="numero_table_bac"
                        data={data}
                        setData={setData}
                        placeholder="Ex : 22-0123-A"
                    />
                </Field>
            </div>

            <Alert className="border-muted bg-muted/40">
                <BookOpen className="h-4 w-4" />
                <AlertDescription className="text-sm text-muted-foreground">
                    Ces informations servent à vérifier l'authenticité du
                    diplôme et à valider l'admission.
                </AlertDescription>
            </Alert>
        </div>
    );
}
