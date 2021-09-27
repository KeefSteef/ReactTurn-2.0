import {
    ADD_TO_STATICS,
    REDRAW_STATE_ELEMENT,
    UPDATE_AFTER_REMOVE,
    PUSH_OBJ_AFTER_REMOVE,
    LAST_FINISHED_CARD,
    PAUSE_CARD, SHOW_REJECTED_LIST,
    NEW_CARD_TIME_TO_START
} from "../actionsType/actionsType";

export function addToAnalytics(obj) {
    return {
        type: ADD_TO_STATICS,
        payload: obj
    }
}

export function redrawFunction(obj) {
    return {
        type: REDRAW_STATE_ELEMENT,
        payload: obj
    }
}

export function updateAfterRemove(obj) {
    return {
        type: UPDATE_AFTER_REMOVE,
        payload: obj
    }
}

export function pushNewObject(toggle) {
    return {
        type: PUSH_OBJ_AFTER_REMOVE,
        payload: toggle
    }
}

export function pushLastCard(obj){
    return{
        type: LAST_FINISHED_CARD,
        payload: obj
    }
}

export function doPauseCard(toggle){
    return {
        type : PAUSE_CARD,
        payload: toggle
    }
}

export function showRejectedList(toggle){
    return{
        type: SHOW_REJECTED_LIST,
        payload: toggle
    }
}

export function timerToStartNewCard(value){
    return{
        type: NEW_CARD_TIME_TO_START,
        payload: value
    }
}