const Response = require("../common/response");
const { Note } = require("../models/note");
const Validate = require("../validators/note");

module.exports = class {
  static async get(req, res) {
    const notes = await Note.find({ _id: { $in: req.user.notes.data } });

    res.json({ notes, lastSync: req.user.notes.lastSync });
  }

  static async getNote(req, res) {
    const note = await Note.findById(req.params.id);

    const isAuthorization = note.creator.toString() === req.user.id;
    if (!isAuthorization) return Response.unauthorizedNoteAccess(res);

    res.json(note);
  }

  static async create(req, res) {
    const { error, value } = Validate.create(req.body);
    if (error) return Response.badPayload(res);

    const note = new Note({ ...value, creator: req.user._id });
    req.user.notes.data.push(note._id);
    req.user.notes.lastSync = note.lastSync;

    await req.user.save();
    await note.save();

    const newNote = { id: note._id, lastSync: note.lastSync };
    res.status(201).json(newNote);
  }

  static async update(req, res) {
    const { error, value } = Validate.update(req.body);
    if (error) return Response.badPayload(res, error.details[0].message);

    const note = await Note.findById(value._id);
    if (!note) return Response.noteNoteFound(res);

    const isAuthorization = note.creator.toString() === req.user.id;
    if (!isAuthorization) return Response.unauthorizedNoteAccess(res);

    if (note.isSynchronized(value.lastSync))
      return Response.noteAlreadyUpdated(res);

    if (note.title !== value.title) note.title = value.title;
    if (note.text !== value.text) note.text = value.text;

    note.lastSync = Date.now();
    req.user.notes.lastSync = note.lastSync;

    await req.user.save();
    await note.save();

    res.json({ lastSync: note.lastSync });
  }

  static async delete(req, res) {
    const note = await Note.findById(req.params.id);
    if (!note) return Response.noteNoteFound(res);

    const isAuthorization = note.creator.toString() === req.user.id;
    if (!isAuthorization) return Response.unauthorizedNoteAccess(res);

    await Note.deleteOne({ _id: note._id });
    const lastSync = await req.user.removeNote(note._id);

    res.json({ lastSync });
  }
};
