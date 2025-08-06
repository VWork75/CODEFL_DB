// eslint-disable-next-line @typescript-eslint/no-var-requires
const cds = require('@sap/cds')
const nodemailer = require('nodemailer');

module.exports = {

    _getSmtpConfig: async function (connection) {
        try {
            let aResult = await connection.run(
                SELECT
                    .from`${connection.entities['SMTP_CONFIG']}`
                    .where({ SR_NO: 1 }));

            if (aResult.length > 0) return aResult[0];
            else return null;

        }
        catch (error) { throw error; }
    },

    sendEmail: async function (ToEmails, CCEmail, type, subject, body) {
        try {
            var connection = await cds.connect.to('db');
            const lvEmailConfig = await this._getSmtpConfig(connection);

            const transporter = nodemailer.createTransport({
                host: lvEmailConfig.HOST,
                port: lvEmailConfig.PORT,
                secure: lvEmailConfig.SECURE, // STARTTLS
                auth: {
                    user: lvEmailConfig.USERNAME,
                    pass: lvEmailConfig.PASSWORD,
                },
            });

            var senderEmail = lvEmailConfig.SENDER_EMAIL;

            var mailOptions = {
                from: senderEmail,
                to: ToEmails,
                cc: CCEmail,
                subject: subject
            };

            if(type === "html") mailOptions.html = body;
            else mailOptions.text = body;

            return mailResponse = await transporter.sendMail(mailOptions);

        }
        catch (error) { throw error; }
    }


}