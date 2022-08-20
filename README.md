En este proyecto se esta usando sequelize-cli 

iniciar:
npx sequelize-cli init

crear db:
npx sequelize-cli db:create

crear model:
npx sequelize-cli model:generate --name User --attributes firstName:string,lastNmae:string,email:string

Ejecutar migraciones:
npx sequelize-cli db:migrate

Quitar todas las migraciones:
npx sequelize-cli db:migrate:undo:all

Quitar migracion especifica
npx sequelize-cli db:migrate:undo:all --to XXXXXXXXXXXXXX-create-posts.js

Crear seeder:
npx sequelize-cli seed:generate --name demo-user

Ejecutar seeder:
npx sequelize-cli db:seed:all

Quitar todos los seeder:
npx sequelize-cli db:seed:undo:all