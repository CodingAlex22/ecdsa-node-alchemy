const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "042e4d4c5801b9e1ddd1babd6fe41b384e13aee6742b62e19be5df0f80637bc744b3394f9aca9436b6294cb19d970a02ec44eb1349d7ea70a57c131611e8862151": 100,
  "045b837357131a879046432b7d985d1e49d8d2ef39352cddfbf8ebf3e944fe203122b86efb3db2f3eb5c692f7cd61ac0558857b7b001c8ea326d6b31d27a65fb6e": 50,
  "04a59bcb20f02343d22ab393cc67bccc8cc68e7c1155a2ffee68b1312cd3194bdbeb210aed837a7c9191adbcf92c44a836d0bcfbc582bbe2bf0af1d394cab4f7a4": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});


app.post("/send", (req, res) => {
  // TODO: get a signature from the client-side application
  // recover the public address from the signature
  

  const { sender, recipient, amount } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
