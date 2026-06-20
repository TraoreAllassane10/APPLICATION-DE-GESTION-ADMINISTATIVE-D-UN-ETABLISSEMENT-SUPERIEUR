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
import { dashboard, historique, niveau, professeur } from '@/routes';
import { Auth, type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import {
    ClipboardList,
    GraduationCap,
    History,
    LayoutDashboard,
    Settings2,
    User,
    UserCog,
    Users,
} from 'lucide-react';
import AppLogo from './app-logo';
import { NavMain } from './nav-main';

export function AppSidebar() {
    const { auth } = usePage<{ auth: Auth }>().props;

    const isAuthorize = auth.user?.roles?.some(
        (role) => role.name == 'Administrateur',
    );

    const mainNavItems: NavItem[] = [
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
            title: 'Enseignant',
            href: professeur(),
            icon: UserCog,
        },
        
        // Onglets disponible que pour les administrateur
        ...(isAuthorize
            ? [
                  {
                      title: 'Historiques des actions',
                      href: historique(),
                      icon: History,
                  },
              ]
            : []),
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
       <Sidebar collapsible="icon" variant="inset" className="bg-slate-950 border-r border-white/5">
        <SidebarHeader className="border-b border-white/5 pb-3">
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton size="lg" asChild className="hover:bg-white/5">
                        <Link href={dashboard()} prefetch>
                            <AppLogo />
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarHeader>

        <SidebarContent className="px-2 py-3">
            <NavMain items={mainNavItems} title="Gestion académique" />
            {isAuthorize && (
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
