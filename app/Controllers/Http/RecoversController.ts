import Mail from '@ioc:Adonis/Addons/Mail';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RecoversController {

    public async recoverPass({  request }: HttpContextContract){
        try{
            const email = request.body();
            console.log(email)
            
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
