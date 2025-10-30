import TicketTypeSchema from '../models/ticketType.mjs';

const TicketTypes = class TicketTypes {
  constructor(app, connect) {
    this.app = app;
    this.TicketTypeModel = connect.model('TicketType', TicketTypeSchema);
    this.run();
  }

  create() {
    this.app.post('/events/:eventId/ticket-types', async (req, res) => {
      try {
        const type = new this.TicketTypeModel({
          ...req.body,
          event: req.params.eventId
        });
        await type.save();
        return res.status(201).json(type);
      } catch (err) {
        console.error(`[ERROR] POST /events/${req.params.eventId}/ticket-types -> ${err}`);
        return res.status(500).json({ message: 'Erreur interne du serveur' });
      }
    });
  }

  getAllByEvent() {
    this.app.get('/events/:eventId/ticket-types', async (req, res) => {
      try {
        const types = await this.TicketTypeModel.find({ event: req.params.eventId });
        return res.status(200).json(types);
      } catch (err) {
        console.error(`[ERROR] GET /events/${req.params.eventId}/ticket-types -> ${err}`);
        return res.status(500).json({ message: 'Erreur interne du serveur' });
      }
    });
  }

  run() {
    this.create();
    this.getAllByEvent();
  }
};

export default TicketTypes;
