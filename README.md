# Installation

1. Clone git repo locally, then

    ```
    cd contenta_react_next
    make install
    make up
    ```

2. Profit! You can open the application on `http://app.docker.localhost`.

# What's included?

1. Local development environment based on docker.
2. Set of make commands for faster local development.
3. `Eslint` support.
4. Configured `Next.js` application.
5. `Scss` framework with ability to put `.scss` files per component.
6. Live reload for all `js` / `css` changes.
7. `Redux` (with devtools) + `Redux Saga` configured.
8. Basic `robots.txt`.
9. Beautiful animation for pages transition.

# Command list

- `make install` - installs the whole application locally.
- `make up` - runs the application in console debug mode.
- `make stop` - pauses the application.
- `make down` - completely stops the application and removes docker containers.
- `make restart` - restarts the application containers.
- `make lint` - checks coding standards and fixes issues if possible.
- `make deploy` - deploys the application to Now server (**NOTE:** You'll need to have [Now CLI](https://zeit.co/docs/features/now-cli) installed)