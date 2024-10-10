# Ticketing

This is a more advanced project which we will be using TypeScript.

To set up,

```sh
npm install typescript ts-node-dev express @types/express

```

Initialize a typescript project.
This will create a tsconfig.json file.

```sh
tsc --init

```

## K8s

Refer to `\infra`.

Baiscally we will create the k8s Deployment resources.

To run,

```sh
kubectl apply -f auth-depl.ymal
```
