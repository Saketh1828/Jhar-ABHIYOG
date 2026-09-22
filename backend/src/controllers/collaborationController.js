import { MembershipOffer } from '../models/MembershipOffer.js';
import { emailService } from '../services/emailService.js';

export const createOffer = async (req, res, next) => {
  try {
    const { industryName, recipientName, recipientEmail, role, sponsorshipAmount } = req.body;
    const newId = `OFFER-${Math.floor(100 + Math.random() * 900)}`;

    const offer = await MembershipOffer.create({
      id: newId,
      industryName: industryName || 'Tata Steel CSR',
      recipientName,
      recipientEmail,
      role: role || 'Junior IoT Systems Engineer',
      sponsorshipAmount: sponsorshipAmount || '₹ 2.5 Lakhs'
    });

    // Send email dispatch via EmailService
    await emailService.sendEmail({
      to: recipientEmail,
      subject: `Official Corporate Membership Offer – ${industryName}`,
      body: `Dear ${recipientName},\n\n${industryName} is pleased to offer you a ${role} position.`
    });

    res.status(201).json({ success: true, data: offer });
  } catch (error) {
    next(error);
  }
};
