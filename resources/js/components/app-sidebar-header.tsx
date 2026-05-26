import { Breadcrumbs } from '@/components/breadcrumbs';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Annee, type BreadcrumbItem as BreadcrumbItemType } from '@/types';
import { usePage } from '@inertiajs/react';

export function AppSidebarHeader({
    breadcrumbs = [],
}: {
    breadcrumbs?: BreadcrumbItemType[];
}) {
    const { anneeActive } = usePage<{anneeActive: Annee}>().props;
    return (
        <header className="flex justify-between h-16 shrink-0 items-center gap-2 border-b border-sidebar-border/50 px-6 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 md:px-4">
            <div className="flex items-center gap-2">
                <SidebarTrigger className="-ml-1" />
                <Breadcrumbs breadcrumbs={breadcrumbs} />
            </div>

             <span className='flex items-center px-2.5 py-0.5 rounded-full text-sm font-bold bg-red-50 text-red-700 border border-red-200 shadow'>Année Académique: {anneeActive.libelle ?? '-'}</span>
        </header>
    );
}
