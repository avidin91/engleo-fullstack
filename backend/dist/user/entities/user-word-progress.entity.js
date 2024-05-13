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
exports.UserWordProgress = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const words_entity_1 = require("../../words/entities/words.entity");
let UserWordProgress = class UserWordProgress {
};
exports.UserWordProgress = UserWordProgress;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], UserWordProgress.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.id),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.User)
], UserWordProgress.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => words_entity_1.Words, (word) => word.id),
    (0, typeorm_1.JoinColumn)({ name: 'word_id' }),
    __metadata("design:type", words_entity_1.Words)
], UserWordProgress.prototype, "word", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], UserWordProgress.prototype, "endTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], UserWordProgress.prototype, "status", void 0);
exports.UserWordProgress = UserWordProgress = __decorate([
    (0, typeorm_1.Entity)(),
    (0, typeorm_1.Unique)(['user', 'word'])
], UserWordProgress);
//# sourceMappingURL=user-word-progress.entity.js.map