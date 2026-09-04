export default function StatutInscriptionBadge({ statut }: { statut: string }) {
    return (
        <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold`}
        >
            <span className={`h-1.5 w-1.5 rounded-full`} />
            {statut}
        </span>
    );
}