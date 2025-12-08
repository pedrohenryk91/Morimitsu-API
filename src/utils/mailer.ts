import nodemailer from "nodemailer"
import { EMAIL_ADDRESS, EMAIL_PASSWORD, NODE_ENV } from "../lib/env"
import { Email } from "../lib/interfaces/email"

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure:true,
    auth:{
        user: EMAIL_ADDRESS,
        pass: EMAIL_PASSWORD,
    },
    tls:{
        rejectUnauthorized:false,
    }
})

export async function sendEmail(email: Email) {
    if(NODE_ENV !== "deploy"){
        return;
    }
    return transporter.sendMail({
        from:`App Auth <No-Reply>`,
        to: email.to,
        subject: email.subject,
        text: email.text,
        html: email.html,
    })
}