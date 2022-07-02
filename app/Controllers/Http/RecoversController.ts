import Mail from '@ioc:Adonis/Addons/Mail';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User';

export default class RecoversController {

    public async recoverPass({ response, request }: HttpContextContract){
        try{
            const { email } = request.body();
            const resultOfMail = await User.findBy("email", email);
            if (resultOfMail){
                const code = Math.random().toString(36).slice(-10);
                this.SendMail(`Código de recuperação: ${code}`,
                    "joseadauto923@hotmail.com",
                    email,
                    "Recuperação de senha IMOBI PROJECT"
                )
                return response.status(201).json({
                    message:"Email com código de verificação enviado"
                })
            }else{
                return response.status(400).json({
                    message:"Não foi encontrado este email no nosso sistema."
                })
            }
        }catch(err){
            console.log(err);
        }
    }



    private async SendMail(content:string, from: string, to: string, subject:string){
        try{
            await Mail.send((message) => {
                message
                .from(from)
                .to(to)
                .subject(subject)
                .text(content)
            })
        }catch(err){
            console.log(err);
        }
    }
}
