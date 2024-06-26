import { Module } from "@nestjs/common";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";
import { PokemonModule } from "./pokemon/pokemon.module";
import { MongooseModule } from "@nestjs/mongoose";
import { CommonModule } from "./common/common.module";
import { SeedModule } from "./seed/seed.module";
import { ConfigModule } from "@nestjs/config";
import { EnvConfigurations } from "./config/app.config";
import { joiValidation } from "./config/joi.validation";
@Module({
  imports: [
    ConfigModule.forRoot({ load: [EnvConfigurations], validationSchema: joiValidation }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "public"),
    }),
    PokemonModule,
    MongooseModule.forRoot(process.env.MONGODB),
    CommonModule,
    SeedModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
