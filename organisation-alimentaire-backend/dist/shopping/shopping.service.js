"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShoppingService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const shopping_item_entity_1 = require("./shopping-item.entity");
let ShoppingService = class ShoppingService {
    constructor(repo) {
        this.repo = repo;
    }
    findAll() {
        return this.repo.find();
    }
    create(data) {
        const item = this.repo.create(data);
        return this.repo.save(item);
    }
    async toggleAjoute(id) {
        const item = await this.repo.findOneBy({ id });
        if (!item) {
            throw new common_1.NotFoundException(`Élément avec l'ID ${id} introuvable.`);
        }
        item.ajoute = !item.ajoute;
        return this.repo.save(item);
    }
    async remove(id) {
        return this.repo.delete(id);
    }
};
exports.ShoppingService = ShoppingService;
exports.ShoppingService = ShoppingService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(shopping_item_entity_1.ShoppingItem)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ShoppingService);
//# sourceMappingURL=shopping.service.js.map