# Welcome to Remix!

- [Remix Docs](https://remix.run/docs)

## Setup?

### Configure the database ft. Planetscale(PostgreSQL)
https://www.prisma.io/docs/guides/database/using-prisma-with-planetscale
https://github.com/prisma/prisma/issues/7292

### Use Data Proxy URLs
For running on the edge, you'd be required to use the [Prisma Data Platform](https://www.prisma.io/docs/concepts/components/prisma-data-platform) (Data Proxy URLs) to interact with your cloud DB instance(no local connections allowed). Get connection string of the form `prisma://aws-us-east-1.prisma-data.com/?api_key=...` from the data platform, by connecting your cloud DB instance.

### Setup Prisma
1. Set the DATABASE_URL in the .env file to point to your existing database. If your database has no tables yet, read https://pris.ly/d/getting-started
2. Set the provider of the datasource block in schema.prisma to match your database: `postgresql`(for us). There are other configs we're not using like `mysql`, `sqlite`, `sqlserver` (Preview) or `mongodb` (Preview).
3. Run `npx prisma db pull` to turn your database schema into a Prisma schema
4. Open the `.env` file and place the connecting string(Postgres Connection URL) against `DATABASE_URL`. Prisma is smart enough to use this by its special annotation in the `/prisma/schema.prisma` file `env("DATABASE_URL")`. Keep `postgresql` as the DB type
5. Run `npm run generate` to generate the Prisma Client (with Data Proxy enabled) . You can then start querying your database.

### Misc Steps
- Migrate: `npm run migrate:dev` and `npm run migrate:deploy`
- Seed: `npm run seed`
- Reset - `npm run migrate:reset`
All the above commands require the original connection string, so keep the connection string handy, and manually update them in `schema.prisma` before running your local migrations. Once done, revert back to the original Data Proxy URLs to allow for Prisma client calls

### Others
To open studio use `npx prisma studio`


## Development

You will be running several processes during development:

- The Miniflare server (miniflare is a local environment for Cloudflare Workers)
- The Remix development server
- TailwindCSS server to watch and emit updated CSS files

```sh
# in one tab, start the remix dev server
$ npm run dev
```
> If you'd like to change any aspects of this behavior, see how the commands are configured in your `package.json` file

Open up [http://127.0.0.1:8787](http://127.0.0.1:8787) and you should be ready to go!

## Deployment

Use [wrangler](https://developers.cloudflare.com/workers/cli-wrangler) to build and deploy your application to Cloudflare Workers. If you don't have it yet, follow [the installation guide](https://developers.cloudflare.com/workers/cli-wrangler/install-update) to get it setup. Be sure to [authenticate the CLI](https://developers.cloudflare.com/workers/cli-wrangler/authentication) as well.

If you don't already have an account, then [create a cloudflare account here](https://dash.cloudflare.com/sign-up) and after verifying your email address with Cloudflare, go to your dashboard and set up your free custom Cloudflare Workers subdomain.

Once that's done, you should be able to deploy your app:

```sh
npm run deploy
```
