/**
 * EmailService Abstraction
 * Handles email dispatches for project join requests and corporate membership offers.
 * Falls back to labeled Demo Email Mode when no SMTP/API key is set.
 */

export const emailService = {
  sendEmail: async ({ to, subject, body, from }) => {
    const provider = process.env.EMAIL_PROVIDER || 'demo';

    if (provider !== 'demo' && process.env.EMAIL_API_KEY) {
      // Integration point for SendGrid / AWS SES / Mailgun
      return { success: true, messageId: `MSG-${Date.now()}` };
    }

    // Demo Mode Logging
    console.log(`[Demo Email Mode Dispatched] To: ${to} | Subject: ${subject}`);
    return {
      success: true,
      mode: 'Demo Email Mode',
      to,
      subject,
      body,
      timestamp: new Date().toISOString()
    };
  }
};
