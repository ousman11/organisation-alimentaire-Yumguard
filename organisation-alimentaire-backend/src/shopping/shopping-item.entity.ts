// src/shopping/shopping-item.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class ShoppingItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nom: string;

  @Column()
  categorie: string;

  @Column({ default: false })
  ajoute: boolean;
}
