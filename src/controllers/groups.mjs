import GroupSchema from '../models/group.mjs';

const Groups = class Groups {
  constructor(app, connect) {
    this.app = app;
    this.GroupModel = connect.model('Group', GroupSchema);
    this.run();
  }

  // POST /groups -> Créer un nouveau groupe
  create() {
    this.app.post('/groups', async (req, res) => {
      try {
        const group = new this.GroupModel(req.body);
        await group.save();
        return res.status(201).json(group);
      } catch (err) {
        console.error(`[ERROR] POST /groups -> ${err}`);
        return res.status(500).json({ message: 'Erreur interne du serveur' });
      }
    });
  }

  showById() {
    this.app.get('/groups/:id', async (req, res) => {
      try {
        const group = await this.GroupModel.findById(req.params.id)
          .populate('admins', 'first_name last_name')
          .populate('members', 'first_name last_name');

        if (!group) {
          return res.status(404).json({ message: 'Groupe non trouvé.' });
        }

        return res.status(200).json(group);
      } catch (err) {
        console.error(`[ERROR] GET /groups/:id -> ${err}`);
        return res.status(500).json({ message: 'Erreur interne du serveur' });
      }
    });
  }

  update() {
    this.app.put('/groups/:id', async (req, res) => {
      try {
        const updated = await this.GroupModel.findByIdAndUpdate(req.params.id, req.body, {
          new: true,
          runValidators: true
        });

        if (!updated) {
          return res.status(404).json({ message: 'Groupe non trouvé.' });
        }

        return res.status(200).json(updated);
      } catch (err) {
        console.error(`[ERROR] PUT /groups/:id -> ${err}`);
        return res.status(500).json({ message: 'Erreur interne du serveur' });
      }
    });
  }

  deleteById() {
    this.app.delete('/groups/:id', async (req, res) => {
      try {
        const deleted = await this.GroupModel.findByIdAndDelete(req.params.id);
        if (!deleted) {
          return res.status(404).json({ message: 'Groupe non trouvé.' });
        }

        return res.status(200).json({ message: 'Groupe supprimé.' });
      } catch (err) {
        console.error(`[ERROR] DELETE /groups/:id -> ${err}`);
        return res.status(500).json({ message: 'Erreur interne du serveur' });
      }
    });
  }

  getAll() {
    this.app.get('/groups', async (req, res) => {
      try {
        const groups = await this.GroupModel.find();
        res.status(200).json(groups);
      } catch (err) {
        console.error(`[ERROR] GET /groups -> ${err}`);
        res.status(500).json({ message: 'Erreur interne du serveur' });
      }
    });
  }

  run() {
    this.create();
    this.showById();
    this.update();
    this.deleteById();
    this.getAll();
  }
};

export default Groups;
