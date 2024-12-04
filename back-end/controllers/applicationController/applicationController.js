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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmailController = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const client_model_1 = require("../../src/database/models/client.model");
const worker_model_1 = require("../../src/database/models/worker.model");
const emailSender = (sendEmail, subject, html, text) => __awaiter(void 0, void 0, void 0, function* () {
    const transport = nodemailer_1.default.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });
    const options = {
        from: process.env.EMAIL_USER,
        to: sendEmail,
        subject: subject,
        text: text,
        html: html,
    };
    try {
        yield transport.sendMail(options);
        console.log(`Email sent successfully to ${sendEmail}`);
    }
    catch (error) {
        console.error("Error sending email:", error);
        throw new Error("Failed to send email");
    }
});
const sendEmailController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { clientId, workerId, status, description, process } = req.body;
    if (!clientId || !workerId || !status || !description || !process) {
        res.status(400).json({ message: "All fields are required" });
        return;
    }
    if (!["Pending", "Accepted", "Reject"].includes(status)) {
        res.status(400).json({ message: "Invalid status" });
        return;
    }
    if (!["Ongoing", "Done"].includes(process)) {
        res.status(400).json({ message: "Invalid process status" });
        return;
    }
    try {
        const client = yield client_model_1.ClientModel.findById(clientId);
        const worker = yield worker_model_1.WorkerModel.findById(workerId);
        if (!worker) {
            return res.status(404).json({ message: "Worker email not found" });
        }
        if (!client) {
            return res.status(404).json({ message: "Client not found" });
        }
        const emailContent = `
      <div style="font-family: Helvetica, Arial, sans-serif; text-align: center; padding: 20px;">
        <h2 style="color: #00466a; font-size: 24px; margin-bottom: 20px;">Ажилын хүсэлт</h2>
        <p style="font-size: 16px; margin-bottom: 20px;">Таньд ажилын хүсэлт ирсэн байна!</p>
        <p><strong>Ажлын тайлбар:</strong> ${description}</p>
        <p><strong>Үйлчлүүлэгчийн утасны дугаар:</strong> ${client.phoneNumber || "Утасны дугаар байхгүй"}</p>
      </div>
    `;
        yield emailSender(worker.email, "Таньд ажилын хүсэлт ирсэн байна", emailContent, description);
        res.status(201).json({ message: "Email sent successfully" });
    }
    catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal server error", error });
    }
});
exports.sendEmailController = sendEmailController;
