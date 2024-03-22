exports.NoteResponse = class {
  static noteAlreadyUpdated(res) {
    const status = 208;
    const response = { status, message: "Note already updated" };

    res.status(status).json(response);
  }

  static unauthorizedNoteAccess(res) {
    const status = 403;
    const response = { status, message: "Unauthorized to access this note" };

    res.status(status).json(response);
  }

  static noteNoteFound(res) {
    const status = 404;
    const response = { status, message: "Note not found" };

    res.status(status).json(response);
  }

  static noteAlreadyExist(res) {
    const status = 409;
    const response = { status, message: "Note with this ID already exists" };

    res.status(status).json(response);
  }
};
