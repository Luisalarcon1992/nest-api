/* 
Agregando configuraciones de entorno, esto se carga en el archivo .env 
y se puede acceder a través de process.env.
Instalar @nestjs/config mediante el gestor de paquetes.
Para que esto se aplique, dentro del app.module.ts se debe importar "ConfigModule.forRoot({ load: [EnvConfigurations] })".
Esto cargará las configuraciones de entorno en el objeto process.env.

*/

export const EnvConfigurations = () => ({
  environment: process.env.NODE_ENV || "dev",
  mongodb: process.env.MONGODB,
  port: process.env.PORT || 3001,
  defaultLimit: process.env.DEFAULT_LIMIT || 10,
});
