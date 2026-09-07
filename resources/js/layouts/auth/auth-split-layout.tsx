import Logo from '@/assets/logo.jpg';
import AppLogoIcon from '@/components/app-logo-icon';
import { home } from '@/routes';
import { Link } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';

interface AuthLayoutProps {
    title?: string;
    description?: string;
}

export default function AuthSplitLayout({
    children,
    title,
    description,
}: PropsWithChildren<AuthLayoutProps>) {
    return (
        <div className="relative grid h-dvh flex-col items-center justify-center px-8 sm:px-0 lg:max-w-none lg:grid-cols-2 lg:px-0">
            {/* Section Gauche : Dégradé Rouge avec Contenu */}
            <div className="relative hidden h-full flex-col justify-between overflow-hidden bg-gradient-to-br from-red-700 via-red-600 to-red-500 p-10 text-white lg:flex dark:border-r">
                {/* Motif décoratif en filigrane en arrière-plan */}
                <div className="absolute -right-16 -top-16 h-96 w-96 rounded-full bg-red-600/20 blur-3xl" />
                <div className="absolute -bottom-20 -left-20 h-96 w-96 rounded-full bg-rose-500/15 blur-3xl" />

                {/* En-tête / Logo */}
                <Link
                    href={home()}
                    className="relative z-20 flex items-center text-lg font-semibold tracking-wide"
                >
                    <img src={Logo} alt="Logo" className="mr-3 size-16 rounded-full object-cover shadow-md ring-2 ring-white/20" />
                    <span>INEC DALOA</span>
                </Link>

                {/* Contenu textuel central */}
                <div className="relative z-20 my-auto max-w-xl space-y-4">
                    <span className="inline-block rounded-full bg-red-500/20 px-3 py-1 text-xs font-medium text-red-200 backdrop-blur-sm">
                        Institut National d'Intelligence Numérique, Economique et Commerciale
                    </span>
                    <h1 className="text-4xl font-extrabold tracking-tight leading-snug">
                        Application de gestion administrative
                    </h1>
                    <p className="text-base text-red-100/80 leading-relaxed">
                        Plateforme centralisée pour la gestion des étudiants, la gestion des inscriptions et le suivi académique de l'INEC SA.
                    </p>
                </div>

                {/* Pied de page / Branding */}
                <div className="relative z-20 flex items-center justify-between border-t border-white/10 pt-6 text-xs text-red-200/70">
                    <p>© {new Date().getFullYear()} INEC SA. Tous droits réservés.</p>
                    <p>Scolarité & Administration & Pedagogie</p>
                </div>
            </div>

            {/* Section Droite : Formulaire */}
            <div className="w-full lg:p-8">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                    <Link
                        href={home()}
                        className="relative z-20 flex items-center justify-center lg:hidden"
                    >
                        <AppLogoIcon className="h-10 fill-current text-black sm:h-12" />
                    </Link>
                    <div className="flex flex-col items-start gap-2 text-left sm:items-center sm:text-center">
                        <h1 className="text-xl font-medium">{title}</h1>
                        <p className="text-sm text-balance text-muted-foreground">
                            {description}
                        </p>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
}