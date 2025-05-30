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
exports.InventaireService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const aliment_entity_1 = require("./aliment.entity");
let InventaireService = class InventaireService {
    constructor(alimentRepository) {
        this.alimentRepository = alimentRepository;
    }
    async getAll() {
        return await this.alimentRepository.find();
    }
    async addAliment(nom, dateExpiration, quantite = 1, categorie) {
        const newAliment = this.alimentRepository.create({ nom, dateExpiration, quantite, categorie });
        return await this.alimentRepository.save(newAliment);
    }
    async updateAliment(id, updateData) {
        const aliment = await this.alimentRepository.findOne({ where: { id } });
        if (!aliment)
            return { message: 'Aliment non trouvé' };
        Object.assign(aliment, updateData);
        return await this.alimentRepository.save(aliment);
    }
    async deleteAliment(id) {
        const result = await this.alimentRepository.delete(id);
        if (result.affected === 0)
            return { message: 'Aliment non trouvé' };
        return { message: 'Aliment supprimé' };
    }
};
exports.InventaireService = InventaireService;
exports.InventaireService = InventaireService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(aliment_entity_1.Aliment)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], InventaireService);
//# sourceMappingURL=inventaire.service.js.map