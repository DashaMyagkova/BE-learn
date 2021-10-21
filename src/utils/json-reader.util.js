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
    fs.writeFileSync(this.basePath, JSON.stringify({
      ...this.read(),
      data,
    }), 'utf8')
  }

  getLastId() {
    return this.read().id;
  }

  incrementLastId() {
    const data = this.read();
    const id = ++data.id;

    this.write({
      ...data,
      id,
    });

    return id;
  }
}
