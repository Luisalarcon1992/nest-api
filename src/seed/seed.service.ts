import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { IPokeResponse } from "./interfaces/poke-response.interface";
import { Pokemon } from "src/pokemon/entities/pokemon.entity";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class SeedService {
  private readonly url: string = "https://pokeapi.co/api/v2/pokemon?limit=650";

  constructor(@InjectModel(Pokemon.name) private readonly pokemonModel: Model<Pokemon>) {}

  async excuteSeed() {
    try {
      await this.pokemonModel.deleteMany({});

      const result = await fetch(this.url);
      if (result.status !== 200) throw new InternalServerErrorException("Error al obtener los datos de la API");

      const data: IPokeResponse = await result.json();

      const pokemonToInserte: { name: string; nro: number }[] = [];

      data.results.forEach(({ name, url }) => {
        const nro = +url.split("/").at(-2);

        pokemonToInserte.push({ name, nro });
      });

      await this.pokemonModel.insertMany(pokemonToInserte);

      return "Datos creados correctamente";
    } catch (error) {
      throw new InternalServerErrorException("Error al obtener los datos de la API");
    }
  }
}
