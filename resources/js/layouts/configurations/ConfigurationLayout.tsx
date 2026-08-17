import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn, isSameUrl, resolveUrl } from '@/lib/utils';
import { annee, periodes } from '@/routes';
import { Auth, NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { PropsWithChildren } from 'react';

const ConfigurationLayout = ({ children }: PropsWithChildren) => {
    const currentPath = window.location.pathname;
    const { auth } = usePage<{ auth: Auth }>().props;

    const isAuthorize = auth.user?.roles?.some(
        (role) => role.name == 'Administrateur',
    );

    const sidebarNavItems: NavItem[] = [
        {
            title: 'Annne Universitaire Active',
            href: '/configurations',
            icon: null,
        },
        {
            title: 'Annne academiques',
            href: annee(),
            icon: null,
        },
        {
            title: 'Période academiques',
            href: periodes(),
            icon: null,
        },

        // Onglets disponible que pour les administrateur
        ...(isAuthorize
            ? [
                  {
                      title: 'Utilisateurs',
                      href: '/utilisateurs',
                      icon: null,
                  },
              ]
            : []),
    ];

    return (
        <div className="px-4 py-6">
            <Heading
                title="Configurations"
                description="Configurer l'application"
            />

            <div className="flex flex-col lg:flex-row lg:space-x-12">
                <aside className="w-full max-w-xl lg:w-48">
                    <nav className="flex flex-col space-y-1 space-x-0">
                        {sidebarNavItems.map((item, index) => (
                            <Button
                                key={`${resolveUrl(item.href)}-${index}`}
                                size="sm"
                                variant="ghost"
                                asChild
                                className={cn('w-full justify-start', {
                                    'bg-muted': isSameUrl(
                                        currentPath,
                                        item.href,
                                    ),
                                })}
                            >
                                <Link href={item.href}>
                                    {item.icon && (
                                        <item.icon className="h-4 w-4" />
                                    )}
                                    {item.title}
                                </Link>
                            </Button>
                        ))}
                    </nav>
                </aside>

                <Separator className="my-6 lg:hidden" />

                <div className="flex-1">
                    <section className="w-full space-y-8">{children}</section>
                </div>
            </div>
        </div>
    );
};

export default ConfigurationLayout;
