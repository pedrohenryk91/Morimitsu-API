import { EntityNotFoundError } from "../../errors/entityNotFoundError";
import { UserRepository } from "../../repositories/UserRepository";
import { genToken } from "../../utils/jwtToken";
import { sendEmail } from "../../utils/mailer";

export class RequestRecoveryService {
    constructor(private userRepo: UserRepository){}
    async execute(email: string){
        const doesUserExists = await this.userRepo.findByEmail(email);
        if(!doesUserExists){
            throw new EntityNotFoundError("User");
        }
    
        const token = genToken({
            def:"RecovPass;)"
        });

        const hoje = new Date();

        await sendEmail({
            to:email,
            subject:"<No-Reply>Recover Password",
            text:`Olá ${doesUserExists.name},

Recebemos uma solicitação para redefinir a senha da sua conta na Morimitsu.

Para criar uma nova senha, clique no link abaixo (ou copie e cole no seu navegador):
https://morimitsu.com/recoverPassword?token=${token}

Esse link expira em 1 hora. Se você não solicitou a recuperação de senha, ignore este e-mail — sua senha não será alterada.

Atenciosamente,
Equipe Morimitsu`,
            html:`<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Recuperação de senha</title>
</head>
<body style="font-family: system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; background:#f5f7fa; margin:0; padding:20px;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px; margin:0 auto; background:#ffffff; border-radius:8px; box-shadow:0 2px 6px rgba(0,0,0,0.08);">
    <tr>
      <td style="padding:24px;">
        <h2 style="margin:0 0 12px 0; font-size:20px; color:#111827;">Redefina sua senha</h2>
        <p style="margin:0 0 18px 0; color:#374151; line-height:1.5;">
          Olá <strong>${doesUserExists.name}</strong>,
        </p>
        <p style="margin:0 0 20px 0; color:#374151; line-height:1.5;">
          Recebemos uma solicitação para redefinir a senha da sua conta na <strong>Morimitsu</strong>. Clique no botão abaixo para criar uma nova senha.
        </p>

        <p style="text-align:center; margin:18px 0;">
          <a href="https://morimitsu.com/recoverPassword?token=${token}" target="_blank" rel="noopener" style="display:inline-block; padding:12px 20px; border-radius:8px; text-decoration:none; font-weight:600; background:#2563eb; color:#ffffff;">
            Redefinir minha senha
          </a>
        </p>

        <p style="margin:0 0 18px 0; color:#6b7280; font-size:13px; line-height:1.4;">
          Se o botão não funcionar, copie e cole este link no seu navegador:<br>
          <a href="https://morimitsu.com/recoverPassword?token=${token}" target="_blank" rel="noopener" style="color:#2563eb; word-break:break-all;">https://morimitsu.com/recoverPassword?token=${token}</a>
        </p>

        <p style="margin:0 0 8px 0; color:#6b7280; font-size:13px;">
          Observação: o link expira em <strong>1 hora</strong>.
        </p>

        <hr style="border:none; border-top:1px solid #e6e9ef; margin:20px 0;">

        <p style="margin:0 0 6px 0; color:#6b7280; font-size:13px;">
          Se você não solicitou a recuperação de senha, ignore este e-mail — sua senha permanecerá a mesma.
        </p>

        <p style="margin:18px 0 0 0; color:#9ca3af; font-size:12px;">
          &copy; ${hoje.getFullYear()} Morimitsu. Todos os direitos reservados.
        </p>
      </td>
    </tr>
  </table>
</body>
</html>
`,
        });
    }
}