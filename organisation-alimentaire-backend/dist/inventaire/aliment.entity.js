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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Aliment = void 0;
const typeorm_1 = require("typeorm");
let Aliment = class Aliment {
};
exports.Aliment = Aliment;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Aliment.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Aliment.prototype, "nom", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'date_expiration', type: 'date' }),
    __metadata("design:type", String)
], Aliment.prototype, "dateExpiration", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 1 }),
    __metadata("design:type", Number)
], Aliment.prototype, "quantite", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'Autre' }),
    __metadata("design:type", String)
], Aliment.prototype, "categorie", void 0);
exports.Aliment = Aliment = __decorate([
    (0, typeorm_1.Entity)()
], Aliment);
//# sourceMappingURL=aliment.entity.js.map