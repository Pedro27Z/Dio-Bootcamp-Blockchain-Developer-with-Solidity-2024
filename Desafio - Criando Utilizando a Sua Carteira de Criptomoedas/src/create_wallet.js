// importando as dependencias
const bip32 = require("bip32")
const bip39 = require("bip39")
const bitcoin = require("bitcoinjs-lib")

// definir rede
// bitcoin - rede principal = mainnet
// testnet - rede de teste = testnet
const network = bitcoin.networks.testnet

// derivação de carteiras HD (Hierárquica, Determinística)
//`m/49'/1'/0'/0` para testnet, `m/49'/0'/0'/0` para mainnet
const path = `m/49'/1'/0'/0`

// criando o mnemonic para a seed (palavras-chave)
let mnemonic = bip39.generateMnemonic()
const seed = bip39.mnemonicToSeedSync(mnemonic)

// criando a raíz da carteira HD
let root = bip32.fromSeed(seed, network)

// criando uma conta - par pvt - pub keys
let account = root.derivePath(path)

let node = account.derive(0).derive(0)
 
let btcAdress = bitcoin.payments.p2pkh({
    pubkey: node.publicKey,
    network: network
}).address

console.log ("Carteira criada")
console.log ("Endereço: ", btcAdress)
console.log ("Chave privada: ", node.toWIF())
console.log ("Seed: ", mnemonic)