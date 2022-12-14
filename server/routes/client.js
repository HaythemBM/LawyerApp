//Librairies à appeler
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const router = express.Router();
const methodOverride = require("method-override");

//Usage de forçage de méthode CRUD dans un formulaire HTML
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

//Créer application/json parser
let jsonParser = bodyParser.json();

//modèles à appeler
const Client = require("../models/client");
const User = require("../models/user");
const Dossier = require("../models/dossier");

/*_______________________________________SECTION CLIENTS________________________________________ */

// Interface de liste des clients
router.get("/:idu", async (req, res) => {
  const { idu } = req.params;
  const user = await User.findById(idu);
  const clients = await Client.find({ user: idu });
  // console.log(`clients de l'avocat ${user.nom} sont:`);
  console.log(clients);
  res.send(clients);
});

// Ajout d'un client
router.post("/", jsonParser, async (req, res) => {
  const newClient = new Client(req.body);
  await newClient.save();
  const RelatedUser = await User.findById(newClient.user).populate("clients");
  RelatedUser.clients.push(newClient);
  console.log(newClient);
});

//Tirez un client d'id spécifique
router.get("/lookfor/:id", async (req, res) => {
  const { id } = req.params;
  const client = await Client.findById(id);
  console.log(client);
  res.send(client);
});

// Tirez un client d'id spécifique
router.get("/:idu/:id", async (req, res) => {
  const { id } = req.params;
  const client = await Client.findById(id);
  const { idu } = req.params;
  const user = await User.findById(idu);
  console.log(client);
  res.send(client);
});

// Modification d'un client
router.put("/:id", jsonParser, async (req, res) => {
  const { id } = req.params;
  const client = await Client.findByIdAndUpdate(id, req.body, {
    runValidators: true,
    new: true,
  });
  const RelatedUser = await User.findById(client.user);
  for (let i = 0; i < RelatedUser.clients.length; i++) {
    if (RelatedUser.clients[i].email === client.email) {
      RelatedUser.clients[i].pop();
      RelatedUser.clients.push(client);
      break;
    }
  }
  console.log(req.body);
});

// Supression d'un client
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const FoldersToDelete = await Dossier.find({ client: id });
  for (let i = 0; i < FoldersToDelete.length; i++) {
    await Dossier.deleteOne(FoldersToDelete[i]);
  }
  const deletedClient = await Client.findByIdAndDelete(id);
});

// Export du routeur client
module.exports = router;
