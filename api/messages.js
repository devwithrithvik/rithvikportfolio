import connectToDatabase from '../lib/mongodb.js';
import Message from '../models/Message.js';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

export default async function handler(req, res) {
  await connectToDatabase();

  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const { email } = req.query;
        if (email) {
          const messages = await Message.find({ email }).sort({ createdAt: -1 });
          return res.status(200).json({ success: true, data: messages });
        } else {
          // Admin view: get all messages
          const messages = await Message.find({}).sort({ createdAt: -1 });
          return res.status(200).json({ success: true, data: messages });
        }
      } catch (error) {
        return res.status(400).json({ success: false, error: error.message });
      }

    case 'POST':
      try {
        const { name, email, message } = req.body;
        if (!name || !email || !message) {
          return res.status(400).json({ success: false, error: 'Missing fields' });
        }
        const newMessage = await Message.create({ name, email, message });
        return res.status(201).json({ success: true, data: newMessage });
      } catch (error) {
        return res.status(400).json({ success: false, error: error.message });
      }

    case 'PUT':
      try {
        const { id } = req.query;
        const { reply } = req.body;

        if (!id || !reply) {
          return res.status(400).json({ success: false, error: 'Missing ID or reply' });
        }

        const updatedMessage = await Message.findByIdAndUpdate(
          id,
          { reply, status: 'replied' },
          { new: true }
        );

        if (!updatedMessage) {
          return res.status(404).json({ success: false, error: 'Message not found' });
        }

        // Bonus: Send email reply
        if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
          const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: process.env.EMAIL_USER,
              pass: process.env.EMAIL_PASS,
            },
          });

          const mailOptions = {
            from: process.env.EMAIL_USER,
            to: updatedMessage.email,
            subject: 'Reply to your message - Rithvik Portfolio',
            text: `Hello ${updatedMessage.name},\n\nThank you for reaching out. Here is the reply to your message:\n\n"${reply}"\n\nBest regards,\nRithvik`,
          };

          await transporter.sendMail(mailOptions);
        }

        return res.status(200).json({ success: true, data: updatedMessage });
      } catch (error) {
        return res.status(400).json({ success: false, error: error.message });
      }

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT']);
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
}
