import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ShoppingItem } from './shopping-item.entity';

@Injectable()
export class ShoppingService {
  constructor(
    @InjectRepository(ShoppingItem)
    private repo: Repository<ShoppingItem>,
  ) {}

  // Récupérer tous les éléments de la liste de courses
  findAll() {
    return this.repo.find();
  }

  // Créer un nouvel article
  create(data: Partial<ShoppingItem>) {
    const item = this.repo.create(data);
    return this.repo.save(item);
  }

  // Basculer l'état "ajouté"
  async toggleAjoute(id: number) {
    const item = await this.repo.findOneBy({ id });
    if (!item) {
      throw new NotFoundException(`Élément avec l'ID ${id} introuvable.`);
    }
    item.ajoute = !item.ajoute;
    return this.repo.save(item);
  }

  // Supprimer un article
  async remove(id: number) {
    return this.repo.delete(id);
  }
}
