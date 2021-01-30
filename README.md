# Mobile cards project for UDACITY REACT NANODEGREE 

## 🚀 How to use

- Install packages with `yarn` or `npm install`.
  - If you have native iOS code run `npx pod-install`
- Run `yarn start` to start the bundler.
- Open the project in a React runtime to try it:
  - iOS: [Client iOS](https://itunes.apple.com/app/apple-store/id982107779)
  - Android: [Client Android](https://play.google.com/store/apps/details?id=host.exp.exponent&referrer=blankexample)
  - Web: Any web browser

## 📝 Notes

- Written using only function components (using hooks for state)
- Notifications are set in `App.js` initialy, and then in `QuizScreen.js` everytime you reach end of Quiz
- Using asyncStorage for data persistance
- Tested on Android virtual device (Pixel 4 - SDK Q)
- Not tested on IOS, but no platfor specific code was used and should work on IOS too.
