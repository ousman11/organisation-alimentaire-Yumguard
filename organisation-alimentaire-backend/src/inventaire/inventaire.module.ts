import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventaireController } from './inventaire.controller';
import { InventaireService } from './inventaire.service';
import { Aliment } from './aliment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Aliment])],
  controllers: [InventaireController],
  providers: [InventaireService],
  exports: [TypeOrmModule], // Permet d'utiliser l'entité ailleurs
})
export class InventaireModule {}
