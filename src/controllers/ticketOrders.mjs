import TicketOrderSchema from '../models/ticketOrder.mjs';
import TicketTypeSchema from '../models/ticketType.mjs';

const TicketOrders = class TicketOrders {
  constructor(app, connect) {
    this.app = app;
    this.TicketOrderModel = connect.model('TicketOrder', TicketOrderSchema);
    this.TicketTypeModel = connect.model('TicketType', TicketTypeSchema);
    this.run();
  }

  create() {
    this.app.post('/events/:eventId/orders', async (req, res) => {
      try {
        const { ticketType, buyer } = req.body;

        // Vérifie le stock
        const type = await this.TicketTypeModel.findOneAndUpdate(
          { _id: ticketType, event: req.params.eventId, stock: { $gt: 0 } },
          { $inc: { stock: -1 } },
          { new: true }
        );

        if (!type) {
          return res.status(400).json({ message: 'Billet épuisé ou type introuvable.' });
        }

        const order = new this.TicketOrderModel({
          event: req.params.eventId,
          ticketType,
          buyer
        });

        await order.save();
        return res.status(201).json(order);
      } catch (err) {
        if (err.code === 11000) {
          return res.status(409).json({ message: 'Cet acheteur a déjà un billet pour cet événement.' });
        }
        console.error(`[ERROR] POST /events/${req.params.eventId}/orders -> ${err}`);
        return res.status(500).json({ message: 'Erreur interne du serveur' });
      }
    });
  }

  getAllByEvent() {
    this.app.get('/events/:eventId/orders', async (req, res) => {
      try {
        const orders = await this.TicketOrderModel.find({ event: req.params.eventId });
        return res.status(200).json(orders);
      } catch (err) {
        console.error(`[ERROR] GET /events/${req.params.eventId}/orders -> ${err}`);
        return res.status(500).json({ message: 'Erreur interne du serveur' });
      }
    });
  }

  run() {
    this.create();
    this.getAllByEvent();
  }
};

export default TicketOrders;
