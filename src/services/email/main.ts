import * as SendGrid from '@sendgrid/mail';
import { config } from 'dotenv';

config();

SendGrid.setApiKey(process.env.SENDGRID_API_KEY);

export const bulkSendEmail = async () => {
  const res = await SendGrid.sendMultiple({
    to: 'test@example.com',
    from: 'test@example.com',
    subject: 'Sending with SendGrid is Fun',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  });
  return res;
};

export const sendEmail = async () => {
  const res = await SendGrid.send({
    to: 'test@example.com',
    from: 'test@example.com',
    subject: 'Sending with SendGrid is Fun',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  });
  return res;
};
