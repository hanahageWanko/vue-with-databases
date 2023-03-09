# Prisma with Supabase

## Create Set up

```bash
yarn add -D typescript ts-node @types/node // TypeScriptインストール
npx tsc-init // tscの初期化
yarn add -D prisma // Prismaインストール
npx prisma init // Prismaの設定ファイル作成
// prisma/schema.prismaにスキーマを定義
// DBの設定(本件では、Supabaseを利用する為、Connection Stringの設定)
npx prisma migrate dev // マイグレーション
or
npx prisma migrate dev --name init // マイグレーションに名前を付けて実施
```

## Prisma で利用できるコメントのオプション確認

`npx prisma`

```bash
 % npx prisma

◭  Prisma is a modern DB toolkit to query, migrate and model your database (https://prisma.io)

Usage

  $ prisma [command]

Commands

            init   Set up Prisma for your app
        generate   Generate artifacts (e.g. Prisma Client)
              db   Manage your database schema and lifecycle
         migrate   Migrate your database
          studio   Browse your data with Prisma Studio
          format   Format your schema

Flags

     --preview-feature   Run Preview Prisma commands

Examples

  Set up a new Prisma project
  $ prisma init

  Generate artifacts (e.g. Prisma Client)
  $ prisma generate

  Browse your data
  $ prisma studio

  Create migrations from your Prisma schema, apply them to the database, generate artifacts (e.g. Prisma Client)
  $ prisma migrate dev

  Pull the schema from an existing database, updating the Prisma schema
  $ prisma db pull

  Push the Prisma schema state to the database
  $ prisma db push

```
