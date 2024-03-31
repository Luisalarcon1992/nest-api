import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { IPokeResponse } from "./interfaces/poke-response.interface";

@Injectable()
export class SeedService {
  private readonly url: string = "https://pokeapi.co/api/v2/pokemon?limit=1";

  async excuteSeed() {
    try {
      const result = await fetch(this.url);
      if (result.status !== 200) throw new InternalServerErrorException("Error al obtener los datos de la API");

      const data: IPokeResponse = await result.json();

      data.results.forEach(({ name, url }) => {
        const nro = +url.split("/").at(-2);

        console.log(`Nombre: ${name}, Nro: ${nro}))`);
      });

      return data;
    } catch (error) {
      throw new InternalServerErrorException("Error al obtener los datos de la API");
    }
  }
}
