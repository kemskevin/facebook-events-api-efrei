{
    "users" [
      {
        "_id": "672f11111111111111111111",
        "first_name": "Kevin",
        "last_name": "Dupont",
        "email": "kevin@example.com",
        "password": "123456"
      },
      {
        "_id": "672f22222222222222222222",
        "first_name": "Alice",
        "last_name": "Martin",
        "email": "alice@example.com",
        "password": "azerty"
      },
      {
        "_id": "672f33333333333333333333",
        "first_name": "Paul",
        "last_name": "Durand",
        "email": "paul@example.com",
        "password": "password"
      }
    ],
  
    "groups" [
      {
        "_id": "673000000000000000000001",
        "name": "EFREI Promo 2025",
        "description": "Groupe privé des étudiants EFREI 2025",
        "visibility": "private",
        "admins": ["672f11111111111111111111"],
        "members": ["672f11111111111111111111", "672f22222222222222222222", "672f33333333333333333333"]
      }
    ],
  
    "events" [
      {
        "_id": "673000000000000000000002",
        "name": "Soirée EFREI 2025",
        "description": "Soirée de fin d'année étudiante 🎉",
        "start_date": "2025-12-20T20:00:00Z",
        "end_date": "2025-12-21T03:00:00Z",
        "location": "EFREI Paris, Villejuif",
        "privacy": "public",
        "organizers": ["672f11111111111111111111"],
        "participants": ["672f22222222222222222222", "672f33333333333333333333"],
        "group": "673000000000000000000001"
      }
    ],
  
    "albums" [
      {
        "_id": "673000000000000000000003",
        "title": "Souvenirs EFREI",
        "description": "Album photo de la soirée EFREI 2025",
        "photos": [],
        "created_at": "2025-12-21T08:00:00Z"
      }
    ],
  
    "photos" [
      {
        "_id": "673000000000000000000004",
        "album": "673000000000000000000003",
        "posted_by": "672f22222222222222222222",
        "url": "https://picsum.photos/300/200?random=1",
        "title": "Photo de groupe",
        "description": "Toute la promo EFREI 2025 réunie !"
      }
    ],
  
    "polls" [
      {
        "_id": "673000000000000000000005",
        "event": "673000000000000000000002",
        "title": "Choix du DJ 🎧",
        "created_by": "672f11111111111111111111"
      }
    ],
  
    "pollQuestions" [
      {
        "_id": "673000000000000000000006",
        "poll": "673000000000000000000005",
        "question": "Quel DJ préférez-vous ?",
        "options": [
          { "key": "A", "label": "DJ Snake" },
          { "key": "B", "label": "David Guetta" },
          { "key": "C", "label": "Martin Garrix" }
        ]
      }
    ],
  
    "pollVotes" [
      {
        "_id": "673000000000000000000007",
        "question": "673000000000000000000006",
        "voter": "672f22222222222222222222",
        "option_key": "B"
      }
    ],
  
    "ticketTypes" [
      {
        "_id": "673000000000000000000008",
        "event": "673000000000000000000002",
        "name": "Entrée Standard",
        "price": 15,
        "stock": 100
      }
    ],
  
    "ticketOrders" [
      {
        "_id": "673000000000000000000009",
        "event": "673000000000000000000002",
        "ticketType": "673000000000000000000008",
        "buyer": {
          "first_name": "Paul",
          "last_name": "Durand",
          "email": "paul@example.com",
          "address": "12 rue des Fleurs, Paris"
        }
      }
    ],
  
    "shoppingList" [
      {
        "_id": "673000000000000000000010",
        "name": "Pack de bières 🍺",
        "quantity": 3,
        "arrival_time": "19:30",
        "event": "673000000000000000000002",
        "user": "672f33333333333333333333"
      }
    ],
  
    "carpools" [
      {
        "_id": "673000000000000000000011",
        "departure_location": "Châtelet, Paris",
        "departure_time": "18:00",
        "price": 5,
        "available_seats": 3,
        "max_delay": "30min",
        "driver": "672f22222222222222222222",
        "passengers": ["672f33333333333333333333"],
        "event": "673000000000000000000002"
      }
    ]
  }