import EventSchema from '../models/event.mjs';

const Events = class Events {
  constructor(app, connect) {
    this.app = app;
    this.EventModel = connect.model('Event', EventSchema);
    this.run();
  }

  create() {
    this.app.post('/events', async (req, res) => {
      try {
        const event = new this.EventModel(req.body);
        await event.save();
        return res.status(201).json(event);
      } catch (err) {
        console.error(`[ERROR] POST /events -> ${err}`);
        return res.status(500).json({ message: 'Erreur interne du serveur' });
      }
    });
  }

  getAll() {
    this.app.get('/events', async (req, res) => {
      try {
        const events = await this.EventModel.find()
          .populate('organizers', 'first_name last_name email')
          .populate('group', 'name');
        res.status(200).json(events);
      } catch (err) {
        console.error(`[ERROR] GET /events -> ${err}`);
        res.status(500).json({ message: 'Erreur interne du serveur' });
      }
    });
  }

  showById() {
    this.app.get('/events/:id', async (req, res) => {
      try {
        const event = await this.EventModel.findById(req.params.id)
          .populate('organizers', 'first_name last_name')
          .populate('participants', 'first_name last_name')
          .populate('group', 'name');

        if (!event) {
          return res.status(404).json({ message: 'Événement non trouvé.' });
        }

        return res.status(200).json(event);
      } catch (err) {
        console.error(`[ERROR] GET /events/:id -> ${err}`);
        return res.status(500).json({ message: 'Erreur interne du serveur' });
      }
    });
  }

  update() {
    this.app.put('/events/:id', async (req, res) => {
      try {
        const updated = await this.EventModel.findByIdAndUpdate(req.params.id, req.body, {
          new: true,
          runValidators: true
        });

        if (!updated) {
          return res.status(404).json({ message: 'Événement non trouvé.' });
        }

        return res.status(200).json(updated);
      } catch (err) {
        console.error(`[ERROR] PUT /events/:id -> ${err}`);
        return res.status(500).json({ message: 'Erreur interne du serveur' });
      }
    });
  }

  deleteById() {
    this.app.delete('/events/:id', async (req, res) => {
      try {
        const deleted = await this.EventModel.findByIdAndDelete(req.params.id);
        if (!deleted) {
          return res.status(404).json({ message: 'Événement non trouvé.' });
        }

        return res.status(200).json({ message: 'Événement supprimé.' });
      } catch (err) {
        console.error(`[ERROR] DELETE /events/:id -> ${err}`);
        return res.status(500).json({ message: 'Erreur interne du serveur' });
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

export default Events;
