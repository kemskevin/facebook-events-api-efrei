import ShoppingItemSchema from '../models/shoppingItem.mjs';

const ShoppingList = class ShoppingList {
  constructor(app, connect) {
    this.app = app;
    this.ShoppingItemModel = connect.model('ShoppingItem', ShoppingItemSchema);
    this.run();
  }

  // Ajouter un élément à la liste d’un événement
  create() {
    this.app.post('/events/:eventId/shopping-list', async (req, res) => {
      try {
        const {
          name,
          quantity,
          arrivaltime,
          user
        } = req.body;
        const { eventId } = req.params;

        const item = new this.ShoppingItemModel({
          name,
          quantity,
          arrivaltime,
          event: eventId,
          user
        });

        await item.save();
        return res.status(201).json(item);
      } catch (err) {
        if (err.code === 11000) {
          return res.status(409).json({ message: 'Cet objet existe déjà pour cet événement.' });
        }
        console.error(`[ERROR] POST /events/${req.params.eventId}/shopping-list -> ${err}`);
        return res.status(500).json({ message: 'Erreur interne du serveur' });
      }
    });
  }

  // Récupérer la liste d’un événement
  getByEvent() {
    this.app.get('/events/:eventId/shopping-list', async (req, res) => {
      try {
        const items = await this.ShoppingItemModel.find({ event: req.params.eventId })
          .populate('user', 'first_name last_name email');
        return res.status(200).json(items);
      } catch (err) {
        console.error(`[ERROR] GET /events/${req.params.eventId}/shopping-list -> ${err}`);
        return res.status(500).json({ message: 'Erreur interne du serveur' });
      }
    });
  }

  // Supprimer un élément
  delete() {
    this.app.delete('/events/:eventId/shopping-list/:id', async (req, res) => {
      try {
        const deleted = await this.ShoppingItemModel.findByIdAndDelete(req.params.id);
        if (!deleted) {
          return res.status(404).json({ message: 'Élément non trouvé' });
        }
        return res.status(200).json({ message: 'Élément supprimé' });
      } catch (err) {
        console.error(`[ERROR] DELETE /events/${req.params.eventId}/shopping-list/${req.params.id} -> ${err}`);
        return res.status(500).json({ message: 'Erreur interne du serveur' });
      }
    });
  }

  run() {
    this.create();
    this.getByEvent();
    this.delete();
  }
};

export default ShoppingList;
