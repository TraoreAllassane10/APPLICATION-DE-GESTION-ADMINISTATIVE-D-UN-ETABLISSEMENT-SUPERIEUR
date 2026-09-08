import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { formatRang } from '@/utils/util';
import { Download, Eye, FileText, Search, Trophy } from 'lucide-react';
import { useState } from 'react';
import { getMentionConfig, getMoyenneColor } from '../helpers';
import { Bulletin } from '../types/bulletin.types';

interface TableBulletinProps {
    bulletins: Bulletin[];
    onTelechargerTous: () => void;
    onOpenDetail: (bulletin: Bulletin) => void;
    onTelechargerPDF: (bulletin: Bulletin, e: React.MouseEvent) => void;
}

const getRangBadge = (rang: number) => {
    if (rang === 1) return <Badge className="bg-amber-500/15 text-amber-700 dark:text-amber-400 border-amber-500/30 gap-1"><Trophy className="size-3 text-amber-500" /> 1er</Badge>;
    if (rang === 2) return <Badge variant="outline" className="bg-slate-500/10 text-slate-700 dark:text-slate-300 border-slate-300 gap-1"><Trophy className="size-3 text-slate-400" /> 2ème</Badge>;
    if (rang === 3) return <Badge variant="outline" className="bg-amber-700/10 text-amber-800 dark:text-amber-500 border-amber-700/30 gap-1"><Trophy className="size-3 text-amber-700" /> 3ème</Badge>;
    return <span className="text-xs text-muted-foreground font-medium">{formatRang(rang)}</span>;
};

export default function TableBulletin({
    bulletins,
    onOpenDetail,
}: TableBulletinProps) {
    const [search, setSearch] = useState('');

    const filteredBulletins = bulletins.filter((b) =>
        `${b.nom} ${b.prenom} ${b.etudiant_ip}`
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    return (
        <Card className="border-border/60 shadow-xs">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <div>
                    <CardTitle className="text-base font-semibold">
                        Liste des Étudiants ({bulletins.length})
                    </CardTitle>
                    <p className="text-xs text-muted-foreground mt-0.5">
                        Cliquez sur une ligne pour voir le détail des notes
                    </p>
                </div>
                {/* Champ de recherche rapide */}
                <div className="relative w-64">
                    <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
                    <Input
                        placeholder="Rechercher nom, matricule..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-9 h-9 text-xs"
                    />
                </div>
            </CardHeader>

            <CardContent className="p-0">
                <div className="border-t">
                    <Table>
                        <TableHeader className="bg-muted/40">
                            <TableRow>
                                <TableHead className="w-20 text-center font-semibold text-xs">Rang</TableHead>
                                <TableHead className="font-semibold text-xs">Étudiant</TableHead>
                                <TableHead className="font-semibold text-xs">Matricule</TableHead>
                                <TableHead className="text-center font-semibold text-xs">Moyenne Générale</TableHead>
                                <TableHead className="text-center font-semibold text-xs">Mention</TableHead>
                                <TableHead className="text-right pr-6 font-semibold text-xs">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredBulletins.map((bulletin) => {
                                const mentionConfig = getMentionConfig(bulletin.mention ?? 'Passable');
                                const initials = `${bulletin.nom?.[0] || ''}${bulletin.prenom?.[0] || ''}`;

                                return (
                                    <TableRow
                                        key={bulletin.id}
                                        onClick={() => onOpenDetail(bulletin)}
                                        className="group cursor-pointer hover:bg-muted/50 transition-colors"
                                    >
                                        <TableCell className="text-center font-medium">
                                            {getRangBadge(bulletin.rang!)}
                                        </TableCell>

                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <Avatar className="h-8 w-8 border">
                                                    <AvatarFallback className="text-xs font-semibold bg-primary/5 text-primary">
                                                        {initials}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div className="flex flex-col">
                                                    <span className="font-semibold text-sm leading-none group-hover:text-primary transition-colors">
                                                        {bulletin.nom.toUpperCase()} {bulletin.prenom}
                                                    </span>
                                                </div>
                                            </div>
                                        </TableCell>

                                        <TableCell>
                                            <span className="font-mono text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                                                {bulletin.etudiant_ip}
                                            </span>
                                        </TableCell>

                                        <TableCell className="text-center">
                                            <div className="inline-flex items-baseline gap-1">
                                                <span className={`text-sm font-bold ${getMoyenneColor(bulletin.moyenne_generale!)}`}>
                                                    {bulletin.moyenne_generale?.toFixed(2) ?? 'N/C'}
                                                </span>
                                                <span className="text-[10px] text-muted-foreground">/20</span>
                                            </div>
                                        </TableCell>

                                        <TableCell className="text-center">
                                            <Badge variant="outline" className={`text-xs ${mentionConfig?.className}`}>
                                                {mentionConfig?.label}
                                            </Badge>
                                        </TableCell>

                                        <TableCell className="text-right pr-6" onClick={(e) => e.stopPropagation()}>
                                            <div className="flex items-center justify-end gap-1.5">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => onOpenDetail(bulletin)}
                                                    className="h-8 w-8 p-0"
                                                    title="Aperçu rapide"
                                                >
                                                    <Eye className="size-4 text-muted-foreground" />
                                                </Button>

                                                <a
                                                    href={`/bulletins/${bulletin.id}/telecharger-bulletin-pdf`}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                >
                                                    <Button variant="outline" size="sm" className="h-8 gap-1 text-xs">
                                                        <FileText className="size-3.5" />
                                                        PDF
                                                    </Button>
                                                </a>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    );
}