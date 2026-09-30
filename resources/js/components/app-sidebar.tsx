import { NavFooter } from '@/components/nav-footer';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import {
    bulletins,
    dashboard,
    evaluations,
    filiere,
    historique,
    niveau,
    professeur,
} from '@/routes';
import { Auth, type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import {
    BellDotIcon,
    ClipboardList,
    ClipboardPen,
    CreditCard,
    GraduationCap,
    History,
    Layers,
    LayoutDashboard,
    Presentation,
    Receipt,
    Settings2,
    Sheet,
    TrendingUp,
    User,
    UserCheck,
    Users,
} from 'lucide-react';
import AppLogo from './app-logo';
import { NavMain } from './nav-main';

export function AppSidebar() {
    const { auth } = usePage<{ auth: Auth }>().props;

    const isAdmin = auth.user?.roles?.some(
        (role) => role.name == 'Administrateur',
    );

    const isSecretaireScolarite = auth.user?.roles?.some(
        (role) => role.name == 'Secrétaire de scolarité',
    );

    const isProfesseur = auth.user?.roles?.some(
        (role) => role.name == 'Professeur',
    );

    const isInspecteurPedagogie = auth.user?.roles?.some(
        (role) => role.name == 'Inspecteur pedagogique',
    );

    const mainNavItems: NavItem[] = [
        // Onglets disponible que pour les administrateurs
        ...(isAdmin
            ? [
                  {
                      title: 'Dashboard',
                      href: dashboard(),
                      icon: LayoutDashboard,
                  },
                  {
                      title: 'Etudiant',
                      href: '/etudiants',
                      icon: Users,
                  },

                  {
                      title: 'Inscriptions',
                      href: '/inscriptions',
                      icon: ClipboardList,
                  },
                  {
                      title: 'Filières',
                      href: filiere(),
                      icon: Layers,
                  },
                  {
                      title: 'Classes',
                      href: niveau(),
                      icon: GraduationCap,
                  },
                  {
                      title: 'Scolarités',
                      href: '/scolarite',
                      icon: Receipt,
                  },
                  {
                      title: 'Paiements',
                      href: '/paiements',
                      icon: CreditCard,
                  },
                  {
                      title: 'Historiques des activités',
                      href: historique(),
                      icon: History,
                  },
              ]
            : []),

        // Onglets disponible que pour les administrateurs
        ...(isSecretaireScolarite
            ? [
                  {
                      title: 'Dashboard',
                      href: dashboard(),
                      icon: LayoutDashboard,
                  },
                  {
                      title: 'Etudiant',
                      href: '/etudiants',
                      icon: Users,
                  },

                  {
                      title: 'Inscriptions',
                      href: '/inscriptions',
                      icon: ClipboardList,
                  },

                  {
                      title: 'Classes',
                      href: niveau(),
                      icon: GraduationCap,
                  },
                  {
                      title: 'Enseignants',
                      href: professeur(),
                      icon: UserCheck,
                  },
              ]
            : []),

        // Onglets disponible pour inspecteur pédagogique
        ...(isInspecteurPedagogie
            ? [
                  {
                      title: 'Dashboard',
                      href: dashboard(),
                      icon: LayoutDashboard,
                  },
                  {
                      title: 'Filières',
                      href: filiere(),
                      icon: Layers,
                  },
                  {
                      title: 'Classes',
                      href: niveau(),
                      icon: GraduationCap,
                  },
                  {
                      title: 'Cours',
                      href: '/cours',
                      icon: Presentation,
                  },
                  {
                      title: 'Enseignants',
                      href: professeur(),
                      icon: UserCheck,
                  },
                  {
                      title: 'Evaluations',
                      href: evaluations(),
                      icon: ClipboardPen,
                  },
                  {
                      title: 'Moyennes',
                      href: '/moyennes',
                      icon: TrendingUp,
                  },
                  {
                      title: 'Bulletins',
                      href: bulletins(),
                      icon: Sheet,
                  },
              ]
            : []),

        // Onglets disponible pour les professeurs
        ...(isProfesseur
            ? [
                  {
                      title: 'Dashboard',
                      href: '/professeur/dashboard',
                      icon: LayoutDashboard,
                  },
                  {
                      title: 'Mes étudiants',
                      href: '/professeur/etudiants',
                      icon: ClipboardPen,
                  },
                  {
                      title: 'Evaluations',
                      href: '/professeur/evaluations',
                      icon: ClipboardPen,
                  },
                  {
                      title: 'Moyennes',
                      href: '/professeur/moyennes',
                      icon: TrendingUp,
                  },
              ]
            : []),

        {
            title: 'Centre de notification',
            href: '/notifications',
            icon: BellDotIcon,
        },
    ];

    const mainNavItemsPersonnel: NavItem[] = [
        {
            title: 'Personnels',
            href: '/personnels',
            icon: User,
        },
    ];

    const footerNavItems: NavItem[] = [
        {
            title: 'Configurations',
            href: '/configurations',
            icon: Settings2,
        },
    ];

    return (
        <Sidebar
            collapsible="icon"
            variant="inset"
            className="border-r border-white/5 bg-slate-950"
        >
            <SidebarHeader className="border-b border-white/5 pb-3">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            size="lg"
                            asChild
                            className="hover:bg-white/5"
                        >
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent className="overflow-y-auto px-2 py-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                <NavMain items={mainNavItems} title="Gestion académique" />
                {isAdmin && (
                    <NavMain items={mainNavItemsPersonnel} title="Personnel" />
                )}
            </SidebarContent>

            <SidebarFooter className="border-t border-white/5 p-2">
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
