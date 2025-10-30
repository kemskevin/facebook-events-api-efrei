import ThreadSchema from '../models/threads.mjs';

const Threads = class Threads {
  constructor(app, connect) {
    this.app = app;
    this.ThreadModel = connect.model('Thread', ThreadSchema);
    this.run();
  }

  create() {
    this.app.post('/threads', async (req, res) => {
      try {
        const {
          scopetype,
          group,
          event,
          createdby
        } = req.body;

        // Validation : un seul des deux (group ou event) selon scope_type
        if ((scopetype === 'group' && !group) || (scopetype === 'event' && !event)) {
          return res.status(400).json({
            message: 'Le thread doit être associé à un groupe OU un événement selon scope_type'
          });
        }

        const thread = new this.ThreadModel({
          scopetype,
          group,
          event,
          createdby
        });

        await thread.save();
        return res.status(201).json(thread);
      } catch (err) {
        console.error(`[ERROR] POST /threads -> ${err}`);
        return res.status(500).json({ message: 'Erreur interne du serveur' });
      }
    });
  }

  showById() {
    this.app.get('/threads/:id', async (req, res) => {
      try {
        const thread = await this.ThreadModel.findById(req.params.id)
          .populate('group', 'name')
          .populate('event', 'name')
          .populate('createdby', 'firstname lastname');

        if (!thread) {
          return res.status(404).json({ message: 'Thread non trouvé' });
        }

        return res.status(200).json(thread);
      } catch (err) {
        console.error(`[ERROR] GET /threads/:id -> ${err}`);
        return res.status(500).json({ message: 'Erreur interne du serveur' });
      }
    });
  }

  deleteById() {
    this.app.delete('/threads/:id', async (req, res) => {
      try {
        const deleted = await this.ThreadModel.findByIdAndDelete(req.params.id);
        if (!deleted) {
          return res.status(404).json({ message: 'Thread non trouvé' });
        }
        return res.status(200).json({ message: 'Thread supprimé' });
      } catch (err) {
        console.error(`[ERROR] DELETE /threads/:id -> ${err}`);
        return res.status(500).json({ message: 'Erreur interne du serveur' });
      }
    });
  }

  run() {
    this.create();
    this.showById();
    this.deleteById();
  }
};

export default Threads;
