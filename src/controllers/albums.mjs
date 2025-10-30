import AlbumSchema from '../models/album.mjs';

const Albums = class Albums {
  constructor(app, connect) {
    this.app = app;
    this.AlbumModel = connect.model('Album', AlbumSchema);
    this.run();
  }

  create() {
    this.app.post('/events/:eventId/albums', async (req, res) => {
      try {
        const album = new this.AlbumModel({ ...req.body, event: req.params.eventId });
        await album.save();
        return res.status(201).json(album);
      } catch (err) {
        console.error(`[ERROR] POST /events/${req.params.eventId}/albums -> ${err}`);
        return res.status(500).json({ message: 'Erreur interne du serveur' });
      }
    });
  }

  getAllByEvent() {
    this.app.get('/events/:eventId/albums', async (req, res) => {
      try {
        const albums = await this.AlbumModel.find({ event: req.params.eventId })
          .populate('photos');
        return res.status(200).json(albums);
      } catch (err) {
        console.error(`[ERROR] GET /events/${req.params.eventId}/albums -> ${err}`);
        return res.status(500).json({ message: 'Erreur interne du serveur' });
      }
    });
  }

  showById() {
    this.app.get('/albums/:id', async (req, res) => {
      try {
        const album = await this.AlbumModel.findById(req.params.id).populate('photos');
        if (!album) return res.status(404).json({ message: 'Album non trouvé' });
        return res.status(200).json(album);
      } catch (err) {
        console.error(`[ERROR] GET /albums/:id -> ${err}`);
        return res.status(500).json({ message: 'Erreur interne du serveur' });
      }
    });
  }

  deleteById() {
    this.app.delete('/albums/:id', async (req, res) => {
      try {
        const deleted = await this.AlbumModel.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: 'Album non trouvé' });
        return res.status(200).json({ message: 'Album supprimé' });
      } catch (err) {
        console.error(`[ERROR] DELETE /albums/:id -> ${err}`);
        return res.status(500).json({ message: 'Erreur interne du serveur' });
      }
    });
  }

  run() {
    this.create();
    this.getAllByEvent();
    this.showById();
    this.deleteById();
  }
};

export default Albums;
