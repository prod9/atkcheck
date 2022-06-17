# ATKCheck

Web for upload ATK and sent information to discord channel and google sheet .
https://atkcheck.prodigy9.co/

## 🚀 Getting start

- Install [pnpm](https://pnpm.io/)
- Clone the project
- create `.env` and copy `.env.example`

```bash
# create google OAuth access credentials
VITE_GOOGLE_CLIENT_ID=""
VITE_GOOGLE_CLIENT_SECRET=""
VITE_GOOGLE_OAUTH_REDIRECT_URL="http://localhost:3000"
# copy id from google sheet
VITE_GOOGLE_SHEET_ID=""
# create script in google sheet script app, deploy and get script url
VITE_GOOGLE_SCRIPT_URL=""
# discord webhook url
VITE_DISCORD_WEBHOOK_URL=""
# transloadit auth key
VITE_TRANSLOADIT_AUTH=""
```

- run `pnpm install` to install dependencies

## 💻 Developing

```bash
pnpm run dev

# or start and expose server to other devices on this network

pnpm run dev --host
```

## 🏠 Building

To create a production version of your app:

```bash

pnpm run build

```

## 🌍 Deploy

Push to the `main` branch to deploy on production.

## 📝 References

- [Sveltekit](https://kit.svelte.dev/)
- [Google create access credentials](https://developers.google.com/workspace/guides/create-credentials)
- [Google App script](https://developers.google.com/apps-script/samples)
- [learn-to-send-email-via-google-script-html-no-server](https://github.com/dwyl/learn-to-send-email-via-google-script-html-no-server)
- [Transloadit](https://transloadit.com/)
- [Discord Webhook](https://discord.com/developers/docs/resources/webhook)
