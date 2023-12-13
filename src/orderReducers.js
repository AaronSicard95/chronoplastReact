import ChronoApi from "./api";

async function placeOrder(record_id){
    const result = await ChronoApi.placeOrder(record_id);
    return result;
}

const INITIAL_STATE = placeOrder;

export function order(state=INITIAL_STATE, action){
    switch(action.type){
        case 'RUN':

    }
}