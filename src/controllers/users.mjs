import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserSchema from '../models/user.mjs';

const Users = class Users {
  constructor(app, connect) {
    this.app = app;
    this.UserModel = connect.model('User', UserSchema);
    this.run();
  }

  create() {
    this.app.post('/users', async (req, res) => {
      try {
        const {
          firstname,
          lastname,
          email,
          password
        } = req.body;

        if (!email || !password) {
          return res.status(400).json({ message: 'Email et mot de passe requis' });
        }

        const existing = await this.UserModel.findOne({ email });
        if (existing) {
          return res.status(409).json({ message: 'Cet email est déjà utilisé.' });
        }

        const hash = await bcrypt.hash(password, 10);
        const user = new this.UserModel({
          firstname,
          lastname,
          email,
          password_hash: hash
        });

        await user.save();
        return res.status(201).json(user);
      } catch (err) {
        console.error(`[ERROR] POST /users -> ${err}`);
        return res.status(500).json({ message: 'Erreur interne du serveur' });
      }
    });
  }

  login() {
    this.app.post('/auth/login', async (req, res) => {
      try {
        const { email, password } = req.body;

        const user = await this.UserModel.findOne({ email });
        if (!user) {
          return res.status(404).json({ message: 'Utilisateur non trouvé.' });
        }

        const valid = await bcrypt.compare(password, user.password_hash);
        if (!valid) {
          return res.status(401).json({ message: 'Mot de passe incorrect.' });
        }

        const token = jwt.sign(
          { id: user._id, email: user.email },
          process.env.JWT_SECRET || 'secret123',
          { expiresIn: '2h' }
        );

        return res.status(200).json({ token, user });
      } catch (err) {
        console.error(`[ERROR] POST /auth/login -> ${err}`);
        return res.status(500).json({ message: 'Erreur interne du serveur' });
      }
    });
  }

  showById() {
    this.app.get('/users/:id', async (req, res) => {
      try {
        const user = await this.UserModel.findById(req.params.id).select('-password_hash');
        if (!user) {
          return res.status(404).json({ message: 'Utilisateur non trouvé.' });
        }

        return res.status(200).json(user);
      } catch (err) {
        console.error(`[ERROR] GET /users/:id -> ${err}`);
        return res.status(500).json({ message: 'Erreur interne du serveur' });
      }
    });
  }

  run() {
    this.create();
    this.login();
    this.showById();
  }
};

export default Users;
