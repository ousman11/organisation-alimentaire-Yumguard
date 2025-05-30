import { Repository } from 'typeorm';
import { Aliment } from './aliment.entity';
export declare class InventaireService {
    private readonly alimentRepository;
    constructor(alimentRepository: Repository<Aliment>);
    getAll(): Promise<Aliment[]>;
    addAliment(nom: string, dateExpiration: string, quantite: number | undefined, categorie: string): Promise<Aliment>;
    updateAliment(id: number, updateData: Partial<Aliment>): Promise<Aliment | {
        message: string;
    }>;
    deleteAliment(id: number): Promise<{
        message: string;
    }>;
}
