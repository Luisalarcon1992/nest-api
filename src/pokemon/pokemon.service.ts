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
      this.handleException(error);
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
    try {
      await pokemon.updateOne(updatePokemonDto, { new: true });

      return { ...pokemon.toJSON(), ...updatePokemonDto };
    } catch (error) {
      this.handleException(error);
    }
  }

  async remove(id: string) {
    // Esta sería una forma de hacerlo, pero al tener un custom pipe que valide el id de mongo, no es necesario
    // const pokemon = await this.findOne(id);
    // await this.pokemonModel.deleteOne({ _id: pokemon._id });

    // Otra forma de hacerlo
    //  await this.pokemonModel.findByIdAndDelete(id);

    const { deletedCount } = await this.pokemonModel.deleteOne({ _id: id });

    if (deletedCount === 0) {
      throw new BadRequestException(`El pokemon con id '${id}' no existe`);
    }

    return;
  }

  private handleException(error: any) {
    if (error.code === 11000) {
      if (error.keyValue.name) {
        throw new InternalServerErrorException(`El nombre '${error.keyValue.name}' ya existe en la Base de Datos`);
      }

      if (error.keyValue.nro) {
        throw new InternalServerErrorException(`El número '${error.keyValue.nro}' ya existe en la Base de Datos`);
      }
    }
    throw new InternalServerErrorException("Error al crear el pokemon - Revisa los logs");
  }
}
