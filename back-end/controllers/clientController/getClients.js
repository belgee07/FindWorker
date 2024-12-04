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
exports.getClients = void 0;
const client_model_1 = require("../../src/database/models/client.model");
const getClients = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const client = yield client_model_1.ClientModel.findOne({ authId: req.params.id });
        if (!client) {
            res.status(404).json({ message: "Client not found" });
            return;
        }
        res.status(200).json(client);
    }
    catch (error) {
        console.error("Error fetching client:", error);
        res.status(500).json({ message: "Failed to fetch client" });
    }
});
exports.getClients = getClients;
