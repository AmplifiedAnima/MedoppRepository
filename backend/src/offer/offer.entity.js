"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Offer = void 0;
var typeorm_1 = require("typeorm");
var jobApplication_entity_1 = require("src/jobApplication/jobApplication.entity");
var user_entity_1 = require("../user/user.entity");
var Offer = /** @class */ (function () {
    function Offer() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)('uuid')
    ], Offer.prototype, "id");
    __decorate([
        (0, typeorm_1.Column)({ nullable: true })
    ], Offer.prototype, "label");
    __decorate([
        (0, typeorm_1.Column)()
    ], Offer.prototype, "title");
    __decorate([
        (0, typeorm_1.Column)()
    ], Offer.prototype, "company");
    __decorate([
        (0, typeorm_1.Column)()
    ], Offer.prototype, "location");
    __decorate([
        (0, typeorm_1.Column)()
    ], Offer.prototype, "typeOfEmployment");
    __decorate([
        (0, typeorm_1.Column)()
    ], Offer.prototype, "salary");
    __decorate([
        (0, typeorm_1.Column)()
    ], Offer.prototype, "description");
    __decorate([
        (0, typeorm_1.Column)()
    ], Offer.prototype, "specialties");
    __decorate([
        (0, typeorm_1.Column)('numeric')
    ], Offer.prototype, "latitude");
    __decorate([
        (0, typeorm_1.Column)('numeric')
    ], Offer.prototype, "longitude");
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return jobApplication_entity_1["default"]; }, function (application) { return application.offer; }, { cascade: true })
    ], Offer.prototype, "applications");
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return user_entity_1.User; }, function (user) { return user.offers; }, { eager: false })
    ], Offer.prototype, "user");
    Offer = __decorate([
        (0, typeorm_1.Entity)({ name: 'offers' })
    ], Offer);
    return Offer;
}());
exports.Offer = Offer;
