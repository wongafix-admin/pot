import makeHttpError from '../helpers/http-error';

const nodemailer = require('nodemailer');

export default function sendEmail (httpRequest) {
    let msgInfo = httpRequest.body
    
    if (!msgInfo) {
        return makeHttpError({
        statusCode: 400,
        errorMessage: 'Bad request. No POST body.'
        })
    }

    if (typeof httpRequest.body === 'string') {
        try {
            msgInfo = JSON.parse(msgInfo)
        } catch {
        return makeHttpError({
            statusCode: 400,
            errorMessage: 'Bad request. POST body must be valid JSON.'
        })
        }
    }


    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'wongafixmail@gmail.com',
          pass: '!321Wongafix_Admin',
        },
    });
    

    const template = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="en-GB">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <title>Wonder Double Season Greetings</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    
        <style type="text/css">
            @media screen {
              @font-face {
                font-family: 'Lato';
                font-style: normal;
                font-weight: 400;
                src: local('Lato Regular'), local('Lato-Regular'), url(https://fonts.gstatic.com/s/lato/v11/qIIYRU-oROkIk8vfvxw6QvesZW2xOQ-xsNqO47m55DA.woff) format('woff');
              }
            
              body {
                font-family: "Lato", "Lucida Grande", "Lucida Sans Unicode", Tahoma, Sans-Serif;
              }
            }
        </style>
    </head>
    <body style="margin: 0; padding: 0;">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
            <tr>
                <td>
                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="border-collapse: collapse; border: 1px solid #cccccc;">
                        <tr>
                            <td bgcolor="#edebea" align="center"  style="padding: 30px 10px;">
                                <img src="https://wongafix-assets.s3.eu-west-1.amazonaws.com/email/small-logo.png" alt="WonderDouble banner" width="150" title="" style="display: block;" />
                                
                            </td>
                        </tr>
                        <tr>
                            <td bgcolor="#fff" style="padding: 100px 30px;">
                                
                                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse; color:#444">
                                    <tr>
                                        <td style="padding: 0;">
                                            <p style="margin: 0; font-family: Arial, sans-serif; text-align:left;">`+msgInfo.message+`</h2>
                                        </td>
                                    </tr>
                                </table>    
                            </td>
                        </tr>
                        <tr>
                            <td align="center" bgcolor="#2fad51" style="padding: 10px 0; color:#ffffff;">
                                <table border="0" cellpadding="0" cellspacing="0" width="100%"  style="border-collapse: collapse;">
                                    <tr>
                                        <td align="center" valign="top">
                                            <p>ADDRESS<br>Suite 13, Unique Shopping Mall, <br>Works Road, <br>GRA Ikeja, Lagos.<br><br><span style="font-size:14px;">+234-905-815-4095<br> info@wongafix.com</span>
                                            </p>
                                        </td> 
                                    </tr>
                                </table>
                                
                            </td>
                        </tr>
                        <tr>
                            <td align="center" bgcolor="#edebea">
                               <p style="color:#343c64; font-size:14px;">&copy Wongafix 2021</p>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </body>
    </html>`;


    transporter.sendMail({
        from: '"Wongafix" <wongafixmail@gmail.com>', // sender address
        to: msgInfo.email, // list of receivers
        subject: msgInfo.topic, // Subject line
        text: msgInfo.message, // plain text body
        html: template, // html body
        }).then(info => {
            console.log(info);
            return {
                status: "success",
                message: info
            }
        }).catch(error => {
            return {
                status: "error",
                message: error
            }
        });
        
}