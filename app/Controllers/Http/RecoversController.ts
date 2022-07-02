import Mail from '@ioc:Adonis/Addons/Mail';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Recover from 'App/Models/Recover';
import User from 'App/Models/User';

export default class RecoversController {

    public async recoverPass({ response, request }: HttpContextContract) {
        try {
            const { email } = request.body();
            const resultOfMail = await User.findBy("email", email);
            const user_id = resultOfMail?.id;
            if (resultOfMail) {
                const code = Math.random().toString(36).slice(-10);
                await Recover.create({ code, user_id });
                this.SendMail(`Código de recuperação: ${code}`,
                    "joseadauto923@hotmail.com",
                    email,
                    "Recuperação de senha IMOBI PROJECT"
                )
                return response.status(201).json({
                    message: "Email com código de verificação enviado"
                })
            } else {
                return response.status(400).json({
                    message: "Não foi encontrado este email no nosso sistema."
                })
            }
        } catch (err) {
            console.log(err);
        }
    }

    public async verifyCode({ response, request }: HttpContextContract) {
        try {
            const { code, password } = request.body();
            if (code && password) {
                let codeSearch = await Recover.findBy("code", code);
                if (codeSearch) {
                    const userPass = await User.findBy("id", codeSearch.user_id);
                    userPass!.password = password;
                    await userPass?.save();
                    return response.status(200).json({
                        updated: true,
                        message: "Senha atualizada com sucesso!"
                    })
                } else {
                    return response.status(400).json({
                        updated: false,
                        message: "Erro! Verifique se o código está correto e tente novamente"
                    })
                }
            } else {
                return response.status(400).json({
                    updated: false,
                    message: "Erro! Insira o código ou a senha para continuar"
                })
            }
        } catch (err) {
            console.log(err)
        }
    }



    private async SendMail(content: string, from: string, to: string, subject: string) {
        try {
            await Mail.send((message) => {
                message
                    .from(from)
                    .to(to)
                    .subject(subject)
                    .text(content)
            })
        } catch (err) {
            console.log(err);
        }
    }
}
