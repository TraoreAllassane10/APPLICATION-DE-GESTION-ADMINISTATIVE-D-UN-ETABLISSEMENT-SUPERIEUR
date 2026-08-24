
type Mention = 'Très Bien' | 'Bien' | 'Assez Bien' | 'Passable' | 'Ajourné';

export const getMentionConfig = (
    mention: Mention,
): { label: string; className: string } => {
    switch (mention) {
        case 'Très Bien':
            return {
                label: 'Très Bien',
                className:
                    'bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800',
            };
        case 'Bien':
            return {
                label: 'Bien',
                className:
                    'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800',
            };
        case 'Assez Bien':
            return {
                label: 'Assez Bien',
                className:
                    'bg-sky-100 text-sky-800 border-sky-200 dark:bg-sky-900/30 dark:text-sky-400 dark:border-sky-800',
            };
        case 'Passable':
            return {
                label: 'Passable',
                className:
                    'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800',
            };
        case 'Ajourné':
            return {
                label: 'Ajourné',
                className:
                    'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800',
            };
    }
};

export const getMoyenneColor = (moyenne: number): string => {
    if (moyenne >= 16)
        return 'text-emerald-600 dark:text-emerald-400 font-semibold';
    if (moyenne >= 14) return 'text-blue-600 dark:text-blue-400 font-semibold';
    if (moyenne >= 12) return 'text-sky-600 dark:text-sky-400 font-semibold';
    if (moyenne >= 10)
        return 'text-amber-600 dark:text-amber-400 font-semibold';
    return 'text-red-600 dark:text-red-400 font-semibold';
};

export const formatRang = (rang: number): string => {
    if (rang === 1) return '1er';
    return `${rang}e`;
};
