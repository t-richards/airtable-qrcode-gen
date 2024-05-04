# airtable-qrcode-gen

An Airtable extension. Generates QR codes which link directly to the corresponding records, and presents additional selected data in a format suitable for label printing (one record per page).

https://user-images.githubusercontent.com/3905798/140627007-d4d4e69e-d317-4ff4-a4c3-3c35bb6446d2.mp4

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
