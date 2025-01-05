type RequestType = "POST" | "GET" | "PUT" | "DELETE";

interface IRequestGenerator {
  AddUrl(url: string): this;
  AddTypeRequest(type: RequestType): this;
  AddHeaders(data: Record<string, string>): this;
  AddBody<T extends object>(data: T): this;
}

interface IOptions {
  method?: RequestType;
  headers?: Record<string, string>;
  body?: string;
}

interface IRequest {
  getFetch(): Promise<any>;
}

class RequestGenerator implements IRequestGenerator, IRequest {
  private options: IOptions = {};
  private url: string;

  AddUrl(url: string): this {
    this.url = url;
    return this;
  }

  AddTypeRequest(type: RequestType = "GET"): this {
    this.options.method = type;
    return this;
  }

  AddHeaders(data: Record<string, string>): this {
    this.options.headers = {
      ...(this.options.headers || {}),
      ...data,
    };

    return this;
  }

  AddBody<T extends object>(data: T): this {
    const currentBody = this.options.body ? JSON.parse(this.options.body) : {};
    this.options.body = JSON.stringify({ ...currentBody, ...data });
    return this;
  }

  async getFetch() {
    if (!this.url) {
      throw new Error("Не был задан url.");
    }

    const res = await fetch(this.url, this.options)
      .then((data) => data.json())
      .catch((e) => new Error(e));
    console.log(res);
    return res;
  }
}

class ProxyRequest implements IRequest {
  private requestGenerator: RequestGenerator;

  constructor(requestGenerator: RequestGenerator) {
    this.requestGenerator = requestGenerator;
  }

  async getFetch(): Promise<any> {
    const url = this.requestGenerator["url"];
    const match = url.match(/\/(\d+)(\/|$)/);
    const id = match ? parseInt(match[1], 10) : null;

    if (id !== null && id >= 10) {
      throw new Error("ID должен быть меньше 10.");
    }

    return this.requestGenerator.getFetch();
  }
}

const fetchExample = new RequestGenerator();
fetchExample.AddUrl("https://dummyjson.com/products/9"); // ID < 10

const proxyFetch = new ProxyRequest(fetchExample);
proxyFetch.getFetch();
