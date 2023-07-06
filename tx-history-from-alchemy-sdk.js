import { Alchemy, Network } from "alchemy-sdk";
// import dotenv from "dotenv";

const config = {
  apiKey: process.env.Alchemy_api,
  network: Network.MATIC_MAINNET,
};
const alchemy = new Alchemy(config);

async function bigdata(_fromAddress) {
  const data = await alchemy.core.getAssetTransfers({
    fromBlock: "0x0",
    fromAddress: _fromAddress,
    category: ["internal"],
  });
  let sum = 0;
  data.transfers.forEach((Element) => {
    sum += Element.value;
  });
  //console.log(data.transfers[0].value);
  return sum;
}

async function totalM() {
  const eggsPromise = bigdata("0xe51f9dD4681F1bdB7fe2C52e5193457c784f25d6");
  const runesPromise = bigdata("0x534bD4C7aa15116Fb7917e74591622Ba55AcB8d0");
  const rafflePromise = bigdata("0x03268806E04d0a0149d8F1CCe2762fd0be95e3aa");
  const [eggs, runes, raffle] = await Promise.all([
    eggsPromise,
    runesPromise,
    rafflePromise,
  ]);

  const total = raffle + eggs + runes;
  console.log(`Total matic printed is ${total}`);
}

totalM();
