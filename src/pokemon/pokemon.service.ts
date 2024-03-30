import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { CreatePokemonDto } from "./dto/create-pokemon.dto";
import { UpdatePokemonDto } from "./dto/update-pokemon.dto";
import { Model, isValidObjectId } from "mongoose";
import { Pokemon } from "./entities/pokemon.entity";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class PokemonService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
  ) {}

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLowerCase();
    try {
      const pokemonCreated = await this.pokemonModel.create(createPokemonDto);
      return pokemonCreated;
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException(`El nombre '${error.keyValue.name}' ya existe en la Base de Datos`);
      }

      console.log(error);
      throw new InternalServerErrorException("Error al crear el pokemon - Revisa los logs");
    }
  }

  async findAll() {
    return await this.pokemonModel.find();
  }

  async findOne(id: string) {
    let pokemon: Pokemon;

    // número del pokemon
    if (!isNaN(+id)) {
      const nro = +id;
      pokemon = await this.pokemonModel.findOne({ nro }); // consulta a la base de datos, se le pasa el objeto para buscar
    }

    // mongoID
    const mongoID = id.trim();
    if (!pokemon && isValidObjectId(mongoID)) {
      pokemon = await this.pokemonModel.findById(mongoID);
    }

    if (!pokemon) {
      pokemon = await this.pokemonModel.findOne({ name: id.toLowerCase().trim() }); // consulta a la base de datos, se le pasa el objeto para buscar
    }

    if (!pokemon) {
      throw new NotFoundException(`El pokemon con id, nombre o número '${id}' no existe`);
    }

    return pokemon;
  }

  async update(id: string, updatePokemonDto: UpdatePokemonDto) {
    const pokemon = await this.findOne(id);

    if (updatePokemonDto.name) {
      updatePokemonDto.name = updatePokemonDto.name.toLowerCase();
    }

    await pokemon.updateOne(updatePokemonDto, { new: true });

    return pokemon;
  }

  remove(id: number) {
    return `This action removes a #${id} pokemon`;
  }
}
