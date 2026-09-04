export function formatNote(valeur: number | null): string {
    if (valeur === null) return 'NC';
    return valeur.toFixed(2);
}