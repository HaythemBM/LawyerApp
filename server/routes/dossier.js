//Librairies à appeler
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const router = express.Router();
const methodOverride = require("method-override");

//Créer application/json parser
let jsonParser = bodyParser.json();

//modèles à appeler
const Client = require("../models/client");
const Dossier = require("../models/dossier");

//Usage de forçage de méthode CRUD dans un formulaire HTML
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

/* _______________________________________SECTION DOSSIERS________________________________________ */

// Interface de la liste des dossiers du client d'id spécifique
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const dossiers = await Dossier.find({ client: id });
  const client = await Client.findById(id);
  // console.log(`dossiers du client ${client.nom} sont:`);
  console.log(dossiers);
  res.send(dossiers);
});

// Ajout d'un dossier à un client d'id spécifique
router.post("/", jsonParser, async (req, res) => {
  const newDossier = new Dossier(req.body);
  await newDossier.save();
  const RelatedClient = await Client.findById(newDossier.client).populate(
    "dossiers"
  );
  RelatedClient.dossiers.push(newDossier);
  console.log(newDossier);
});

//Tirez un dossier d'id spécifique
router.get("/lookfor/:idd", async (req, res) => {
  const { idd } = req.params;
  const dossier = await Dossier.findById(idd);
  console.log(dossier);
  res.send(dossier);
});

// Modification d'un dossier d'id spécifique
router.put("/:idd", jsonParser, async (req, res) => {
  const { idd } = req.params;
  const dossier = await Dossier.findByIdAndUpdate(idd, req.body, {
    runValidators: true,
    new: true,
  });
  const RelatedClient = await Client.findById(dossier.client);
  for (let i = 0; i < RelatedClient.dossiers.length; i++) {
    if (RelatedClient.dossiers[i].ref === dossier.ref) {
      RelatedClient.dossiers[i].pop();
      RelatedClient.dossiers.push(dossier);
      break;
    }
  }
  console.log(req.body);
});

// Suppression d'un dossier d'id spécifique
router.delete("/:idd", async (req, res) => {
  const { idd } = req.params;
  const deletedDossier = await Dossier.findByIdAndDelete(idd);
  const RelatedClient = await Client.findById(deletedDossier.client);
  for (let i = 0; i < RelatedClient.dossiers.length; i++) {
    if (RelatedClient.dossiers[i].ref === deletedDossier.ref) {
      RelatedClient.dossiers[i].pop();
      break;
    }
  }
});

// Export du routeur dossier
module.exports = router;
