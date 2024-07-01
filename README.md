## Getting Started

### Prerequisites

Due to a Relay path bug on Windows, it's recommended to run this code on WSL2. This bug occurs because the configuration needed for Windows paths is not known.


### Running the Relay Server

Now, the server only supports data-driven dependencies, so the code will focus on this feature.


1. Install server packages

```
pnpm server:install
```

2. Start the server:

```
pnpm dev:server
```

3. Compile and update Relay queries:

```
pnpm relay
```

###  Running the React Client

1. Install client packages:
```
pnpm install
```

2. Start the client:
```
pnpm start
```



## Brief Overview of Relay Data-Driven Dependencies

Relay data-driven dependencies allow your application to specify the data it needs alongside the UI components that use it. This ensures that the data is fetched efficiently and that the UI is rendered only when the required data is available.

Key features of data-driven dependencies in Relay:

- Colocation of Data and UI: Queries are colocated with the components that use the data, making it easier to understand what data is needed for each part of the UI.
- Automatic Data Fetching: Relay automatically fetches the necessary data when components are rendered, ensuring that the UI always has the data it needs.
- Efficient Updates: Relay optimizes network requests to fetch only the data that has changed, reducing the amount of data transferred and improving performance.

---

git rm -r --cached .
git add .
git commit -am 'git cache cleared'
git push


Also to revert back last commit use this :

git reset HEAD^ --hard

https://davemateer.com/2021/01/29/git-corruption-with-wsl2
