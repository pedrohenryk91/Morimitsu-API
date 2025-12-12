import { hash } from "bcryptjs";
import { EntityNotFoundError } from "../../errors/entityNotFoundError";
import { UserRepository } from "../../repositories/UserRepository";
import { genToken } from "../../utils/jwtToken";
import { sendEmail } from "../../utils/mailer";
import { genSixDigitCode } from "../../utils/sixDigitsCode";

export class RequestRecoveryService {
    constructor(private userRepo: UserRepository){}
    async execute(email: string){
        const doesUserExists = await this.userRepo.findByEmail(email);
        if(!doesUserExists){
            throw new EntityNotFoundError("User");
        }
    
        const code = genSixDigitCode();
        const recovToken = genToken({
            sub: "RecovPass;)"
        })

        const hoje = new Date();

        await sendEmail({
            to:email,
            subject:"<No-Reply>Recover Password",
            text:`Olá ${doesUserExists.name},

            Recebemos uma solicitação para redefinir a senha da sua conta na Morimitsu.

            Use o código de verificação abaixo para continuar o processo de recuperação:

            Código de verificação (6 dígitos):
            ${code}

            Insira esse código na tela de recuperação para criar uma nova senha.

            Observação: o código expira em 1 hora.

            Se você não solicitou a recuperação de senha, ignore esta mensagem. Sua senha permanecerá inalterada.

            © ${hoje.getFullYear()} Morimitsu. Todos os direitos reservados.
            `,
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

                          <p style="margin:0 0 18px 0; color:#374151; line-height:1.5;">
                            Recebemos uma solicitação para redefinir a senha da sua conta na <strong>Morimitsu</strong>. Use o código de segurança abaixo para prosseguir com a redefinição de senha.
                          </p>

                          <p style="text-align:center; margin:18px 0;">
                            <div style="display:inline-block; padding:18px 22px; border-radius:10px; background:#f1f5f9; border:1px solid #e6e9ef;">
                              <span style="display:block; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, 'Roboto Mono', 'Helvetica Neue', monospace; font-size:28px; letter-spacing:6px; color:#111827; font-weight:700;">
                                ${code}
                              </span>
                              <span style="display:block; margin-top:8px; color:#6b7280; font-size:13px;">Código de verificação (6 dígitos)</span>
                            </div>
                          </p>

                          <p style="margin:0 0 12px 0; color:#374151; line-height:1.5; text-align:center;">
                            Insira este código na tela de recuperação para criar uma nova senha.
                          </p>

                          <p style="margin:0 0 8px 0; color:#6b7280; font-size:13px;">
                            Observação: o código expira em <strong>1 hora</strong>.
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

        const hashCode = await hash(code, 11);
        return {
            hashCode,
            recovToken,
        };
    }
}