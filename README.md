# Getting started with Strapi

Strapi comes with a full featured [Command Line Interface](https://docs.strapi.io/dev-docs/cli) (CLI) which lets you scaffold and manage your project in seconds.

### `develop`

Start your Strapi application with autoReload enabled. [Learn more](https://docs.strapi.io/dev-docs/cli#strapi-develop)

```
npm run develop
# or
yarn develop
```

### `start`

Start your Strapi application with autoReload disabled. [Learn more](https://docs.strapi.io/dev-docs/cli#strapi-start)

```
npm run start
# or
yarn start
```

### `build`

Build your admin panel. [Learn more](https://docs.strapi.io/dev-docs/cli#strapi-build)

```
npm run build
# or
yarn build
```

# Setup Rasa in Local


### Create a Virtual Environment

First, create a virtual environment to isolate your Rasa dependencies. You can do this using `venv`:

```bash
python -m venv rasa_env

### active env 
.\rasa_env\Scripts\activate

```
### Install Rasa

```bash
pip install uv

uv pip install rasa-pro --extra-index-url=https://europe-west3-python.pkg.dev/rasa-releases/rasa-pro-python/simple/

```

### Set licence

##Get license key from rasa developer

"https://rasa.com/rasa-pro-developer-edition-license-key-request/"

``` Shell
[System.Environment]::SetEnvironmentVariable('RASA_PRO_LICENSE','<your-license-string>','USER')

```

### Rasa Run

```bash
rasa run -m models --enable-api --cors "*"

```

## Required Dependencies
``` bash
react: 16.8.3 
react-dom: 16.8.3
rasa-webchat: 1.0.1
python: 3.10.5
```


