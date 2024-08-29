import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    var transport = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        /* añadir credenciales en .env */
        user: "tetobotpana@gmail.com",
        pass: "iwfibjuvrbbqryyk",
      },
    });
    const mailOptions = {
      from: '"Tetobot" <tetobotpana@gmail.com>', // sender address
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `
      <p>Click <a href="${
        process.env.DOMAINMAIL
      }/verifyemail?token=${hashedToken}">here</a> to
       ${emailType === "VERIFY" ? "verify your email" : "reset your pasword"}
        or copy and paste the link below in your browser.
        <br>${process.env.DOMAINMAIL}/verifyemail?token=${hashedToken}
       </p>`,
    };

    const mailresponse = await transport.sendMail(mailOptions);
    return mailresponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
