# TODO application with Upstash and Fermyon Cloud

This is a demonstration of building a full-stack JavaScript application that
runs on Fermyon Cloud and connects to a serverless database hosted by [Upstash](https://upstash.com).

The demo is based on the [Upstash blog post showcasing how to build a
minimalist Next.js TODO application with their Redis database](https://upstash.com/blog/nextjs-todo),
and adapts it to use two Spin components:

- a Spin component to serve a statically built Next.js UI
- a Spin component written in TypeScript that connects to a Redis database
  hosted by Upstash, using the Upstash REST API.

## Local development

- [Spin](https://developer.fermyon.com/spin)
- [the Spin JavaScript toolchain](https://developer.fermyon.com/spin/javascript-components)
- [NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
- a free [Upstash](https://upstash.com) account
- a free [Fermyon Cloud](https://cloud.fermyon.com) account

Create an `auth.json` file using the credentials for the Upstash Redis database
(using the REST API credentials) based on the template in `auth-template.json`.

Finally, install the dependencies for both the front-end and back-end,
then run `spin build` and `spin up`:

```bash
$ npm install && cd api && npm install
$ spin build && spin up --follow-all

Successfully ran the build command for the Spin components
Serving http://127.0.0.1:300
Available Routes
  ui: http://127.0.0.1:3000 (wildcard)
  api: http://127.0.0.1:3000/api (wildcard)
```

At this point, the application should be available at <http://localhost:3000>.

## Deploying to Fermyon Cloud

Now that the application is built, we can deploy it to Fermyon Cloud:

```
$ spin deploy
Uploading todo-next-redis-upstash version 1.0.0+r7deafdcc...
Deploying...
Waiting for application to become ready........ ready
Available Routes:
  ui: https://todo-next-redis-upstash-gwvinwz6.fermyon.app (wildcard)
  api: https://todo-next-redis-upstash-gwvinwz6.fermyon.app/api (wildcard)
```

You can check an already deployed instance of this application at
<https://todo-next-redis-upstash-gwvinwz6.fermyon.app>.

## Credits

This application is based on [the demo created by Upstash](https://upstash.com/blog/nextjs-todo)
and is adapted to run on Spin and Fermyon Cloud.
