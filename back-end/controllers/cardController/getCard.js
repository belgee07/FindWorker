"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCard = void 0;
const card_model_1 = require("../../src/database/models/card.model");
const getCard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { authId } = req.params;
    console.log(req.params);
    const userCard = yield card_model_1.CardModel.findOne({ authId });
    if (!userCard) {
        res.status(200).send("No User Card Found");
        return;
    }
    res.status(200).send(userCard);
});
exports.getCard = getCard;
