import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  /** */
  async sendUserConfirmation(user: any, token: string) {
    const url = `=http://localhost:3000/verifyingEmail/${token}`;
    console.log("mail sent");
    await this.mailerService.sendMail({
      to: user.email,
      from: 'shamilyanbu2000@gmail.com',
      subject: 'Welcome to Nice App! Confirm your Email',
      html: `<html>
      <p>Hey </p>
<p>Please click below to confirm your email</p>
<p>
    <a href= >Confirm</a>
</p>

<p>If you did not request this email you can safely ignore it.</p>

      </html>`,
      //   template: "/src/mail/Templates/confirmation.hbs",
      //   context: {
      // name: user.name,
      //     url,
      //   },
    });
  }
}
