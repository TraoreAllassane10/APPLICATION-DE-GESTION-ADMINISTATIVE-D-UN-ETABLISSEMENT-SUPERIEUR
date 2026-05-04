import { BookOpen, CheckCircle2, Paperclip, Phone, User, Users } from 'lucide-react';

export const STEPS = [
    {
        id: 1,
        label: 'Identité',
        description: 'Informations personnelles',
        icon: User,
    },
    {
        id: 2,
        label: 'Entreprise',
        description: 'Informations sur son entreprise',
        icon: BookOpen,
    },
    { id: 3, label: 'Formation', description: 'Formations', icon: Phone },
    {
        id: 4,
        label: 'Experience Professionnelle',
        description: 'Experiences professionnelles',
        icon: Users,
    },
    {
        id: 5,
        label: 'Documents',
        description: 'Pièces jointes',
        icon: Paperclip,
    },
];

export function Stepper({ current }: { current: number }) {
    return (
        <div className="mb-8 flex flex-wrap items-center justify-center gap-y-4">
            {STEPS.map((s, i) => {
                const done = current > s.id;
                const active = current === s.id;
                const Icon = s.icon;
                return (
                    <div key={s.id} className="flex items-center">
                        <div className="flex flex-col items-center gap-1.5">
                            <div
                                className={`flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 ${done ? 'bg-primary text-primary-foreground' : ''} ${active ? 'bg-primary text-primary-foreground ring-4 ring-primary/20' : ''} ${!done && !active ? 'bg-muted text-muted-foreground' : ''} `}
                            >
                                {done ? (
                                    <CheckCircle2 className="h-5 w-5" />
                                ) : (
                                    <Icon className="h-4 w-4" />
                                )}
                            </div>
                            <div className="text-center">
                                <p
                                    className={`text-xs font-semibold ${active ? 'text-primary' : done ? 'text-foreground' : 'text-muted-foreground'}`}
                                >
                                    {s.label}
                                </p>
                            </div>
                        </div>
                        {i < STEPS.length - 1 && (
                            <div
                                className={`mx-2 mb-5 h-px w-12 transition-colors sm:w-20 ${current > s.id ? 'bg-primary' : 'bg-border'}`}
                            />
                        )}
                    </div>
                );
            })}
        </div>
    );
}
