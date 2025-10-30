import PollSchema from '../models/poll.mjs';

const Polls = class Polls {
  constructor(app, connect) {
    this.app = app;
    this.PollModel = connect.model('Poll', PollSchema);
    this.run();
  }

  create() {
    this.app.post('/events/:eventId/polls', async (req, res) => {
      try {
        const poll = new this.PollModel({
          ...req.body,
          event: req.params.eventId
        });
        await poll.save();
        return res.status(201).json(poll);
      } catch (err) {
        console.error(`[ERROR] POST /events/${req.params.eventId}/polls -> ${err}`);
        return res.status(500).json({ message: 'Erreur interne du serveur' });
      }
    });
  }

  getAllByEvent() {
    this.app.get('/events/:eventId/polls', async (req, res) => {
      try {
        const polls = await this.PollModel.find({ event: req.params.eventId });
        return res.status(200).json(polls);
      } catch (err) {
        console.error(`[ERROR] GET /events/${req.params.eventId}/polls -> ${err}`);
        return res.status(500).json({ message: 'Erreur interne du serveur' });
      }
    });
  }

  showById() {
    this.app.get('/polls/:id', async (req, res) => {
      try {
        const poll = await this.PollModel.findById(req.params.id).populate('event', 'name');
        if (!poll) return res.status(404).json({ message: 'Sondage non trouvé' });
        return res.status(200).json(poll);
      } catch (err) {
        console.error(`[ERROR] GET /polls/:id -> ${err}`);
        return res.status(500).json({ message: 'Erreur interne du serveur' });
      }
    });
  }

  deleteById() {
    this.app.delete('/polls/:id', async (req, res) => {
      try {
        const deleted = await this.PollModel.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: 'Sondage non trouvé' });
        return res.status(200).json({ message: 'Sondage supprimé' });
      } catch (err) {
        console.error(`[ERROR] DELETE /polls/:id -> ${err}`);
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

export default Polls;
