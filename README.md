# Map Demo

## Getting Started
Install the following dependencies:
- [Node.js](https://nodejs.org/)
- [Yarn](https://yarnpkg.com/en/docs/install)

You'll also need a Git client & text editor; if you don't have those, then you should also install the following:
- [GitHub Desktop](https://desktop.github.com/)
- [Atom](https://atom.io)

You'll also want to [sign-up for Mapbox services here](https://www.mapbox.com/signup/) and, if you haven't already, [create a GitHub account](https://github.com).

Now you can fork & clone the repository to start building your own web map.

After cloning the repo, you'll need to insert your Mapbox public access token ([which can be found here](https://www.mapbox.com/account/)) into `src/token.js`.

## Development
To run the app locally, run the following from the root directory of your cloned repository:
```
yarn run dev
```

The application should now be running at http://localhost:8080/

Changes that you make to javascript and CSS files will be automatically refreshed!

## Deployment
Before deploying, you must first build the website by running the following command from the root directory: 
```
yarn run build
```

To deploy your latest code to the web, simply push commits to the `master` branch.
