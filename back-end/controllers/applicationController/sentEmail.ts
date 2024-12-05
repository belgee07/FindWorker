import nodemailer from "nodemailer";
import { WorkerModel } from "../../src/database/models/worker.model";
import { ClientModel } from "../../src/database/models/client.model";

const emailSender = async (
  sendEmail: string,
  subject: string,
  html: string,
  text: string
) => {
  const transport = nodemailer.createTransport({
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
    await transport.sendMail(options);
    console.log(`Email sent successfully to ${sendEmail}`);
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }
};

export const sendEmailController = async (req: any, res: any) => {
  const { authId, workerId, status, description, process } = req.body;

  if (!authId || !workerId || !status || !description || !process) {
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
    const worker = await WorkerModel.findById(workerId);
    if (!worker) {
      return res.status(404).json({ message: "Worker not found" });
    }

    const client = await ClientModel.findOne({ authId });
    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }

    const clientPhoneNumber = client.phoneNumber || "No phone number available";

    const emailContent = `
      <div style="font-family: Helvetica, Arial, sans-serif; text-align: center; padding: 20px;">
        <h2 style="color: #00466a; font-size: 24px; margin-bottom: 20px;">Ажилын хүсэлт</h2>
        <p style="font-size: 16px; margin-bottom: 20px;">Таньд ажилын хүсэлт ирсэн байна!</p>
        <p><strong>Ажлын тайлбар:</strong> ${description}</p>
        <p><strong>Үйлчлүүлэгчийн утасны дугаар:</strong> ${clientPhoneNumber}</p>
      </div>
    `;

    await emailSender(
      worker.email,
      "Таньд ажилын хүсэлт ирсэн байна",
      emailContent,
      description
    );

    res.status(201).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};
