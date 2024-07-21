import { PrivateKey } from './../../../node_modules/@aptos-labs/ts-sdk/src/core/crypto/privateKey';
import {Account,Aptos,AccountAddress,AptosConfig,Network} from "@aptos-labs/ts-sdk"

//initializing some stuff
const APTOS_COIN = "0x1::aptos_coin::AptosCoin";
const COIN_STORE = `0x1::coin::CoinStore<${APTOS_COIN}>`;

//setting up the client
const config = new AptosConfig({ network: Network.DEVNET });
const aptos = new Aptos(config);


export async function createAptosAccount(){
  const account: Account = Account.generate();
  return (account.accountAddress.toString())
}

export async function fundAccount(account: Account,amount: number){
  await aptos.fundAccount({
    accountAddress: account.accountAddress,
    amount: amount,
  })
}

export async function getAccountBalance(account:Account){
  const accountBalance=await aptos.getAccountResource({
 accountAddress: account.accountAddress,
 resourceType: COIN_STORE
  })
  const balance=Number(accountBalance.coin.value)
  return balance
}


 async function transferTokens(sender:Account, receiver:Account,amount:number){
  const transaction = await aptos.transaction.build.simple({
  sender: sender.accountAddress,
  data:{
    function:"addrr::module-addr::transfer",
    functionArguments:[receiver.accountAddress,amount],
  }
  })
  const pendingTransaction = await aptos.signAndSubmitTransaction({
    signer: sender,
    transaction,
  });
  const executedTransaction = await aptos.waitForTransaction({ transactionHash: pendingTransaction.hash });
  console.log("Transaction hash:", executedTransaction.hash);
 }
