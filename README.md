# airtable-qrcode-gen

An Airtable extension. Generates QR codes which link directly to the corresponding records, and presents additional selected data in a format suitable for label printing (one record per page).

![image](https://github.com/t-richards/airtable-qrcode-gen/assets/3905798/54d6ab8d-3ba7-4b89-a9f5-caa5cc2507a5)

## Getting started

See https://airtable.com/developers/extensions/guides/getting-started

```bash
# Install deps
npm install

# Run the app locally
npm run start
```

## Roadmap

Things to do soon:

- [x] Add CI and dependabot
- [ ] Make ECC mode configurable
- [ ] Make size configurable
- [ ] Publish built version to a stable URL on GitHub Pages

Things to do eventually:

- [ ] Option to change between "deep `airtable://` link to row ID" vs. "encode the text in this cell"
- [ ] Add tests
- [ ] Investigate alternative options for the QR code generation library

Probably not going to happen:

- [ ] Submit to marketplace

## License

[MIT](./LICENSE)
