"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WordsModule = void 0;
const common_1 = require("@nestjs/common");
const words_service_1 = require("./words.service");
const words_controller_1 = require("./words.controller");
const typeorm_1 = require("@nestjs/typeorm");
const compilations_entity_1 = require("./entities/compilations.entity");
const compilations_groups_associations_entity_1 = require("./entities/compilations-groups-associations.entity");
const words_entity_1 = require("./entities/words.entity");
const word_compilations_associations_entity_1 = require("./entities/word-compilations-associations.entity");
let WordsModule = class WordsModule {
};
exports.WordsModule = WordsModule;
exports.WordsModule = WordsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                compilations_entity_1.Compilations,
                compilations_groups_associations_entity_1.CompilationsGroupsAssociation,
                words_entity_1.Words,
                word_compilations_associations_entity_1.WordCompilationsAssociation,
            ]),
        ],
        controllers: [words_controller_1.WordsController],
        providers: [words_service_1.WordsService],
    })
], WordsModule);
//# sourceMappingURL=words.module.js.map