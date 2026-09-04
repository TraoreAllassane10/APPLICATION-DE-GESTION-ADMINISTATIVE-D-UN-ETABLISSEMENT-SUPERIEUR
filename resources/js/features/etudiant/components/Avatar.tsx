function Avatar({
    photo,
    prenom,
    nom,
    genre,
}: {
    photo?: string;
    prenom: string;
    nom: string;
    genre: string;
}) {
    const isFemme = genre === 'Féminin';
    return (
        <div
            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${isFemme ? 'bg-pink-100 text-pink-700' : 'bg-blue-100 text-blue-700'}`}
        >
            {photo ? (
                <img src={`/storage/${photo}`} className="h-8 w-8 object-cover rounded-full" />
            ) : (
                <p>
                    {nom && nom[0]} {prenom && prenom[0]}
                </p>
            )}
        </div>
    );
}

export default Avatar;
