import CarpoolSchema from '../models/carpool.mjs';

const Carpool = class Carpool {
  constructor(app, connect) {
    this.app = app;
    this.CarpoolModel = connect.model('Carpool', CarpoolSchema);
    this.run();
  }

  // Créer une nouvelle offre de covoiturage
  create() {
    this.app.post('/events/:eventId/carpool', async (req, res) => {
      try {
        const {
          departurelocation,
          departuretime,
          price,
          availableseats,
          maxdelay,
          driver
        } = req.body;

        const { eventId } = req.params;

        const carpool = new this.CarpoolModel({
          departurelocation,
          departuretime,
          price,
          availableseats,
          maxdelay,
          driver,
          event: eventId
        });

        await carpool.save();
        return res.status(201).json(carpool);
      } catch (err) {
        console.error(`[ERROR] POST /events/${req.params.eventId}/carpool -> ${err}`);
        return res.status(500).json({ message: 'Erreur interne du serveur' });
      }
    });
  }

  // Liste tous les covoiturages pour un événement
  getByEvent() {
    this.app.get('/events/:eventId/carpool', async (req, res) => {
      try {
        const carpools = await this.CarpoolModel.find({ event: req.params.eventId })
          .populate('driver', 'firstname lastname email')
          .populate('passengers', 'firstname lastname email');
        return res.status(200).json(carpools);
      } catch (err) {
        console.error(`[ERROR] GET /events/${req.params.eventId}/carpool -> ${err}`);
        return res.status(500).json({ message: 'Erreur interne du serveur' });
      }
    });
  }

  // Rejoindre un covoiturage
  joinCarpool() {
    this.app.post('/events/:eventId/carpool/:carpoolId/join', async (req, res) => {
      try {
        const { carpoolId } = req.params;
        const { userId } = req.body;

        const carpool = await this.CarpoolModel.findById(carpoolId);
        if (!carpool) {
          return res.status(404).json({ message: 'Offre introuvable' });
        }

        if (carpool.passengers.includes(userId)) {
          return res.status(409).json({ message: 'Vous êtes déjà inscrit dans cette voiture' });
        }

        const remainingSeats = carpool.availableseats - carpool.passengers.length;
        if (remainingSeats <= 0) {
          return res.status(400).json({ message: 'Plus de places disponibles' });
        }

        carpool.passengers.push(userId);
        await carpool.save();

        return res.status(200).json({
          message: 'Vous avez rejoint le covoiturage avec succès',
          carpool
        });
      } catch (err) {
        console.error(
          `[ERROR] POST /events/${req.params.eventId}/carpool/${req.params.carpoolId}/join -> ${err}`
        );
        return res.status(500).json({ message: 'Erreur interne du serveur' });
      }
    });
  }

  // Quitter un covoiturage
  leaveCarpool() {
    this.app.delete('/events/:eventId/carpool/:carpoolId/leave', async (req, res) => {
      try {
        const { carpoolId } = req.params;
        const { userId } = req.body;

        const carpool = await this.CarpoolModel.findById(carpoolId);
        if (!carpool) {
          return res.status(404).json({ message: 'Offre introuvable' });
        }

        const beforeCount = carpool.passengers.length;
        carpool.passengers = carpool.passengers.filter(
          (p) => p.toString() !== userId
        );

        if (carpool.passengers.length === beforeCount) {
          return res.status(404).json({ message: 'Utilisateur non trouvé dans le covoiturage' });
        }

        await carpool.save();

        return res.status(200).json({
          message: 'Vous avez quitté le covoiturage avec succès',
          carpool
        });
      } catch (err) {
        console.error(
          `[ERROR] DELETE /events/${req.params.eventId}/carpool/${req.params.carpoolId}/leave -> ${err}`
        );
        return res.status(500).json({ message: 'Erreur interne du serveur' });
      }
    });
  }

  // Supprimer une offre (conducteur uniquement)
  delete() {
    this.app.delete('/events/:eventId/carpool/:id', async (req, res) => {
      try {
        const deleted = await this.CarpoolModel.findByIdAndDelete(req.params.id);
        if (!deleted) {
          return res.status(404).json({ message: 'Offre non trouvée' });
        }
        return res.status(200).json({ message: 'Offre supprimée' });
      } catch (err) {
        console.error(`[ERROR] DELETE /events/${req.params.eventId}/carpool/${req.params.id} -> ${err}`);
        return res.status(500).json({ message: 'Erreur interne du serveur' });
      }
    });
  }

  run() {
    this.create();
    this.getByEvent();
    this.joinCarpool();
    this.leaveCarpool();
    this.delete();
  }
};

export default Carpool;
