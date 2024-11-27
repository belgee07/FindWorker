import { Request, Response } from "express";
import { ApplicationModel } from "../../src/database/models/application.model";
import nodemailer from "nodemailer";

// Function to send email using nodemailer
const sendEmail = async (to: string, subject: string, text: string) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Set to true for 465 port (SSL), false for other ports
    auth: {
      user: process.env.SMTP_USER, // Your email address
      pass: process.env.SMTP_PASS, // Your email password or app-specific password
    },
  });

  try {
    await transporter.sendMail({
      from: `"Your App Name" <${process.env.SMTP_USER}>`,
      to, // Recipient's email address (worker's email)
      subject, // Subject of the email
      text, // Plain text content
      html: `<p>${text}</p>`, // Optional: HTML version of the email body
    });
    console.log("Email sent successfully!");
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }
};

// Function to create an application and send email
export const createApplication = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { jobId, clientId, workerId, status, description, process } = req.body;

  // Validate required fields
  if (!jobId || !clientId || !workerId || !status || !description || !process) {
    res.status(400).json({ message: "All fields are required" });
    return;
  }

  // Validate status and process
  if (!["Pending", "Accepted", "Reject"].includes(status)) {
    res.status(400).json({ message: "Invalid status" });
    return;
  }

  if (!["Ongoing", "Done"].includes(process)) {
    res.status(400).json({ message: "Invalid process status" });
    return;
  }

  try {
    const newApplication = new ApplicationModel({
      jobId,
      clientId,
      workerId,
      status,
      description,
      process,
    });

    await newApplication.save();

    const workerEmail = "worker@example.com"; // Ideally this should be fetched dynamically
    const subject = "Ажил гүйцэтгэх хүсэлт";
    const text = `Таны ажлын хүсэлт баталгаажсан байна. Ажлын нөхцөлийг энд үзнэ үү: ${jobId}`;

    // Attempt to send an email
    try {
      await sendEmail(workerEmail, subject, text);
      res.status(201).json({
        message: "Application created and email sent successfully",
        application: newApplication,
      });
    } catch (emailError) {
      res.status(201).json({
        message: "Application created, but failed to send email",
        application: newApplication,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
