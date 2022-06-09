import nodemailer from 'nodemailer';
import { google } from 'googleapis';
import type { RequestHandler } from '@sveltejs/kit';
import dotenv from 'dotenv';
dotenv.config();

const CLIENT_ID = process.env['CLIENT_ID'];
const CLIENT_SECRET = process.env['CLIENT_SECRET'];
const REDIRECT_URI = process.env['REDIRECT_URI'];
const REFRESH_TOKEN = process.env['REFRESH_TOKEN'];
const AUTH_USER = process.env['AUTH_USER'];
const FROM = process.env['FROM'];

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

export const post: RequestHandler = async ({ request }) => {
	const { to } = await request.json();
	const messageId = await sendEmail(to);
	return {
		body: {
			success: messageId ? true : false
		}
	};
};

export async function sendEmail(to: string) {
	console.log(`Sending email to ${to} from ${FROM}`);
	try {
		const accessToken = await oAuth2Client.getAccessToken();
		console.log('accesstoken', accessToken);
		let transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				type: 'OAuth2',
				user: AUTH_USER,
				clientId: CLIENT_ID,
				clientSecret: CLIENT_SECRET,
				refreshToken: REFRESH_TOKEN,
				accessToken: accessToken as string
			}
		});
		let mailOptions = {
			from: FROM,
			to: to,
			subject: `The subject goes here`,
			html: `The body of the email goes here in HTML`
		};
		let info = await transporter.sendMail(mailOptions);
		return info.messageId;
	} catch (error) {
		console.log(error);
	}
}
