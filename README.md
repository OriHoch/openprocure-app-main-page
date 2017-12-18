## Open Procurement (AKA GovBuy) main page app

#### Development Quickstart

```
yarn install
yarn run dist-serve
```

#### Start the Auth server with self-signed SSL certficiate and keys

To get GitHub OAuth keys, [create a new OAuth App](https://github.com/settings/applications) with the following details:
* Homepage URL: `https://localhost:8001/`
* Authorization callback URL: `https://localhost:8001/auth/oauth_callback`

Create `secret.env` which is used to provide parameters to the auth server, see [datahq/auth](https://github.com/datahq/auth) for more details.

Following commands generates the required keys and creates the `secret.env` file:

```
openssl genrsa -out secret.tmpkey 2048
openssl rsa -in secret.tmpkey -out secret-private.pem -outform pem
openssl rsa -in secret.tmpkey -out secret-public.pem -outform pem -pubout
echo "PRIVATE_KEY=`echo $(cat secret-private.pem)`
PUBLIC_KEY=`echo $(cat secret-public.pem)`
GOOGLE_KEY=
GOOGLE_SECRET=
GITHUB_KEY=
GITHUB_SECRET=
DATABASE_URL=postgresql://postgres:123456@db:5432/postgres
EXTERNAL_ADDRESS=" > secret.env
rm secret.tmpkey secret-private.pem secret-public.pem
```

Generate self-signed ssl certificates:

```
openssl req -new -newkey rsa:4096 -days 365 -nodes -x509 -subj "/C=US/ST=Denial/L=Springfield/O=Dis/CN=localhost" -keyout traefik.key -out traefik.crt
```

Start the docker compose environment

```
docker-compose up
```

* App is available at https://localhost:8001/
* Auth server is available at https://localhost:8001/auth/check
