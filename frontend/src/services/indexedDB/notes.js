export class NotesLocalDB {
  constructor() {
    this.version = 1;
    this.store = null;
    this.storeName = "note";

    this.request = indexedDB.open("notesDB", this.version);

    this.request.onsuccess = (e) => {
      this.store = e.target.result;
    };

    this.request.onerror = (err) => {
      console.warn(err);
    };

    this.request.onupgradeneeded = (e) => {
      this.store = e.target.result;

      if (!this.store.objectStoreNames.contains(this.storeName)) {
        this.store.createObjectStore(this.storeName, { keyPath: "id" });
      }
    };
  }

  getAll() {
    return new Promise(async (resolve, reject) => {
      const onsuccess = (e) => resolve(e.target.result);
      const onerror = (err) => reject(err);

      this.template({ method: "getAll", onsuccess, onerror });
    });
  }

  add(note) {
    this.template({
      method: "add",
      payload: note,
      transactionMode: "readwrite",
    });
  }

  update(note) {
    this.template({
      method: "put",
      payload: note,
      transactionMode: "readwrite",
    });
  }

  delete(note_id) {
    this.template({
      method: "delete",
      payload: note_id,
      transactionMode: "readwrite",
    });
  }

  makeTransaction(mode = "readonly") {
    return this.store.transaction(this.storeName, mode);
  }

  template({
    method = "getAll",
    payload,
    onsuccess = () => {},
    onerror = console.error,
    transactionMode,
  }) {
    const transaction = this.makeTransaction(transactionMode);
    const store = transaction.objectStore(this.storeName);
    const request = store[method](payload);

    request.onsuccess = onsuccess;
    request.onerror = onerror;
  }
}
