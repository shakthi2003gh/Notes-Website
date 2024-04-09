export default class IndexedDB {
  constructor(name) {
    this.version = 1;
    this.dbName = name + "DB";
    this.storeName = name;
    this.loaded = this.init();
  }

  init() {
    return new Promise((resolve, reject) => {
      this.request = indexedDB.open(this.dbName, this.version);

      this.request.onupgradeneeded = (e) => {
        const store = e.target.result;

        if (!store.objectStoreNames.contains(this.storeName)) {
          store.createObjectStore(this.storeName, { keyPath: "_id" });
        }
      };

      this.request.onerror = (err) => {
        reject(err);
      };

      this.request.onsuccess = () => {
        resolve();
      };
    });
  }

  getAll() {
    return new Promise(async (resolve, reject) => {
      const onsuccess = (e) => resolve(e.target.result);
      const onerror = (err) => reject(err);

      this.template({ method: "getAll", onsuccess, onerror });
    });
  }

  get(id) {
    return new Promise(async (resolve, reject) => {
      const onsuccess = (e) => resolve(e.target.result);
      const onerror = (err) => reject(err);

      this.template({ method: "get", payload: id, onsuccess, onerror });
    });
  }

  add(payload) {
    return this.template({
      method: "add",
      payload,
      transactionMode: "readwrite",
    });
  }

  update(payload) {
    return this.template({
      method: "put",
      payload,
      transactionMode: "readwrite",
    });
  }

  delete(id) {
    return this.template({
      method: "delete",
      payload: id,
      transactionMode: "readwrite",
    });
  }

  makeTransaction(mode = "readonly") {
    const store = this.request.result;
    return store.transaction(this.storeName, mode);
  }

  async template({
    method = "getAll",
    payload,
    onsuccess = () => {},
    onerror = console.error,
    transactionMode,
  }) {
    await this.loaded;

    const transaction = this.makeTransaction(transactionMode);
    const store = transaction.objectStore(this.storeName);
    const request = store[method](payload);

    request.onsuccess = onsuccess;
    request.onerror = onerror;
  }
}
