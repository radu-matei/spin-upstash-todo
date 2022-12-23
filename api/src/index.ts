import { HandleRequest, HttpRequest, HttpResponse } from "@fermyon/spin-sdk";

const encoder = new TextEncoder();
const decoder = new TextDecoder();

interface Connection {
  baseUrl: string;
  token: string;
}

export const handleRequest: HandleRequest = async function(
  request: HttpRequest
): Promise<HttpResponse> {
  let connection = await auth();

  switch (request.headers["spin-path-info"]) {
    case "/list": {
      return await list(connection);
    }
    case "/remove": {
      return await remove(request, connection);
    }
    case "/add": {
      return await add(request, connection);
    }

    default: {
      return { status: 500, headers: {} };
    }
  }
};

async function list(connection: Connection): Promise<HttpResponse> {
  let url =
    connection.baseUrl + "/lrange/todo/0/100?_token=" + connection.token;

  let body = await fetch(url);
  let json = (await body.json()) as any;
  console.log("Listing todos: " + JSON.stringify(json));

  return {
    status: 200,
    headers: { "content-type": "application/json" },
    body: encoder.encode(JSON.stringify(json.result)).buffer,
  };
}

async function remove(
  request: HttpRequest,
  connection: Connection
): Promise<HttpResponse> {
  let todo = new URL(request.uri).search.split("=")[1];
  console.log("Removing todo: " + todo);

  let url =
    connection.baseUrl + "/lrem/todo/1/" + todo + "?_token=" + connection.token;

  let body = await fetch(url);
  let json = (await body.json()) as any;

  return {
    status: 200,
    headers: { "content-type": "application/json" },
    body: encoder.encode(JSON.stringify(json.result)).buffer,
  };
}

async function add(
  request: HttpRequest,
  connection: Connection
): Promise<HttpResponse> {
  let todo = new URL(request.uri).search.split("=")[1];
  console.log("Adding todo: " + todo);

  let url =
    connection.baseUrl + "/lpush/todo/" + todo + "?_token=" + connection.token;

  let body = await fetch(url);
  let json = (await body.json()) as any;
  console.log("Adding todo: " + JSON.stringify(json));

  return {
    status: 200,
    headers: { "content-type": "application/json" },
    body: encoder.encode(JSON.stringify(json.result)).buffer,
  };
}

async function auth(): Promise<Connection> {
  let buffer = await fsPromises.readFile("./auth.json");
  return JSON.parse(decoder.decode(new Uint8Array(buffer))) as Connection;
}
