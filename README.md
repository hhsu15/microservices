# Microservices

We will use `express` for backend. To run express we will use `nodemon index.js` (and add this to the npm script so you can just run npm start to kick up the server)

## Event Bus

Examples like RabbitMQ, Kafka, NATS.

Event Bus receives events, publishes them to listeners.

Many different subtle features that make async communication (communication through event bus) way easier, or harder.

### Sync Events

If for some reason your servives are down then you will lose the events. To to able to reply those events during the downtime, the event bus will need to store all the events.
So when the failed service is restarted, it can retrieve all the events from the event bus and process them.

## Docker

We will be running this using Docker.

Include the docker file and build it

```sh
docker build .

# then you get an id and run that id
docker run 6a069de8256a
```

Or better just give a tag

```sh
docker build . -t ms/posts

docker run ms/posts
```

Run a container but override the degault command

```sh

docker run -it ms/posts [cmd]
```

Execute a given command in a running container

```sh
docker exec -it [container id] [cmd]
# to get out use 'cmmand d'
```

Print out logs from the given container

```sh
docker logs [container id]
```

## Kubernetes

For Mac, on the Docker icon, click on "preference -> Kubernetes -> enable Kubernetes".

In the world of Kubernetes:

- Kubernetes Cluster: a collections of nodes + a master to manage them.
- Node: a virtual machine.
- Pod: more or less same as containers. A pod can have multiple containers
- Deployment: in charge of managing the pods. E.g., If a pod dies it will recreate the pod.
- Service: it handles access/networking for pods to be reached out running inside the kubernetes.
