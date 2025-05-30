import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { InventaireService } from './inventaire.service';
import { Aliment } from './aliment.entity';

@Controller('inventaire')
export class InventaireController {
  constructor(private readonly inventaireService: InventaireService) {}

  //  Tous les aliments
  @Get()
  findAll(): Promise<Aliment[]> {
    return this.inventaireService.getAll();
  }

  //  Ajouter un aliment (avec catégorie)
  @Post()
  addAliment(
    @Body() body: { nom: string; dateExpiration: string; quantite?: number; categorie: string },
  ): Promise<Aliment> {
    return this.inventaireService.addAliment(
      body.nom,
      body.dateExpiration,
      body.quantite || 1,
      body.categorie,
    );
  }

  //  Modifier un aliment
  @Put(':id')
  updateAliment(
    @Param('id') id: number,
    @Body() body: Partial<Aliment>,
  ): Promise<Aliment | { message: string }> {
    return this.inventaireService.updateAliment(Number(id), body);
  }

  //  Supprimer un aliment
  @Delete(':id')
  deleteAliment(@Param('id') id: number): Promise<{ message: string }> {
    return this.inventaireService.deleteAliment(Number(id));
  }
}
