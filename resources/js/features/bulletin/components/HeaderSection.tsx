function HeaderSection() {
    return (
        <div className="flex items-center justify-between">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">
                    Gestion des Bulletins
                </h1>
                <p className="mt-1 text-sm text-muted-foreground">
                    Consultez, recalculez et téléchargez les bulletins de notes
                    par période et par classe.
                </p>
            </div>
        </div>
    );
}

export default HeaderSection;
