import * as nodemailer from 'nodemailer';
import { MAIL_SENDER, MAIL_PASSWORD, MAIL_HOST, MAIL_PORT } from '$env/static/private';
import { prisma } from './db';
import ejs from 'ejs';
import fs from 'fs';
export class MailerService {
	private transporter;
	constructor() {
		this.transporter = nodemailer.createTransport({
			host: MAIL_HOST,
			port: Number(MAIL_PORT),
			secure: false, // true for 465, false for other ports
			auth: {
				user: MAIL_SENDER,
				pass: MAIL_PASSWORD
			},
			tls: {
				rejectUnauthorized: false
			}
		});
	}

	async sendEmail(to: string[], subject: string, html: string): Promise<boolean> {
		try {
			const mailOptions = {
				from: MAIL_SENDER,
				to,
				subject,
				html
			};

			await this.transporter.sendMail(mailOptions);
			return true;
		} catch (error) {
			console.log(error);
			return false;
		}
	}

	/* HOW TO USE
	Create a html file you want to use in src/lib/server/email-templates
	mailer.sendHtmlEmail({
		htmlTemplateName: 'register-welcome.ejs',
		subject: 'Welcome to the platform',
		to: ['koesterjannik1998@gmail.com'],
		data: {
			name: 'Niklas'
		}
	});
	

	*/
	async sendHtmlEmail({
		to,
		subject,
		htmlTemplateName,
		data
	}: {
		to: string[];
		subject: string;
		htmlTemplateName: string;
		data: any;
	}) {
		try {
			const filePath = 'email-templates';
			const htmlFromTemplate = ejs.render(
				fs.readFileSync(`${filePath}/${htmlTemplateName}`, 'utf8'),
				data
			);
			return await mailer.sendEmail(to, subject, htmlFromTemplate);
		} catch (error) {
			console.log(error);
			console.log('error sending mail');
			return false;
		}
	}
}

const mailer = new MailerService();

export default mailer;
