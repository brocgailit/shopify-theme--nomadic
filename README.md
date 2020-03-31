# Shopify Theme: Nomadic Effects

## Prerequisites

- [Shopify Theme Kit](https://shopify.github.io/themekit/)
- [Prepros](https://prepros.io/downloads)

## Usage

### Configuration

Locally add a `config.yml` file:
```
development:
  password: API_PASSWORD
  theme_id: THEME_ID
  store: STORE_URL
```

### Watching for Changes

Load project in Prepros and run `theme watch --notify=./ready.notify`

This uploads files to Shopify and automatically reloads the Prepros proxy.