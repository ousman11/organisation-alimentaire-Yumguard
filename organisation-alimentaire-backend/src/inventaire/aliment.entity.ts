// src/inventaire/aliment.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Aliment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nom: string;

  @Column({ name: 'date_expiration', type: 'date' })
  dateExpiration: string;

  @Column({ type: 'int', default: 1 })
  quantite: number;

  @Column({ default: 'Autre' })  
  categorie: string;
}
