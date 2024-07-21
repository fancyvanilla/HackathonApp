use aptos_framework::event;
use std::string::String;
use aptos_std::table::Table;
use std::signer;
use aptos_token::token;
use aptos_token::token::TokenDataId;

module hackAppAddr::tickets{

struct ModuleData has key {
    token_data_id: TokenDataId,
}

//fund the user with his own money and 

fun init_module(source_account:&signer){

    let collection_name= string::utf8(b"tour-tickets");
    let token_name= string::utf8(b"ticket");
    let mutate_setting = vector<bool>[ false, false, false ];
    
    token::create_collection(collection_name, token_name, mutate_setting)

    //blueprint of all nfts of this collection
    let token_data_id= token::create_tokendata(
        source_account
        collection_name
        token_name
        is-ticket_used
        expiration-date
    )
    move_to(source_account, ModuleData{
        token_data_id
    })
}








}