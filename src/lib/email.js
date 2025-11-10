import nodemailer from "nodemailer";

// 🔌 SMTP configuration via .env
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST, // smtp host
  port: parseInt(process.env.EMAIL_PORT, 10), // 587
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Send order confirmation email
export async function sendOrderEmail(to, order) {
  const html = `
    <h2>🎉 Thank you for your order #${order.orderNumber}</h2>
    <p><strong>Current status:</strong> ${order.status}</p>
    <p><strong>Total amount:</strong> ${order.totalAmount} TND</p>
    <p><strong>Shipping address:</strong><br/>
    ${order.shippingAddress.street}, ${order.shippingAddress.city}</p>
    <h3>🛍️ Ordered items:</h3>
    <ul>
      ${order.items.map(item => `<li>${item.title} × ${item.quantity}</li>`).join("")}
    </ul>
    <p>📞 Thank you for your trust. The Tunisia Xplora team is at your disposal.</p>
  `;

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to,
      subject: `🎵 Tunisia Xplora - Order confirmation #${order.orderNumber}`,
      html,
    });

    console.log("✅ Email sent to :", to);
  } catch (err) {
    console.error("❌ Email send failed :", err.message || err);
    throw err;
  }
}

// Send order status update email
export async function sendStatusUpdateEmail(to, order) {
  const html = `
    <h2>📦 Update for your order #${order.orderNumber}</h2>
    <p>🎯 New status: <strong>${order.status}</strong></p>
    <p>We will keep you informed until delivery is complete. Thank you for your loyalty.</p>
  `;

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to,
      subject: `🔔 Tunisia Xplora - Order status #${order.orderNumber}`,
      html,
    });

    console.log("✅ Status email sent to :", to);
  } catch (err) {
    console.error("❌ Email status error :", err.message || err);
    throw err;
  }
}

// Welcome email after registration
export async function sendWelcomeEmail(to, user) {
  const html = `
    <h2>Welcome to Tunisia Xplora, ${user.firstName} 🎉</h2>
    <p>Thanks for creating an account on Tunisia Xplora. Here is a summary of your details:</p>
    <ul>
      <li><strong>Name :</strong> ${user.firstName} ${user.lastName}</li>
      <li><strong>Email :</strong> ${user.email}</li>
      <li><strong>Role :</strong> ${user.role}</li>
    </ul>
    <p>If you did not create this account, ignore this email or contact us.</p>
    <p>🌍 See you soon,<br/>The Tunisia Xplora team</p>
  `;

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to,
      subject: `Welcome to Tunisia Xplora, ${user.firstName}`,
      html,
    });
    console.log("✅ Welcome email sent to :", to);
  } catch (err) {
    console.error("❌ Welcome email failed :", err.message || err);
    // do not throw to avoid interrupting registration flow
  }
}

// Reset password email
export async function sendResetPasswordEmail(to, resetLink) {
  const html = `
    <h2>Password reset</h2>
    <p>You requested to reset your password. Click the link below to set a new password:</p>
    <p><a href="${resetLink}">Reset my password</a></p>
    <p>This link expires in 1 hour. If you did not request this, ignore this email.</p>
    <p>🌍 Tunisia Xplora team</p>
  `;

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to,
      subject: `Tunisia Xplora - Password reset`,
      html,
    });
    console.log("✅ Password reset email sent to :", to);
  } catch (err) {
    console.error("❌ Password reset email failed :", err.message || err);
    // do not throw
  }
}