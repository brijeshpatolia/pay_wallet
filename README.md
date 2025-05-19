

# Pay Wallet

## Project Explanation

Pay Wallet is a monorepo project built using Turborepo. It includes multiple applications and shared packages, designed to facilitate a wallet-like application with user and merchant functionalities, along with backend services like bank webhooks. The project is structured to support development, building, and deployment of these interconnected components efficiently.

## Table of Contents

  * [Project Explanation](https://www.google.com/search?q=%23project-explanation)
  * [What's Inside?](https://www.google.com/search?q=%23whats-inside)
      * [Applications](https://www.google.com/search?q=%23applications)
      * [Packages](https://www.google.com/search?q=%23packages)
  * [Technologies Used](https://www.google.com/search?q=%23technologies-used)
  * [Prerequisites](https://www.google.com/search?q=%23prerequisites)
  * [Getting Started](https://www.google.com/search?q=%23getting-started)
      * [Installation](https://www.google.com/search?q=%23installation)
      * [Development](https://www.google.com/search?q=%23development)
      * [Build](https://www.google.com/search?q=%23build)
  * [Running the Applications](https://www.google.com/search?q=%23running-the-applications)
      * [User App](https://www.google.com/search?q=%23user-app)
      * [Merchant App](https://www.google.com/search?q=%23merchant-app)
      * [Bank Webhook](https://www.google.com/search?q=%23bank-webhook)
  * [Linting and Formatting](https://www.google.com/search?q=%23linting-and-formatting)
  * [Database](https://www.google.com/search?q=%23database)
  * [Deployment](https://www.google.com/search?q=%23deployment)
      * [Docker](https://www.google.com/search?q=%23docker)
      * [Vercel](https://www.google.com/search?q=%23vercel)
  * [Remote Caching](https://www.google.com/search?q=%23remote-caching)
  * [Contributing](https://www.google.com/search?q=%23contributing)
  * [License](https://www.google.com/search?q=%23license)
  * [Useful Links](https://www.google.com/search?q=%23useful-links)

## What's Inside?

This Turborepo includes the following applications and packages:

### Applications

  * `apps/user-app`: A Next.js application serving as the user-facing wallet interface. It includes features like dashboard, fund transfer, P2P transactions, and viewing transaction history.
  * `apps/merchant-app`: Another Next.js application, likely for merchant-specific functionalities.
  * `apps/bank-webhook`: An Express.js application to handle incoming webhooks from banks (e.g., HDFC bank) to process payment information and update balances.

### Packages

  * `packages/db`: Contains the Prisma schema, migrations, and a Prisma Client instance for database interactions.
  * `packages/ui`: A shared React component library used across the different Next.js applications (e.g., Button, Card, Appbar).
  * `packages/store`: Shared state management logic, likely using Recoil (e.g., managing balance).
  * `packages/eslint-config`: Shared ESLint configurations for maintaining code quality and consistency.
  * `packages/typescript-config`: Shared TypeScript configurations (`tsconfig.json`) used throughout the monorepo.

## Technologies Used

  * **Monorepo:** [Turborepo](https://turbo.build/repo)
  * **Framework (Apps):** [Next.js](https://nextjs.org/) (for `user-app` and `merchant-app`)
  * **Framework (Webhook):** [Express.js](https://expressjs.com/) (for `bank-webhook`)
  * **Language:** [TypeScript](https://www.typescriptlang.org/)
  * **Database ORM:** [Prisma](https://www.prisma.io/)
  * **Styling (user-app & merchant-app):** [Tailwind CSS](https://tailwindcss.com/)
  * **State Management (user-app & merchant-app):** [Recoil](https://recoiljs.org/)
  * **Authentication:** [NextAuth.js](https://next-auth.js.org/)
  * **Linting:** [ESLint](https://eslint.org/)
  * **Formatting:** [Prettier](https://prettier.io)
  * **Deployment:** [Docker](https://www.docker.com/), [Vercel](https://vercel.com/)

## Prerequisites

  * Node.js (version specified in `package.json` engines field, e.g., \>=18)
  * npm (version specified in `package.json` packageManager field, e.g., npm@10.2.4)
  * (Optional) Docker for containerized deployment.

## Getting Started

### Installation

1.  Clone the repository:
    ```sh
    git clone <repository-url>
    cd pay_wallet
    ```
2.  Install dependencies from the root of the monorepo:
    ```sh
    npm install
    ```
    This command uses Turborepo to install dependencies for all apps and packages.

### Development

To develop all apps and packages simultaneously, run the following command from the root:

```sh
npm run dev
```

This will start the development servers for all applications.

  * User App: Typically on `http://localhost:3001`
  * Merchant App: Typically on `http://localhost:3000`
  * Bank Webhook: Typically on `http://localhost:3004`

### Build

To build all apps and packages for production, run the following command from the root:

```sh
npm run build
```

This uses Turborepo to efficiently build all components of the project.

## Running the Applications

### User App

  * **Development:** `npm run dev` (from root) and access `http://localhost:3001`.
  * **Start after build:** `npm run start-user-app` (from root) or `cd apps/user-app && npm run start`.

### Merchant App

  * **Development:** `npm run dev` (from root) and access `http://localhost:3000`.
  * **Start after build:** `cd apps/merchant-app && npm run start`.

### Bank Webhook

  * **Development:** `npm run dev` (from root). The webhook server will start, typically on port 3004.
  * **Start after build:** `cd apps/bank-webhook && npm run start`.

## Linting and Formatting

  * **Lint:** To lint all apps and packages:

    ```sh
    npm run lint
    ```

  * **Format:** To format code using Prettier:

    ```sh
    npm run format
    ```

## Database

This project uses Prisma as its ORM.

  * **Generate Prisma Client:** After any changes to `schema.prisma` in `packages/db`, or to ensure the client is up to date:

    ```sh
    npm run db:generate
    ```

    This command needs to be run from the root of the monorepo or by navigating to `packages/db` and running `npx prisma generate`.

  * **Migrations:** Prisma migrations are located in `packages/db/prisma/migrations`. To create and apply migrations, you would typically use Prisma CLI commands like `npx prisma migrate dev`.

## Deployment

### Docker

The project includes a GitHub Actions workflow for building and deploying to Docker Hub.
The Dockerfile for the user application seems to be located at `docker/Dockerfile.user`.
The image is pushed to `brijeshpatolia/pay_wallet:latest`.

### Vercel

Next.js applications (like `user-app` and `merchant-app`) can be easily deployed using the [Vercel Platform](https://www.google.com/search?q=https://vercel.com/new%3Futm_source%3Dgithub.com%26utm_medium%3Dreferral%26utm_campaign%3Dturborepo-readme).

## Remote Caching

Turborepo can use [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching) to share cache artifacts across machines, speeding up builds for your team and CI/CD pipelines.

To enable Remote Caching with Vercel:

1.  Create a Vercel account if you don't have one: [Vercel Signup](https://vercel.com/signup)

2.  Log in to Turbo:

    ```sh
    cd pay_wallet
    npx turbo login
    ```

3.  Link your Turborepo to your Remote Cache:

    ```sh
    npx turbo link
    ```

## Contributing

Contributions are welcome\! Please follow the standard GitHub flow:

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/your-feature-name`).
3.  Make your changes.
4.  Commit your changes (`git commit -m 'Add some feature'`).
5.  Push to the branch (`git push origin feature/your-feature-name`).
6.  Open a Pull Request.

Please ensure your code adheres to the linting and formatting guidelines by running `npm run lint` and `npm run format` before committing.

## License

This project is based on the official Turborepo starter. Please update this section with your chosen license (e.g., MIT License). If no license is specified, it's proprietary. The `package.json` for `packages/typescript-config` specifies "MIT" license.

## Useful Links

  * [Turborepo Documentation](https://turbo.build/repo/docs)
  * [Next.js Documentation](https://nextjs.org/docs)
  * [Prisma Documentation](https://www.prisma.io/docs/)
  * [Tailwind CSS Documentation](https://tailwindcss.com/docs/)
  * [Recoil Documentation](https://recoiljs.org/docs/introduction/installation)
  * [NextAuth.js Documentation](https://next-auth.js.org/getting-started/introduction)

<!-- end list -->

```
```
