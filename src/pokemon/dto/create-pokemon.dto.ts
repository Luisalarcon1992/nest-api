import { IsInt, IsPositive, IsString, Min, MinLength } from "class-validator";

export class CreatePokemonDto {
  @IsString({ message: "El nombre debe ser un string" })
  @MinLength(3, { message: "El nombre debe tener al menos 3 caracteres" })
  name: string;

  @IsInt({ message: "El número debe ser un entero" })
  @IsPositive({ message: "El número debe ser positivo" })
  @Min(1)
  nro: number;
}
