import {
  SMTP_PORT,
  SMTP_PASS,
  EMAIL_FROM_NAME,
  EMAIL_FROM,
  SMTP_USER,
  SMTP_HOST,
} from '../constants';

import nodemailer from 'nodemailer';
import { MailOptions } from 'nodemailer/lib/json-transport';

export async function sendMail(
  to: string,
  html: string,
  subject: string = 'y no subject?'
) {
  let transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  } as MailOptions);

  const from = `"${EMAIL_FROM_NAME}" <${EMAIL_FROM}>`;

  let info = await transporter.sendMail({
    from,
    to, // list of receivers
    subject,
    html,
  });

  console.log('Message sent: %s', info.messageId);

  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
}
