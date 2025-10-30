import MessageSchema from '../models/message.mjs';

const Messages = class Messages {
  constructor(app, connect) {
    this.app = app;
    this.MessageModel = connect.model('Message', MessageSchema);
    this.run();
  }

  create() {
    this.app.post('/threads/:threadId/messages', async (req, res) => {
      try {
        const { author, content, parent } = req.body;
        const { threadId } = req.params;

        const msg = new this.MessageModel({
          thread: threadId,
          author,
          content,
          parent
        });

        await msg.save();
        return res.status(201).json(msg);
      } catch (err) {
        console.error(`[ERROR] POST /threads/${req.params.threadId}/messages -> ${err}`);
        return res.status(500).json({ message: 'Erreur interne du serveur' });
      }
    });
  }

  getAllByThread() {
    this.app.get('/threads/:threadId/messages', async (req, res) => {
      try {
        const messages = await this.MessageModel.find({ thread: req.params.threadId })
          .populate('author', 'first_name last_name')
          .sort({ created_at: 1 });

        return res.status(200).json(messages);
      } catch (err) {
        console.error(`[ERROR] GET /threads/${req.params.threadId}/messages -> ${err}`);
        return res.status(500).json({ message: 'Erreur interne du serveur' });
      }
    });
  }

  deleteById() {
    this.app.delete('/messages/:id', async (req, res) => {
      try {
        const deleted = await this.MessageModel.findByIdAndDelete(req.params.id);
        if (!deleted) {
          return res.status(404).json({ message: 'Message non trouvé' });
        }
        return res.status(200).json({ message: 'Message supprimé' });
      } catch (err) {
        console.error(`[ERROR] DELETE /messages/:id -> ${err}`);
        return res.status(500).json({ message: 'Erreur interne du serveur' });
      }
    });
  }

  run() {
    this.create();
    this.getAllByThread();
    this.deleteById();
  }
};

export default Messages;
