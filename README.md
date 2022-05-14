# Fridge face frontend

A digital shopping cart mobile application for the company [Applifting](https://www.applifting.cz/). </br>
Bachelor thesis of Xuan Anh Nguyen, [CVUT FEL SIT](https://sit.fel.cvut.cz/) year 2022. <br/>

This project aims to improve the food and drink purchase experience in a company for its employees and to further improve development efficiency with a hybrid application development approach using [React Native](https://reactnative.dev/) with [Expo](https://expo.dev/).

## Resources

- **High fidelity prototype**: <br/>
  https://www.figma.com/file/R48ClDvWjyGCC2t97qWqLW/Fridge-app?node-id=0%3A1

- **Backend source code**: <br/>
  https://github.com/alexnguyen98/fridge-face-backend

- **Production release on Expo Go app**: <br/>
  ![Expo link](/images/expo-link.png)

## Features

- Cart system
- Face authentication
- Barcode scanning

## Getting Started

### Project structure

```sh
fridge-face-frontend/
  └── src/
      ├── assets/
      ├── components/
      ├── constants/
      ├── context/                  # React Context API
      ├── hooks/
      ├── screens/
      ├── types/
            ├── navigation.ts
            └── theme.ts            # font/color/border configuration
      ├── App.tsx
      └── navigation.tsx            # react native navigation root
```

### Requirements

- Node ~ v15.2.0, < v17.0.1
- yarn/npm
- [Expo Go app](https://expo.dev/client)

### Changing backend host

In the file `fridge-face-frontend/src/constants/index.ts` set the constant `SERVER_URL` to your desired backend host (defaults to https://nguyexu.tech/).

### Usage

```bash
# Install dependencies
yarn install

# Running dev mode
yarn start
# Test the project on a emulator or by scanning the QR code from the terminal

# Releasing on production
expo publish
```

## Notice

This app was created for the company Applifting, so without the access to the internal system you cannot fully test the functionality. Nevertheless you can host the backend locally and configure it to your own API that can mock the Products and Users entities.

## Contribution

In case you decide to contribute to this project, we will be very happy and we appreciate your help. Feel free to:

1. Check out [issues](https://github.com/alexnguyen98/fridge-face-frontend/issues).
2. Create a new branch from `master` where work will be done
3. After work is done please create new pull request into `master`
4. Wait for review and PR approval (PR should be approved)
5. After merge work is DONE! Thank you! :heart:

If you have any questions about development or issue description, feel free to ask the author of the issue in comments.
