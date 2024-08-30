set dotenv-load

recipe-name:
  echo 'This is a recipe!'

# this is a comment
another-recipe:
  @echo 'This is another recipe.'

generate-assets:
  npm run generate-pwa-assets

dev: 
  npm run dev

build:
  npm run build

preview:
  npm run preview 

deploy:
  ngrok http --domain=$MY_DOMAIN 5174 \
  --oauth google \
  --oauth-allow-email $EMAIL1 \
  --oauth-allow-email $EMAIL2
