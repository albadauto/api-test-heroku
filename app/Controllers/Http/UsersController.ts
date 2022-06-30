import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User';

export default class UsersController {
    public async createNewUser({ request, response }: HttpContextContract) {
        try {
            const body = request.body();
            if (body) {
                await User.create(body);
                return response.status(200).json({
                    created: true,
                    message: "Usuário criado com sucesso!"
                })
            }
        } catch (err) {
            console.log(err)
        }
    }

    public async findUserById({ response, params }: HttpContextContract) {
        try {
            const result = await User.findOrFail(params.id);
            return response.status(200).json({
                find: true,
                result
            })
        } catch (err) {
            console.log(err);
        }
    }
}
