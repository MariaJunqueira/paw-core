import { Injectable } from '../decorators/injectable.decorator';

@Injectable()
export class HttpRequest {
  baseUrl: string = "";
  headers: HeadersInit;

  private async request(
    method: string,
    path: string,
    body?: any
  ): Promise<any> {
    const url = `${this.baseUrl}${path}`;
    const options: RequestInit = {
      method,
      headers: this.headers,
      body: body ? JSON.stringify(body) : null,
    };

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      // Handle or throw the error as appropriate
      console.error("Request error:", error);
      throw error;
    }
  }

  public get(path: string): Promise<any> {
    return this.request("GET", path);
  }

  public post(path: string, body: any): Promise<any> {
    return this.request("POST", path, body);
  }

  public put(path: string, body: any): Promise<any> {
    return this.request("POST", path, body);
  }

  public delete(path: string, body: any): Promise<any> {
    return this.request("DELETE", path);
  }
}
