import { StatutEtudiant } from "../types/etudiant.types";


export const statutConfig: Record<StatutEtudiant, { className: string; dotClass: string }> = {
  Affecté:   { className: 'bg-emerald-50 text-emerald-700 border border-emerald-200', dotClass: 'bg-emerald-500' },
  Naff:      { className: 'bg-rose-50 text-rose-700 border border-rose-200',          dotClass: 'bg-rose-500'    },
  Réaffecté: { className: 'bg-blue-50 text-blue-700 border border-blue-200',          dotClass: 'bg-blue-500'    },
  Transfert: { className: 'bg-amber-50 text-amber-700 border border-amber-200',       dotClass: 'bg-amber-500'   },
}

function StatutBadge({ statut }: { statut: StatutEtudiant }) {
  const { className, dotClass } = statutConfig[statut]
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold ${className}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dotClass}`} />
      {statut}
    </span>
  )
}

export default StatutBadge;