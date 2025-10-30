import AlbumSchema from '../models/album.mjs';
import PhotoSchema from '../models/photo.mjs';

const Photos = class Photos {
  constructor(app, connect) {
    this.app = app;
    this.PhotoModel = connect.model('Photo', PhotoSchema);
    this.AlbumModel = connect.model('Album', AlbumSchema);
    this.run();
  }

  create() {
    this.app.post('/albums/:albumId/photos', async (req, res) => {
      try {
        const { albumId } = req.params;
        const photo = new this.PhotoModel({ ...req.body, album: albumId });
        await photo.save();

        await this.AlbumModel.findByIdAndUpdate(albumId, { $push: { photos: photo._id } });
        return res.status(201).json(photo);
      } catch (err) {
        console.error(`[ERROR] POST /albums/${req.params.albumId}/photos -> ${err}`);
        return res.status(500).json({ message: 'Erreur interne du serveur' });
      }
    });
  }

  getAllByAlbum() {
    this.app.get('/albums/:albumId/photos', async (req, res) => {
      try {
        const photos = await this.PhotoModel.find({ album: req.params.albumId });
        return res.status(200).json(photos);
      } catch (err) {
        console.error(`[ERROR] GET /albums/${req.params.albumId}/photos -> ${err}`);
        return res.status(500).json({ message: 'Erreur interne du serveur' });
      }
    });
  }

  deleteById() {
    this.app.delete('/albums/:albumId/photos/:photoId', async (req, res) => {
      try {
        const { albumId, photoId } = req.params;
        const deleted = await this.PhotoModel.findByIdAndDelete(photoId);

        if (!deleted) return res.status(404).json({ message: 'Photo non trouvée' });

        await this.AlbumModel.findByIdAndUpdate(albumId, { $pull: { photos: photoId } });
        return res.status(200).json({ message: 'Photo supprimée' });
      } catch (err) {
        console.error(`[ERROR] DELETE /albums/${req.params.albumId}/photos/${req.params.photoId} -> ${err}`);
        return res.status(500).json({ message: 'Erreur interne du serveur' });
      }
    });
  }

  run() {
    this.create();
    this.getAllByAlbum();
    this.deleteById();
  }
};

export default Photos;
