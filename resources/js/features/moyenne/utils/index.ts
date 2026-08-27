export function formatNote(valeur: number | null): string {
    if (valeur === null) return '—';
    return valeur.toFixed(2);
}