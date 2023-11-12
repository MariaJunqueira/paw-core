import { Injectable } from '../decorators/injectable.decorator';

type JsonValue = string | number | boolean | null | JsonObject | JsonArray;
interface JsonObject {
  [key: string]: JsonValue;
}
interface JsonArray extends Array<JsonValue> {}

@Injectable()
export class JsonTreeViewer {
  private container: HTMLElement;

  constructor(container: HTMLElement) {
    this.container = container;
  }

  public render(json: JsonObject | JsonArray): string {
    return this.createHtml(json);
  }

  private createHtml(json: JsonValue): string {
    if (typeof json === "object" && json !== null) {
      if (Array.isArray(json)) {
        return `<ul>${json
          .map((item) => `<li>${this.createHtml(item)}</li>`)
          .join("")}</ul>`;
      } else {
        return `<ul>${Object.entries(json)
          .map(
            ([key, value]) =>
              `<li><b>${key}:</b> ${this.createHtml(value)}</li>`
          )
          .join("")}</ul>`;
      }
    }
    return json === null ? "null" : json.toString();
  }
}
