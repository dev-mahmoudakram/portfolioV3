import path from "path";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import type { ContactPayload } from "@/types";
import { validateContactPayload } from "@/server/portfolio-data";

export const dynamic = "force-dynamic";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_EMAIL,
    pass: process.env.GMAIL_APP_PASSWORD
  }
});

const LOGO_PATH = path.join(process.cwd(), "public/images/akram logo/logo-11.png");

function row(label: string, value: string, isLink = false): string {
  return `<tr>
    <td style="padding:12px 0;border-bottom:1px solid #ede8ff;">
      <span style="display:block;font-size:10px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#7148D4;margin-bottom:3px;font-family:Arial,sans-serif;">${label}</span>
      ${isLink
        ? `<a href="mailto:${value}" style="font-size:15px;color:#2607DC;text-decoration:none;font-family:Arial,sans-serif;">${value}</a>`
        : `<span style="font-size:15px;color:#1a1240;font-family:Arial,sans-serif;">${value}</span>`
      }
    </td>
  </tr>`;
}

function buildEmailHtml(payload: ContactPayload): string {
  const date = new Date().toLocaleDateString("en-US", {
    weekday: "long", year: "numeric", month: "long", day: "numeric"
  });

  const phoneRow   = payload.phone   ? row("Phone",   payload.phone)   : "";
  const subjectRow = payload.subject ? row("Subject", payload.subject) : "";

  return `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
  <meta name="x-apple-disable-message-reformatting"/>
</head>
<body style="margin:0;padding:0;background-color:#f0eeff;" bgcolor="#f0eeff">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#f0eeff" style="background-color:#f0eeff;">
  <tr>
    <td align="center" bgcolor="#f0eeff" style="background-color:#f0eeff;padding:36px 16px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;">

        <!-- HEADER -->
        <tr>
          <td align="center" bgcolor="#2607DC" style="background-color:#2607DC;background-image:linear-gradient(135deg,#2607DC 0%,#7148D4 100%);border-radius:16px 16px 0 0;padding:32px 32px 28px;">
            <img src="cid:logo" width="110" alt="Mahmoud Akram" style="display:block;margin:0 auto 16px;width:110px;max-width:110px;height:auto;"/>
            <h1 style="margin:0 0 6px;font-size:22px;font-weight:700;color:#ffffff;font-family:Arial,sans-serif;line-height:1.3;">New Message Received</h1>
            <p style="margin:0;font-size:12px;color:rgba(255,255,255,0.7);font-family:Arial,sans-serif;">${date}</p>
          </td>
        </tr>

        <!-- BODY -->
        <tr>
          <td bgcolor="#ffffff" style="background-color:#ffffff;padding:28px 28px 20px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f8f5ff;border-radius:12px;overflow:hidden;border:1px solid #ede8ff;margin-bottom:22px;">
              <tr>
                <td bgcolor="#f8f5ff" style="background-color:#f8f5ff;padding:0 20px;">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                    ${row("From",  payload.name)}
                    ${row("Email", payload.email, true)}
                    ${phoneRow}
                    ${subjectRow}
                    <tr><td style="padding:4px 0;"></td></tr>
                  </table>
                </td>
              </tr>
            </table>

            <p style="margin:0 0 8px;font-size:10px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#7148D4;font-family:Arial,sans-serif;">Message</p>

            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-radius:10px;overflow:hidden;">
              <tr>
                <td width="3" bgcolor="#7148D4" style="background-color:#7148D4;width:3px;">&nbsp;</td>
                <td bgcolor="#f8f5ff" style="background-color:#f8f5ff;padding:14px 18px;border:1px solid #ede8ff;border-left:none;">
                  <p style="margin:0;font-size:15px;line-height:1.8;color:#2d1f5e;font-family:Arial,sans-serif;">${payload.message.replace(/\n/g, "<br/>")}</p>
                </td>
              </tr>
            </table>

            <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-top:24px;">
              <tr>
                <td align="center">
                  <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td align="center" bgcolor="#2607DC" style="background-color:#2607DC;border-radius:100px;padding:12px 30px;">
                        <a href="mailto:${payload.email}?subject=Re%3A%20${encodeURIComponent(payload.subject || "Your message")}" style="color:#ffffff;text-decoration:none;font-size:14px;font-weight:700;font-family:Arial,sans-serif;white-space:nowrap;">
                          Reply to ${payload.name} &rarr;
                        </a>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- FOOTER -->
        <tr>
          <td bgcolor="#f0eeff" style="background-color:#f0eeff;border-radius:0 0 16px 16px;padding:16px 28px;text-align:center;">
            <p style="margin:0;font-size:12px;color:#9985cc;font-family:Arial,sans-serif;">Mahmoud Akram &mdash; Portfolio</p>
          </td>
        </tr>

      </table>
    </td>
  </tr>
</table>
</body>
</html>`;
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as ContactPayload;
    const { errors, data } = validateContactPayload(payload);
    if (errors.length > 0) {
      return NextResponse.json({ ok: false, message: "Validation failed.", errors }, { status: 400 });
    }
    transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.GMAIL_EMAIL}>`,
      to: process.env.GMAIL_EMAIL,
      replyTo: data.email,
      subject: `✉️ New message from ${data.name}${data.subject ? ` — ${data.subject}` : ""}`,
      text: `Name: ${data.name}\nEmail: ${data.email}\n${data.phone ? `Phone: ${data.phone}\n` : ""}${data.subject ? `Subject: ${data.subject}\n` : ""}\n${data.message}`,
      html: buildEmailHtml(data),
      attachments: [
        {
          filename: "logo.png",
          path: LOGO_PATH,
          cid: "logo"
        }
      ]
    }).catch((err) => console.error("Email send failed:", err));
    return NextResponse.json({ ok: true, message: "Message sent successfully." }, { status: 200 });
  } catch (error) {
    console.error("Contact route error:", error);
    return NextResponse.json({ ok: false, message: "Something went wrong. Please try again." }, { status: 500 });
  }
}
