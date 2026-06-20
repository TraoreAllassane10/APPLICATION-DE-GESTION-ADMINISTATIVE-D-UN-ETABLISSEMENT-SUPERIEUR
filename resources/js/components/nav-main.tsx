import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { resolveUrl } from '@/lib/utils';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { cn } from '@/lib/utils';

export function NavMain({ items = [], title }: { items: NavItem[]; title: string }) {
    const page = usePage();

    return (
        <SidebarGroup className="px-0 py-0 mb-4">
            <SidebarGroupLabel className="
                text-[10px] font-bold tracking-[0.12em] uppercase
                text-slate-500 px-2 pb-2 mb-0.5
                flex items-center gap-2
                after:content-[''] after:flex-1 after:h-px after:bg-white/5
            ">
                {title}
            </SidebarGroupLabel>

            <SidebarMenu className="gap-0.5">
                {items.map((item) => {
                    const isActive = page.url.startsWith(resolveUrl(item.href));
                    return (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton
                                asChild
                                isActive={isActive}
                                tooltip={{ children: item.title }}
                                className={cn(
                                    // Base
                                    'relative rounded-lg px-2.5 py-2 text-[13px] font-medium',
                                    'text-slate-400 transition-colors duration-100',
                                    // Hover
                                    'hover:bg-white/5 hover:text-slate-200',
                                    // Actif — fond indigo teinté + barre latérale
                                    isActive && [
                                        'bg-indigo-500/15 text-indigo-100',
                                        'before:absolute before:left-0 before:top-1.5 before:bottom-1.5',
                                        'before:w-[3px] before:bg-indigo-500 before:rounded-r-full',
                                    ],
                                )}
                            >
                                <Link href={item.href} prefetch>
                                    {item.icon && (
                                        <item.icon
                                            className={cn(
                                                'shrink-0 opacity-80',
                                                isActive && 'opacity-100 text-indigo-400',
                                            )}
                                            size={16}
                                        />
                                    )}
                                    <span>{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    );
                })}
            </SidebarMenu>
        </SidebarGroup>
    );
}