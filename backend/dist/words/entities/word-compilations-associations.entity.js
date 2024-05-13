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
exports.WordCompilationsAssociation = void 0;
const typeorm_1 = require("typeorm");
const words_entity_1 = require("./words.entity");
const compilations_entity_1 = require("./compilations.entity");
let WordCompilationsAssociation = class WordCompilationsAssociation {
};
exports.WordCompilationsAssociation = WordCompilationsAssociation;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], WordCompilationsAssociation.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => words_entity_1.Words, (word) => word.id),
    (0, typeorm_1.JoinColumn)({ name: 'word_id' }),
    __metadata("design:type", words_entity_1.Words)
], WordCompilationsAssociation.prototype, "word", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => compilations_entity_1.Compilations, (compilation) => compilation.id),
    (0, typeorm_1.JoinColumn)({ name: 'compilation_id' }),
    __metadata("design:type", compilations_entity_1.Compilations)
], WordCompilationsAssociation.prototype, "compilation", void 0);
exports.WordCompilationsAssociation = WordCompilationsAssociation = __decorate([
    (0, typeorm_1.Entity)()
], WordCompilationsAssociation);
//# sourceMappingURL=word-compilations-associations.entity.js.map