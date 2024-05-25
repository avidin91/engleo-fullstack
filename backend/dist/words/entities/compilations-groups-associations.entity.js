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
exports.CompilationsGroupsAssociation = void 0;
const typeorm_1 = require("typeorm");
const groups_entity_1 = require("../../groups/entities/groups.entity");
const compilations_entity_1 = require("./compilations.entity");
let CompilationsGroupsAssociation = class CompilationsGroupsAssociation {
};
exports.CompilationsGroupsAssociation = CompilationsGroupsAssociation;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], CompilationsGroupsAssociation.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => compilations_entity_1.Compilations, (compilation) => compilation.id),
    (0, typeorm_1.JoinColumn)({ name: 'compilation_id' }),
    __metadata("design:type", compilations_entity_1.Compilations)
], CompilationsGroupsAssociation.prototype, "compilation", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => groups_entity_1.Groups, (group) => group.id),
    (0, typeorm_1.JoinColumn)({ name: 'group_id' }),
    __metadata("design:type", groups_entity_1.Groups)
], CompilationsGroupsAssociation.prototype, "word", void 0);
exports.CompilationsGroupsAssociation = CompilationsGroupsAssociation = __decorate([
    (0, typeorm_1.Entity)()
], CompilationsGroupsAssociation);
//# sourceMappingURL=compilations-groups-associations.entity.js.map