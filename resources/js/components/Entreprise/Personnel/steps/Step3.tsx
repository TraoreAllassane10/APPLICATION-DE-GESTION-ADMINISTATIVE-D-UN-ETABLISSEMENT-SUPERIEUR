import { EtudiantFormData } from "@/types";

export function Step3({ data, setData }: { data: EtudiantFormData; setData: (d: EtudiantFormData) => void }) {
  return (
    <div className="space-y-5">
      {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Email">
          <TextInput field="email" data={data} setData={setData} placeholder="etudiant@example.com" type="email" />
        </Field>
        <Field label="Contacts (téléphone)">
          <TextInput field="contacts" data={data} setData={setData} placeholder="+225 07 XX XX XX" />
        </Field>
      </div>

      <Field label="Adresse géographique">
        <TextInput field="adresse_geographique" data={data} setData={setData} placeholder="Quartier, Ville" />
      </Field>

      <Separator />

      <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
        Pièce d'identité
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Nature de la pièce">
          <SelectInput field="nature_piece" data={data} setData={setData} options={NATURES_PIECE} placeholder="Type de pièce" />
        </Field>
        <Field label="Numéro de la pièce">
          <TextInput field="numero_piece" data={data} setData={setData} placeholder="Ex : CI-24-XXXXXXX" />
        </Field>
      </div> */}
    </div>
  )
}