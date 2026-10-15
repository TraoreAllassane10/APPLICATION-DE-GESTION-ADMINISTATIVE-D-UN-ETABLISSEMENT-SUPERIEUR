export function formatNote(valeur: number | null): string {
    if (valeur === null) return 'NC';
    return valeur.toFixed(2);
}

export const formatAppreciation = (appreciation: string) => {
    switch (appreciation) {
        case 'Insuffisant':
            return 'bg-red-50 text-red-500';
        case 'Médiocre':
            return 'bg-yellow-50 text-yellow-500';
        case 'Passable':
            return 'bg-pink-50 text-pink-500';
        case 'Bien':
            return 'bg-blue-50 text-blue-500';
        case 'Assez bien':
            return 'bg-orange-50 text-orange-500';
        case 'Très bien':
            return 'bg-green-50 text-green-500';
        default : 
            return "bg-purple-50 text-purple-500"
    }
};
