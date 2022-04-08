En este proyecto se esta usando sequelize-cli 

iniciar:
npx sequelize-cli init

crear db:
npx sequelize-cli db:create

crear model:
npx sequelize-cli model:generate --name User --attributes firstName:string, lastNmae:string, email:string

Ejecutar migraciones:
npx sequelize-cli db:migrate

Crear seeder:
npx sequelize-cli seed:generate --name demo-user

Ejecutar seeder:
npx sequelize-cli db:seed:all