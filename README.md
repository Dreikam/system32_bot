```sh
git add <. / file/folders> - agregar al git los archivos que quiero guardar
git commit -am "comentario" - darle un comentario a los archivo para saber que carajo modifique
git branch API - creo una rama especial para mi desastre
git checkout API - me nuevo a ese desastre
git push <remote> <rama> - subir mi desastres a github
git remote add <nombre del desastres> <URL DEL REPO> - agregar link del repo
```

```
typescript, express, cors, helmet, morgan
prettier, eslint, husky
```

```
* [+]SRC
** [+] controllers
** [+] routers
** [+] services
** [+] libs
** [+] utils
```

```
npm init -y ;
npm i cors dotenv express helmet morgan ; npm i typescript ts-node eslint nodemon jest @types/cors @types/express @types/jest @types/morgan @types/node @types/supertest -D
```

```
npx eslint --init
```

```
typescript, eslint, prettier

npm i prettier -D
```

```
.prettierrc

npm i eslint-config-prettier -D
[prettier]
```

````
npm i husky
npx husky install
npm i lint-staged -D
npm pkg set scripts.prepare="husky install"
npx husky add .husky/pre-commit "npx lint-staged"
```

```
{
    "lint-staged": {
        '**/*': "prettier --write --ignore-unknown"
    }
}
```

```
git add .
git commit -am ""
````

```
feat: "comentario"
feat(server/Discord): "comentario"
fix!
refactor!:
docs:

https://www.conventionalcommits.org/es/v1.0.0/
```

```
git add .gitignore
git commit -m "feat!: configuration"
```

```
npx tsc --init
npx tsc
```

```
npm i @hapi/boom
```

```
npm i ts-node-dev -D
```

```
npm i prisma -D
npx prisma init --datasource-provider sqlite
```

```
mysql://usuer:password@host:port/database
postgress://usuer:password@host:port/database

prisma.io

npx prisma migrate dev
```

```
GET = Pedir informacion
POST = ENVIAR informacion
PUT = Actualizar toda la informacion
PATCH = Actualizar algo espesifico
DELETE = Eliminar informacion
```