export interface EtudiantCreeNotificationData {
    id: number;
    etudiant_ip: string;
    titre: string;
    message: string;
    lien: string | null;
}

export interface EtudiantCreeNotification {
    id: string;
    type: string;
    read_at: null|string;
    data: EtudiantCreeNotificationData,
    created_at: string;
}