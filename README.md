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

The config file looks like this:

```yml
apiVersion: v1
kind: Pod
metadata:
  name: posts
spec:
  containers:
    - name: posts
      image: ms/posts:latest
```

Apply the config code:

```bash

kubectl apply -f posts.yaml
```

To see the running pods

```sh
kubectl get pods
```

To delete all pods from a given k8s folder

```sh
kubectl delete -f infra/k8s/
```

If your pods are showing ErrImagePull, ErrImageNeverPull, or ImagePullBackOff errors after running kubectl apply, the simplest solution is to provide an imagePullPolicy to the pod.

First, run kubectl delete -f infra/k8s/

Then, update your pod manifest:

```yml
spec:
  containers:
    - name: posts
      image: cygnet/posts:0.0.1
      imagePullPolicy: Never
```

Then, run kubectl apply -f infra/k8s/

### Common kubectl commends

- kubectl get pods
- kubectl exec -it [pod_name] [cmd]
- kubectl logs [pod_name]
- kubectl delete pod [pod_name]
- kubectl apply -f [config_file]
- kubectl describe pod [pod_name] # mostly for debuging

#### Deployment Object

In practice, we don't create Pods directly, instead, we create Deployment object to manage sets of Pods.

Looks like this

```yml
piVersion: apps/v1
kind: Deployment
metadata:
  name: posts-depl
spec:
  replicas: 1
  selector:
    matchLabels: # just key value pair to match a lable
      app: posts
  template:
    metadata:
      labels:
        app: posts # this works together with the metadata
    spec:
      containers:
        - name: posts
          image: ms/posts:latest
          imagePullPolicy: Never
```

To apply it:

```sh

kubectl apply -f posts-depl.yaml

```

To get deployments

```sh
kubectl get deployments

```

To delete deployment

```sh

kubectl delete deployment [deployment_name]
```

Note that the deployment will create pods for you. If you manually delete any pod, it's going to create another one for you automatically. This is the magic of Deployment object - it deploys the pods when necessary for you!!

To always apply the latest version

- use "latest" tag
- Make update to the code
- build the image
- push the image to docker hub
  - use `docker push [tag_name]
- run this command

```sh
kubectl rillout restart deployment [deployment_name]
```

```sh


```
