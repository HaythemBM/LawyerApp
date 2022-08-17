//Librairies à appeler
const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const methodOverride = require("method-override");

//Usage de forçage de méthode CRUD dans un formulaire HTML
app.use(express.json({ extended: true }));
app.use(methodOverride("_method"));
app.use(cors());

//Usage du middleware morgan pour affocher le statut et le type de requette effectuée
app.use(morgan("dev"));

//Routes à ajouter
//  pour la db clients
const clientRouter = require("./routes/client");
app.use("/clients", clientRouter);
//  pour la db dossiers
const dossierRouter = require("./routes/dossier");
app.use("/dossiers", dossierRouter);
//  pour la db users
const userRouter = require("./routes/user");
app.use("/", userRouter);

//Connection à la base de donnée
mongoose
  .connect("mongodb://localhost:27017/ProjetDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MONGO CONNECTION OPEN!!!");
  })
  .catch((err) => {
    console.log("OH NO MONGO CONNECTION ERROR!!!!");
    console.log(err);
  });

/*_________________________________ACTIVATION DU SERVEUR EXPRESS__________________________________*/

app.listen(5000, () => {
  console.log("APP IS LISTENING ON PORT 5000!");
});
