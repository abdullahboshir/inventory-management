// const nodemailer = require('nodemailer');
// const {google} = require('googleapis');

// const oAuth2client = new google.auth.OAhuth2(
// 	process.env.CLIENT_ID,	
// 	process.env.CLIENT_SECRET,
// 	"https://developers.google.com/oauthplayground"	
// );

// oAuth2client.setCredentials({refresh_token: process.env.REFRESH_TOKEN});

// module.exports.sendMailWithtGmail = async (data) => {
// 	const accessToken = await oAuth2client.getAccessToken();

// 	let transporter = nodemailer.createTransport({
// 		service: 'gmail',
// 		auth: {
// 			type: 'OAuth2',
// 			user: process.env.SENDER_MAIL,
// 			clientId: process.env.CLIENT_ID,
// 			clientSecret: process.env.CLIENT_SECRET,
// 			refreshToken: process.env.REFRESH_TOKEN,
// 			accessToken: accessToken
// 		}
// 	});

// 	const mailData = {
// 		from: process.env.SENDER_MAIL,
// 		to: data.to, //list of receiver
// 		subject: data.subject,
// 		text: data.text
// 	};

// 	return info.messageId;
// }

// const formData = require('form-data');
// const Mailgun = require('mailgun.js');
// const mailgun = new Mailgun(formData);


// const mg = mailgun.client({
// 	username: 'api',
// 	key: 'c918463aa88d3850c36a06edf8ea82b9-b0ed5083-fc797c28',
// });

// module.exports.sendMailWithMailGun = async (data) => {
//    const result = await mg.messages
// 	.create("sandboxa9eda165766c44dda6ac0d5777b586ab.mailgun.org", {
// 		from: "Mailgun Sandbox <postmaster@sandboxa9eda165766c44dda6ac0d5777b586ab.mailgun.org>",
// 		to: data.to,
// 		subject: data.subject,
// 		text: data.text,
// 	})
// 	.then(msg => console.log(msg)) // logs response data
// 	.catch(err => console.log(err)); // logs any error`;
//     return result.id
// };




// // You can see a record of this email in your logs: https://app.mailgun.com/app/logs.

// // You can send up to 300 emails/day from this sandbox server.
// // Next, you should add your own domain so you can send 10000 emails/month for free.