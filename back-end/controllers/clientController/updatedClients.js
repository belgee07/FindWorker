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
exports.updateClient = void 0;
const client_model_1 = require("../../src/database/models/client.model");
const updateClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const authId = req.params.id;
    const { username, phoneNumber, address, profile_picture } = req.body;
    try {
        const updatedClient = yield client_model_1.ClientModel.findOneAndUpdate({ authId }, { username, phoneNumber, address, profile_picture }, { new: true });
        if (!updatedClient) {
            res.status(404).json({ message: "Client not found" });
            return;
        }
        res
            .status(200)
            .json({ message: "Client updated successfully", client: updatedClient });
    }
    catch (error) {
        console.error("Error updating client:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.updateClient = updateClient;
