"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.User = void 0;
var jobApplication_entity_1 = require("src/jobApplication/jobApplication.entity");
var offer_entity_1 = require("src/offer/offer.entity");
var typeorm_1 = require("typeorm");
var User = /** @class */ (function () {
    function User() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)('uuid')
    ], User.prototype, "id");
    __decorate([
        (0, typeorm_1.Column)({ unique: true })
    ], User.prototype, "username");
    __decorate([
        (0, typeorm_1.Column)()
    ], User.prototype, "password");
    __decorate([
        (0, typeorm_1.OneToMany)(function (_type) { return offer_entity_1.Offer; }, function (offer) { return offer.user; }, { eager: true })
    ], User.prototype, "offers");
    __decorate([
        (0, typeorm_1.OneToMany)(function (_type) { return jobApplication_entity_1["default"]; }, function (application) { return application.user; }, { eager: true })
    ], User.prototype, "applications");
    User = __decorate([
        (0, typeorm_1.Entity)({ name: 'users' })
    ], User);
    return User;
}());
exports.User = User;
