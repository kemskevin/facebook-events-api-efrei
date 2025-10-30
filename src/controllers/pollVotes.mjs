import PollVoteSchema from '../models/pollVote.mjs';

const PollVotes = class PollVotes {
  constructor(app, connect) {
    this.app = app;
    this.PollVoteModel = connect.model('PollVote', PollVoteSchema);
    this.run();
  }

  create() {
    this.app.post('/questions/:questionId/votes', async (req, res) => {
      try {
        const {
          voter,
          optionkey
        } = req.body;

        const vote = new this.PollVoteModel({
          question: req.params.questionId,
          voter,
          optionkey
        });

        await vote.save();
        return res.status(201).json(vote);
      } catch (err) {
        if (err.code === 11000) {
          return res.status(409).json({ message: 'Vote déjà enregistré pour cette question.' });
        }
        console.error(`[ERROR] POST /questions/${req.params.questionId}/votes -> ${err}`);
        return res.status(500).json({ message: 'Erreur interne du serveur' });
      }
    });
  }

  getByQuestion() {
    this.app.get('/questions/:questionId/votes', async (req, res) => {
      try {
        const votes = await this.PollVoteModel.find({ question: req.params.questionId });
        return res.status(200).json(votes);
      } catch (err) {
        console.error(`[ERROR] GET /questions/${req.params.questionId}/votes -> ${err}`);
        return res.status(500).json({ message: 'Erreur interne du serveur' });
      }
    });
  }

  run() {
    this.create();
    this.getByQuestion();
  }
};

export default PollVotes;
