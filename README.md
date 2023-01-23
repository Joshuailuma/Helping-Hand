# Helping Hand

## Overview

Helping Hand is a decentralized web application that allows users to:

- solicit for funds for any purpose such as helping Flood victims, poor hospital patients etc

- donate to fund any project of their choice

- the funds gotten from a project is allowed to be withrawn by the creator after the duration specified bt the creator has elapsed

## Technologies used

- The front end was built using Next Js and Tailwind CSS

- The [smart contract](https://github.com/Joshuailuma/Helping-hand-hardhat) was developed using Solidity, tested compiled and deployed to **Goerli Testnet** with Hardhat

- Images are stored on Cloudinary, user data is stored on MongoDb

## Live site

Please note that your wallet must be connected to **Goerli Testnet** before accessing the project

Here is the live site https://helping-hand-pi.vercel.app

## How to run the project locally

1. First, install Node js from https://nodejs.org

2. In your terminal run `npm install yarn` to install yarn package manager

3. Run `yarn` to install the packages used in the project

4. Finally, run the development server:

```bash
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## How to use the project

### How to create a funding project

1. Connect your wallet. Note that the **wallet must be connected to Goerli Testnet**
2. Get some GoerliETH from [Goerlifaucet](https://goerlifaucet.com/)
3. Navigate to `Create project` page
4. Fill in the form and upload an image that is related to the project

![screenshot1](https://github.com/Joshuailuma/Helping-Hand/blob/main/screenshot1.png?raw=true)

### How to donate to a project

1. Connect your wallet. Note that the **wallet must be connected to Goerli Testnet**

2. Navigate to `Available Projects` page.

3. Click on a project of your choice

4. Click on the 'Donate button' and type in the amout of ETH you'd love to donate

![screenshot2](https://github.com/Joshuailuma/Helping-Hand/blob/main/screenshot2.png?raw=true)

### How to withdraw donated funds from project

1. Connect your wallet. Note that the **wallet must be connected to Goerli Testnet**
2. Navigate to `My Projects` page.
3. Click on a project of your choice
4. Click on the 'Withdraw button' to withdraw all the funds donated to the project. You can only withdraw after the time specifed for the cause of project has elapsed

![screenshot3](https://github.com/Joshuailuma/Helping-Hand/blob/main/screenshot3.png?raw=true)

## Contributor

[Benedicta Ijisesan](https://github.com/cutedicta)

## License

MIT
