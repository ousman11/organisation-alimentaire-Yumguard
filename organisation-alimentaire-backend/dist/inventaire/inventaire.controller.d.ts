import { InventaireService } from './inventaire.service';
import { Aliment } from './aliment.entity';
export declare class InventaireController {
    private readonly inventaireService;
    constructor(inventaireService: InventaireService);
    findAll(): Promise<Aliment[]>;
    addAliment(body: {
        nom: string;
        dateExpiration: string;
        quantite?: number;
        categorie: string;
    }): Promise<Aliment>;
    updateAliment(id: number, body: Partial<Aliment>): Promise<Aliment | {
        message: string;
    }>;
    deleteAliment(id: number): Promise<{
        message: string;
    }>;
}
