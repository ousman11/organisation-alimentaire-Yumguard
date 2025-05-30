import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Aliment } from './aliment.entity';

@Injectable()
export class InventaireService {
  constructor(
    @InjectRepository(Aliment)
    private readonly alimentRepository: Repository<Aliment>,
  ) {}

  //  Récupérer tous les aliments
  async getAll(): Promise<Aliment[]> {
    return await this.alimentRepository.find();
  }

  //  Ajouter un nouvel aliment avec catégorie
  async addAliment(
    nom: string,
    dateExpiration: string,
    quantite: number = 1,
    categorie: string,
  ): Promise<Aliment> {
    const newAliment = this.alimentRepository.create({ nom, dateExpiration, quantite, categorie });
    return await this.alimentRepository.save(newAliment);
  }

  //  Modifier un aliment existant
  async updateAliment(
    id: number,
    updateData: Partial<Aliment>,
  ): Promise<Aliment | { message: string }> {
    const aliment = await this.alimentRepository.findOne({ where: { id } });
    if (!aliment) return { message: 'Aliment non trouvé' };

    Object.assign(aliment, updateData);
    return await this.alimentRepository.save(aliment);
  }

  //  Supprimer un aliment
  async deleteAliment(id: number): Promise<{ message: string }> {
    const result = await this.alimentRepository.delete(id);
    if (result.affected === 0) return { message: 'Aliment non trouvé' };
    return { message: 'Aliment supprimé' };
  }
}
