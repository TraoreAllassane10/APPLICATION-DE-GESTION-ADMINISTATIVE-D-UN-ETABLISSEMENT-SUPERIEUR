import { BookOpen, CheckCircle2, User, Wallet } from "lucide-react";

const STEPS = [
    {
        id: 1,
        label: 'Étudiant',
        description: "Sélectionnez l'étudiant",
        icon: User,
    },
    {
        id: 2,
        label: 'Académique',
        description: 'Informations académiques',
        icon: BookOpen,
    },
    {
        id: 3,
        label: 'Financier',
        description: 'Paramètres financiers',
        icon: Wallet,
    },
];

function Stepper({ currentStep }: { currentStep: number }) {
    return (
        <div className="mb-8 flex items-center justify-center">
            {STEPS.map((step, idx) => {
                const done = currentStep > step.id;
                const active = currentStep === step.id;
                const Icon = step.icon;

                return (
                    <div key={step.id} className="flex items-center">
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
                                    {step.label}
                                </p>
                                <p className="hidden text-[10px] text-muted-foreground sm:block">
                                    {step.description}
                                </p>
                            </div>
                        </div>
                        {idx < STEPS.length - 1 && (
                            <div
                                className={`mx-3 mb-5 h-px w-16 transition-colors sm:w-24 ${currentStep > step.id ? 'bg-primary' : 'bg-border'}`}
                            />
                        )}
                    </div>
                );
            })}
        </div>
    );
}

export default Stepper
