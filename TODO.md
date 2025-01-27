# TODO

- screenshots need to be updated
- favicons and maskable icon need to be updated
- update whats new
- delete mobile-drag-drop dependency from lexlet package.json?
- clone and ref template app
- in lexlet, in getPlayableBoard, gridDimension and gridSize are redundant
- why is the bundle size large enough to give warnings? are the screenshots being included?

## PWA

- [ ] Use Lighthouse in Chrome developer tools to verify that the app is installable and meets PWA requirements.

## Google Analytics

- [ ] See https://github.com/skedwards88/react-base?tab=readme-ov-file#google-analytics
- [ ] Update the `G_TODO` id in `index.html`

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

## Set up hook to prevent pushing to main without passing linters

- [ ] `npm install husky --save-dev`
- [ ] `npx husky init`
- [ ] Add a pre-push hook (can copy from https://github.com/skedwards88/deep-space-slime/blob/main/.husky/pre-push)

## Later features

- Add daily challenge. Mention the daily challenge in the rules component.

## Features for release

- Update lexlet to point to this game as the math version. Also link to the game from my other games. Maybe can make a shared component?
- Add this game to skedwards88.github.io
- Delete temp_screenshot and update any places that use it
- customize this readme
