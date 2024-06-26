<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

# Ejecutar en desarrollo

1. Clonar el repositorio
2. Ejecutar el siguiente comando para instalar las dependencias

```
npm install
```

3. Tener Nest CLI instalado

```
npm i -g @nest/cli
```

4. Levantar la base de datos

```
docker-componse up -d
```

5. Clonar el archivo **.env.template** y modificar el nombre a **.env**

6. Cargar las variables de entorno en el nuevo archivo **.env**

7. Iniciar el proyecto con el comando **npm run start:dev**

8. Construir una base de datos de prueba

```
http://localhost:3000/api/v1/seed
```

## Stack Utilizado para el proyecto

- Mongo DB
- Nest
