import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Application from "@ioc:Adonis/Core/Application";
import Property from 'App/Models/Property';
import uuid from "react-uuid";
import Database from '@ioc:Adonis/Lucid/Database';
export default class PropertiesController {
    public async store({ request, response }: HttpContextContract) {
        try {
            const image = request.file("property_image");
            const body = request.body();
            image!.fileName = `${uuid()}.${image?.extname}`
            if (image) {
                await image.move(Application.tmpPath("uploads"), { name: image?.fileName }); // Application tmpPath -> Pasta tmp, parametro é a pasta uploads
                await Property.create({ ...body, property_image: image?.fileName });
                return response.status(200).json({
                    created: true,
                    message: "Imóvel inserido com sucesso!"
                })
            } else {
                console.log("Não há imagem")
            }

        } catch (err) {
            console.log(err);
        }
    }

    public async index({ response }: HttpContextContract) {
        try {
            const result = await Property.all();
            if (result) {
                return response.status(200).json({
                    message: "All ok",
                    result
                })
            }
        } catch (err) {
            console.log(err);
        }
    }

    public async show({ response, params }: HttpContextContract) {
        try {
            const result = await Database.from("properties")
                .join("users", "users.id", "=", "properties.user_id")
                .select("properties.*")
                .select("users.name")
                .select("users.email")
                .where("properties.id", params.id)
            if (result) {
                return response.status(200).json({
                    search: true,
                    result
                })
            } else {
                return response.status(400).json({
                    search: false,
                    message: "Não foi encontrado nenhum anúncio"
                })
            }
        } catch (err) {
            console.log(err);
        }
    }

    public async findAllWithUser({ response }: HttpContextContract) {
        try {
            const propertySearch = await Database.from("properties")
                .join("users", "users.id", "=", "properties.user_id")
                .select("properties.*")
                .select("users.name")
            return response.status(200).json({
                error: false,
                propertySearch
            })
        } catch (err) {
            console.log(err);
        }
    }

    public async findAllPropertiesIdUser({ response, params }: HttpContextContract) {
        try {
            const propertySearch = await Database.from("properties")
                .join("users", "users.id", "=", "properties.user_id")
                .select("properties.*")
                .where("properties.user_id", params.id);
            if (propertySearch) {
                return response.status(200).json({
                    error: false,
                    propertySearch
                })
            }
        } catch (err) {
            console.log(err);
        }
    }

    public async deleteProperty({ response, params }: HttpContextContract) {
        try {
            const property = await Property.findOrFail(params.id);
            await property.delete()
            return response.status(200).json({
                deleted: true
            })
        } catch (err) {
            console.log(err);
        }
    }
}
