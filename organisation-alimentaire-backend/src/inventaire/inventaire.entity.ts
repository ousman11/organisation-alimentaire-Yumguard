import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Aliment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nom: string;

  @Column()
  dateExpiration: string;
}
