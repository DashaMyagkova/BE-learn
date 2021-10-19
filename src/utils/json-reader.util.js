const fs = require("fs");

module.exports = class JsonReader {
  basePath

  constructor(basePath) {
    this.basePath = basePath;
  }

  read() {
    const data = fs.readFileSync(this.basePath).toString();
    return JSON.parse(data).data;
  }

  write(data) {
    const allData = fs.readFileSync(this.basePath);
    const dataObj = JSON.parse(allData);
    dataObj.data = data;

    fs.writeFileSync(this.basePath, JSON.stringify(dataObj), 'utf8')
  }

  writeId(id) {
    const allData = fs.readFileSync(this.basePath);
    const dataObj = JSON.parse(allData);
    dataObj.id = id;

    fs.writeFileSync(this.basePath, JSON.stringify(dataObj), 'utf8')
  }

  getLastId() {
    const data = fs.readFileSync(this.basePath).toString();
    return JSON.parse(data).id;
  }

  incrementLastId() {
    const data = fs.readFileSync(this.basePath).toString();
    const lastId = JSON.parse(data).id;

    this.writeId(lastId + 1);
  }
}
