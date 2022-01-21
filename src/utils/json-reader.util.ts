import fs from 'fs';

export class JsonReader {
  basePath

  constructor(basePath: string) {
    this.basePath = basePath;
  }

  read() {
    const data: string = fs.readFileSync(this.basePath).toString();
    return JSON.parse(data).data;
  }

  write(data: object) {
    const allData: string = fs.readFileSync(this.basePath).toString();
    const dataObj = JSON.parse(allData);
    dataObj.data = data;

    fs.writeFileSync(this.basePath, JSON.stringify(dataObj), 'utf8')
  }

  writeId(id: string) {
    const allData: string = fs.readFileSync(this.basePath).toString();
    const dataObj = JSON.parse(allData);
    dataObj.id = id;

    fs.writeFileSync(this.basePath, JSON.stringify(dataObj), 'utf8')
  }

  getLastId() {
    const data: string = fs.readFileSync(this.basePath).toString();
    return JSON.parse(data).id;
  }

  incrementLastId() {
    const data: string = fs.readFileSync(this.basePath).toString();
    const lastId = JSON.parse(data).id;

    this.writeId(lastId + 1);
  }
};
