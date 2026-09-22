/**
 * Backend Email Service Abstraction for Samasya Nivark / Jharkhand Samadhan
 * Supports environment variable configuration for real SMTP services:
 * - process.env.EMAIL_HOST
 * - process.env.EMAIL_PORT
 * - process.env.EMAIL_USER
 * - process.env.EMAIL_PASSWORD
 * - process.env.EMAIL_FROM
 * 
 * In prototype mode, simulates dispatches with realistic headers & templates,
 * storing sent emails in state so users can inspect them in a "Demo Email" modal.
 */

export const EMAIL_CONFIG = {
  host: typeof process !== 'undefined' && process.env?.EMAIL_HOST || 'smtp.samasya.example',
  port: typeof process !== 'undefined' && process.env?.EMAIL_PORT || 587,
  user: typeof process !== 'undefined' && process.env?.EMAIL_USER || 'no-reply@samasya.example',
  from: typeof process !== 'undefined' && process.env?.EMAIL_FROM || 'Samasya Nivark <notifications@samasya.example>',
  isProductionConfigured: false
};

/**
 * Dispatch Join Request Email
 */
export const buildJoinRequestEmail = ({ recipientName, recipientEmail, senderName, senderEmail, projectName, role, message }) => {
  return {
    id: `EML-JOIN-${Date.now()}`,
    timestamp: new Date().toLocaleString(),
    to: recipientEmail || 'department.receiver@samasya.example',
    from: EMAIL_CONFIG.from,
    subject: `New Join Request – Samasya Nivark [${projectName}]`,
    body: `Hello ${recipientName || 'Project Lead'},

${senderName} (${senderEmail}) has submitted a request to join your collaborative project.

--------------------------------------------------
Project Name: ${projectName}
Requested Role: ${role}
Applicant Email: ${senderEmail}
--------------------------------------------------

Applicant Message:
"${message || 'I would like to contribute my technical skills to help solve this societal challenge.'}"

Please log in to Samasya Nivark to review and approve or manage this request.

[View Request in Portal: http://localhost:3000/explore]

Regards,
Samasya Nivark Crowdsourcing Platform
Government of Jharkhand`,
    isDemo: true
  };
};

/**
 * Dispatch Membership Offer Email
 */
export const buildMembershipOfferEmail = ({ recipientName, recipientEmail, orgName, role, message }) => {
  return {
    id: `EML-OFFER-${Date.now()}`,
    timestamp: new Date().toLocaleString(),
    to: recipientEmail || 'student.demo@samasya.example',
    from: EMAIL_CONFIG.from,
    subject: `Membership Offer – Samasya Nivark [${orgName}]`,
    body: `Hello ${recipientName || 'Innovator'},

${orgName} has sent you an official membership & collaboration offer through Samasya Nivark.

--------------------------------------------------
Organization: ${orgName}
Offered Role: ${role}
Recipient: ${recipientName} (${recipientEmail})
--------------------------------------------------

Offer Message:
"${message || 'We are impressed by your problem-solving blueprint and would like to offer mentorship and project support.'}"

Please log in to Samasya Nivark to review and accept this offer.

[Review Offer: http://localhost:3000/profile]

Regards,
Samasya Nivark Collaboration Team
Government of Jharkhand`,
    isDemo: true
  };
};
