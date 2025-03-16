# TODO

- update whats new
- todo items

## PWA

- [ ] Use Lighthouse in Chrome developer tools to verify that the app is installable and meets PWA requirements.

## Set up hook to prevent pushing to main without passing linters

- [ ] `npx husky init`
- [ ] Add a pre-push hook (can copy from https://github.com/skedwards88/deep-space-slime/blob/main/.husky/pre-push)

## Later features

- Add daily challenge. Mention the daily challenge in the rules component.
- add link to repo home

## Features for release

- Update lexlet to point to this game as the math version. Also link to the game from my other games. Maybe can make a shared component?
- Add this game to skedwards88.github.io
- Delete temp_screenshot and update any places that use it
- customize this readme
- Add screenshots
  - To webpack config
  - To manifest.json
- Maybe add demo video
- Investigate why the webpack bundle is large enough to throw a warning

## Google Play

- [ ] Can use pwabuilder.com to package the PWA for Google Play
  - [ ] If using the default GitHub Pages URL:
    - `Package ID` is `APP_NAME.io.github.skedwards88.twa`
    - `Host` is the full URL (e.g. `skedwards88.github.io/APP_NAME`)
    - `Start URL` is `/`
- [ ] Store the app key and app key info securely
- [ ] Upload the .aab file to Google Play
- [ ] Update the sha 256 fingerprint in the assetlinks.json file with the re-signed value on Google Play
- [ ] If using the default GitHub Pages URL, upload the asset links to https://github.com/skedwards88/.well-known
