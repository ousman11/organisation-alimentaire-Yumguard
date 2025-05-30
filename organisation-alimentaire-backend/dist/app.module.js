"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const auth_module_1 = require("./auth/auth.module");
const users_module_1 = require("./users/users.module");
const inventaire_module_1 = require("./inventaire/inventaire.module");
const shopping_module_1 = require("./shopping/shopping.module");
const user_entity_1 = require("./users/user.entity");
const aliment_entity_1 = require("./inventaire/aliment.entity");
const shopping_item_entity_1 = require("./shopping/shopping-item.entity");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: 'localhost',
                port: 5432,
                username: 'postgres',
                password: 'motdepasse',
                database: 'organisation_alimentaire',
                entities: [user_entity_1.User, aliment_entity_1.Aliment, shopping_item_entity_1.ShoppingItem],
                synchronize: true,
            }),
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            inventaire_module_1.InventaireModule,
            shopping_module_1.ShoppingModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map