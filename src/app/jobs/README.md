# Jobs Feature

## Entrypoint

```txt
jobs.routes.ts
jobs.component.ts
```

## Structure

### Components

They all do basic stuff :

1. Subscribe to a reactive state (Signals, RxJS, Redux, etc)
2. Update their view when they receive new values
3. Delegate business logic to services

### Repository

Where we fetch and export data, it could be either HTTP requests, Websockets, Localstorage, etc.

### Services

Business logic of the feature.
It provide a reactive state for components and define methods to perform business operation.
As the feature grows, this folder can be messy for consumers (ie. components).
We can implement a facade to fix this.
