import { EtudiantFormData } from '@/types';
import { ImagePlus, X } from 'lucide-react';
import { ChangeEvent, useEffect, useState } from 'react';

interface ImageUploaderProps {
    data: EtudiantFormData;
    setData: (d: EtudiantFormData) => void;
}

function ImageUploader({ data, setData }: ImageUploaderProps) {
    const [preview, setPreview] = useState(
        typeof data.photo === 'string' ? data.photo : null,
    );

    useEffect(() => {
        if (data.photo instanceof File) {
            const url = URL.createObjectURL(data.photo);
            setPreview(url);

            return () => URL.revokeObjectURL(url);
        }

    
        if (typeof data.photo === 'string') {
            setPreview(`/storage/${data.photo}`);
        } else {
            setPreview(null);
        }

    }, [data.photo]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (!file) return;

        if (!file.type.startsWith('image/')) return null;

        setData({ ...data, photo: file });
    };

    const removeImage = () => {
        setData({ ...data, photo: null });
    };

    return (
        <div className="flex items-center gap-5">
            <div className="relative">
                <label
                    htmlFor="photo-etudiant"
                    className="flex h-32 w-32 cursor-pointer items-center justify-center overflow-hidden rounded-full border-2 border-dashed border-muted-foreground/30 bg-muted transition hover:border-primary"
                >
                    {preview ? (
                        <img
                            src={preview}
                            alt="Photo de l'etudiant"
                            className="h-full w-full object-cover"
                        />
                    ) : (
                        <div className="flex flex-col items-center gap-2 text-muted-foreground">
                            <ImagePlus size={28} />
                            <span className="text-xs">Ajouter une photo</span>
                        </div>
                    )}
                </label>

                {preview && (
                    <button
                        type="button"
                        onClick={removeImage}
                        className="absolute top-0 right-0 flex h-7 w-7 items-center justify-center rounded-full bg-destructive text-destructive-foreground  shadow"
                    >
                        <X size={14} />
                    </button>
                )}

                <input
                    id="photo-etudiant"
                    type="file"
                    accept="image/*"
                    onChange={handleChange}
                    className="hidden"
                />

                <div>
                    <p className="text-sm font-medium">Photo de l'étudiant</p>
                    <p className="text-xs text-muted-foreground">
                        Taille maximale : 2 Mo
                    </p>
                </div>
            </div>
        </div>
    );
}

export default ImageUploader;
