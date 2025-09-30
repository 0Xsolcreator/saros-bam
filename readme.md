# BAM

A realtime analytics, automation and management platform aggregating DLMM protocols across Solana.

> [!NOTE]
> This project is not yet completed or in the alpha release stage.
>
> If you are here then you are very early, so follow the roadmap to keep track of project updates.

# What is this about?

The DLMM landscape is new yet rapidly adopted LP technology because of its efficiency in precisely targeting price ranges. There is a large UX gap for LP traders to find a perfect LP and add their positions to it. Mostly because they have to use one analysis tool to filter out the right one, another platform to place the order, and another platform to view their portfolios.

> On top of these issues, there are no options available for mobile users. They must use browsers to even navigate the fragmented UX.

This is where the idea of **BAM** comes in. A mobile app to analyze DLMM pools in realtime, set automated notifications that get triggered when a pool hits certain metrics (say you want to get a notification when a pool is above 1M mcap and has 100M in past 24 hour volume), view/manage your portfolio, and finally provide liquidity.

# Roadmap

- [x] Realtime DLMM pool analysis
  - [x] Fetch realtime data
    - geckoterminal
    - jupiter api
  - [x] Basic Filters
    - sort via metrics
  - [x] Advanced Filters
    - filter via range
- [] Alerts Automation
  - [] Dialect Alerts
    - [] Automated Notification Workflows
    - [] Automated On-chain Order Workflows
- [] Portfolio Management
- [] On-chain Orders

# Technical Overview

The project is built using React Native Expo with [Infinite Red](https://infinite.red/) Ignite boilerplate. The boilerplate comes with production setup of themes, typography, Reactotron, Jest, i18n, and a few useful components.

The project uses [Redux Ecosystem](https://redux.js.org/) as the core to manage global states and queries via RTK Query.

> The component-level documentation is yet to be written. If you are willing to become an early contributor, here are some infos:

- Expo Router is used for navigation. It is a file-based routing system similar to Next.js app routing at a high level. `src/app`
- Every Screen Component is separately maintained in `src/screens`
- API calls are managed via RTK Query in `src/services/api`
- Global state is managed via Redux in `src/store`
- The filters use a powerful feature of Redux Toolkit called selectors. You can find the implementation in `src/store/selectors`

# Setting Up Development Environment

- Install Bun to manage packages
- If this is your first time trying out React Native or mobile development, follow the RN official [tutorial](https://reactnative.dev/docs/set-up-your-environment) to set up your RN environment. Their docs are top class
- Now clone the repo

```Bash
git clone https://github.com/0Xsolcreator/saros-bam.git
```

- Install dependencies and run the android command to build the project for the first time

```Bash
bun install
bun android
```

Now you are all set. Go and hit me with issues in GitHub issues and PRs
