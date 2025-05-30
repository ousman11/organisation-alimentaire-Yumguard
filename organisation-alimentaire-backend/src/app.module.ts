import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { InventaireModule } from './inventaire/inventaire.module'; // ✅ à ajouter
import { ShoppingModule } from './shopping/shopping.module'; // ✅ si tu as la page liste des courses

import { User } from './users/user.entity';
import { Aliment } from './inventaire/aliment.entity';
import { ShoppingItem } from './shopping/shopping-item.entity'; // optionnel

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'motdepasse',
      database: 'organisation_alimentaire',
      entities: [User, Aliment, ShoppingItem],
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
    InventaireModule, // ✅ ajouté ici
    ShoppingModule, // ✅ si tu as ce module
  ],
})
export class AppModule {}
