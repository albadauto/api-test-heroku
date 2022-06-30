import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User';
interface IUser{
    id: number
}
export default class AuthController {
    public async verifyLogin({request,response,auth}: HttpContextContract){
        try{
            const { email, password } = request.body();
            const { id } = await User.findBy("email", email) as IUser;
            const token = await auth.attempt(email, password);
            if(token){
                return response.status(200).json({
                    auth: true,
                    id,
                    token
                })
            }
        }catch(err){
            return response.status(400).json({
                auth: false,
                message: "Usuário não encontrado"
            })
        }
    }
}
