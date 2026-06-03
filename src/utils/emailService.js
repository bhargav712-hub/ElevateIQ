const emailTemplates = {
  examBooking: {
    subject: 'Exam Slot Booking Confirmation - EduVance Pro',
    html: (data) => `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #6c5ce7, #00cec9); padding: 30px; text-align: center; border-radius: 12px 12px 0 0;">
          <h1 style="color: white; margin: 0;">⚡ EduVance Pro</h1>
        </div>
        <div style="padding: 30px; background: #f8f9fa; border-radius: 0 0 12px 12px;">
          <h2 style="color: #2d3436;">Exam Slot Booked Successfully!</h2>
          <p>Dear <strong>${data.student_name}</strong>,</p>
          <p>Your exam slot has been confirmed:</p>
          <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #6c5ce7;">
            <p><strong>Exam:</strong> ${data.exam_title}</p>
            <p><strong>Date:</strong> ${data.date}</p>
            <p><strong>Time:</strong> ${data.time}</p>
            <p><strong>Room:</strong> ${data.room || 'Online'}</p>
          </div>
          <p style="color: #636e72; font-size: 14px;">Please arrive 10 minutes early. Good luck!</p>
          <p style="margin-top: 20px; font-size: 12px; color: #b2bec3;">This is an automated message from EduVance Pro.</p>
        </div>
      </div>
    `,
  },

  paymentReceipt: {
    subject: 'Payment Receipt - EduVance Pro',
    html: (data) => `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #6c5ce7, #00cec9); padding: 30px; text-align: center; border-radius: 12px 12px 0 0;">
          <h1 style="color: white; margin: 0;">⚡ EduVance Pro</h1>
        </div>
        <div style="padding: 30px; background: #f8f9fa; border-radius: 0 0 12px 12px;">
          <h2 style="color: #2d3436;">Payment Receipt</h2>
          <p>Dear <strong>${data.student_name}</strong>,</p>
          <p>Your payment has been processed successfully.</p>
          <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #00b894;">
            <p><strong>Invoice:</strong> ${data.invoice_id}</p>
            <p><strong>Course:</strong> ${data.course}</p>
            <p><strong>Amount Paid:</strong> $${data.amount}</p>
            <p><strong>Payment Method:</strong> ${data.method}</p>
            <p><strong>Date:</strong> ${data.date}</p>
          </div>
          <p style="color: #636e72; font-size: 14px;">You now have full access to your course materials.</p>
          <p style="margin-top: 20px; font-size: 12px; color: #b2bec3;">This is an automated message from EduVance Pro.</p>
        </div>
      </div>
    `,
  },

  loginCredentials: {
    subject: 'Your Login Credentials - EduVance Pro',
    html: (data) => `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #6c5ce7, #00cec9); padding: 30px; text-align: center; border-radius: 12px 12px 0 0;">
          <h1 style="color: white; margin: 0;">⚡ EduVance Pro</h1>
        </div>
        <div style="padding: 30px; background: #f8f9fa; border-radius: 0 0 12px 12px;">
          <h2 style="color: #2d3436;">Welcome to EduVance Pro!</h2>
          <p>Dear <strong>${data.name}</strong>,</p>
          <p>Your account has been created. Here are your login details:</p>
          <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #fd79a8;">
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Password:</strong> ${data.password}</p>
            <p><strong>Portal:</strong> <a href="${data.portal_link}">${data.portal_link}</a></p>
          </div>
          <p style="color: #636e72; font-size: 14px;">Please change your password after first login.</p>
          <p style="margin-top: 20px; font-size: 12px; color: #b2bec3;">This is an automated message from EduVance Pro.</p>
        </div>
      </div>
    `,
  },

  assignmentSubmitted: {
    subject: 'Assignment Submitted Successfully',
    html: (data) => `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #6c5ce7, #00cec9); padding: 30px; text-align: center; border-radius: 12px 12px 0 0;">
          <h1 style="color: white; margin: 0;">⚡ EduVance Pro</h1>
        </div>
        <div style="padding: 30px; background: #f8f9fa; border-radius: 0 0 12px 12px;">
          <h2 style="color: #2d3436;">Assignment Received</h2>
          <p>Dear <strong>${data.student_name}</strong>,</p>
          <p>Your assignment has been submitted successfully:</p>
          <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #6c5ce7;">
            <p><strong>Assignment:</strong> ${data.assignment_title}</p>
            <p><strong>Course:</strong> ${data.course}</p>
            <p><strong>Submitted:</strong> ${data.submitted_at}</p>
          </div>
          <p style="color: #636e72; font-size: 14px;">Your trainer will review and provide feedback soon.</p>
        </div>
      </div>
    `,
  },

  leaveStatus: {
    subject: 'Leave Request Update - EduVance Pro',
    html: (data) => `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #6c5ce7, #00cec9); padding: 30px; text-align: center; border-radius: 12px 12px 0 0;">
          <h1 style="color: white; margin: 0;">⚡ EduVance Pro</h1>
        </div>
        <div style="padding: 30px; background: #f8f9fa; border-radius: 0 0 12px 12px;">
          <h2 style="color: #2d3436;">Leave Request ${data.status}</h2>
          <p>Dear <strong>${data.employee_name}</strong>,</p>
          <p>Your leave request has been <strong>${data.status}</strong>:</p>
          <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid ${data.status === 'Approved' ? '#00b894' : '#e17055'};">
            <p><strong>Type:</strong> ${data.leave_type}</p>
            <p><strong>Dates:</strong> ${data.dates}</p>
          </div>
        </div>
      </div>
    `,
  },

  certificateIssued: {
    subject: 'Your Certificate is Ready - EduVance Pro',
    html: (data) => `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #6c5ce7, #00cec9); padding: 30px; text-align: center; border-radius: 12px 12px 0 0;">
          <h1 style="color: white; margin: 0;">⚡ EduVance Pro</h1>
          <p style="color: white; font-size: 2rem; margin: 10px 0;">🏆</p>
        </div>
        <div style="padding: 30px; background: #f8f9fa; border-radius: 0 0 12px 12px;">
          <h2 style="color: #2d3436;">Congratulations!</h2>
          <p>Dear <strong>${data.student_name}</strong>,</p>
          <p>You have successfully completed <strong>${data.course_name}</strong>!</p>
          <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #fdcb6e; text-align: center;">
            <p style="font-size: 3rem; margin: 0;">🏆</p>
            <p><strong>Certificate ID:</strong> ${data.certificate_id}</p>
            <p>Download your certificate from your student portal.</p>
          </div>
        </div>
      </div>
    `,
  },
};

export function sendEmail(templateName, data) {
  const template = emailTemplates[templateName];
  if (!template) {
    console.error(`Email template "${templateName}" not found`);
    return;
  }

  const emailHtml = template.html(data);

  console.log(`%c📧 Email Sent: ${template.subject}`, 'color: #6c5ce7; font-weight: bold');
  console.log(`%cTo: ${data.email || data.student_name || data.name}`, 'color: #636e72');
  console.log(`%cTemplate: ${templateName}`, 'color: #00cec9');
  console.log(`%cHTML:`, 'color: #b2bec3');
  console.log(emailHtml);

  return {
    to: data.email,
    subject: template.subject,
    html: emailHtml,
    sentAt: new Date().toISOString(),
  };
}

export function triggerExamBookingEmail(data) {
  return sendEmail('examBooking', data);
}

export function triggerPaymentReceiptEmail(data) {
  return sendEmail('paymentReceipt', data);
}

export function triggerLoginCredentialsEmail(data) {
  return sendEmail('loginCredentials', data);
}

export function triggerAssignmentSubmittedEmail(data) {
  return sendEmail('assignmentSubmitted', data);
}

export function triggerLeaveStatusEmail(data) {
  return sendEmail('leaveStatus', data);
}

export function triggerCertificateIssuedEmail(data) {
  return sendEmail('certificateIssued', data);
}
