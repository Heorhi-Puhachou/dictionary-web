import {createStore} from "redux";
import {LACINK_TAG, NARKAM_TAG, TARASK_TAG} from "../base/constant";
import {NARKAM} from "../styles/narkam";
import {LACINK} from "../styles/lacink";
import {TARASK} from "../styles/tarask";

const styleGuideMap = new Map();
const linksMap = new Map();

const styleReducer = (state = {
    style: TARASK_TAG,
    dictionaries: 'abc',
    labels: TARASK,
    ruleGroups: [],
    linkGroups: [],
    terms: [],
    unionMap: new Map()
}, action) => {
    if (action.type === NARKAM_TAG) {
        return {
            style: NARKAM_TAG,
            dictionaries: state.dictionaries,
            labels: NARKAM,
            ruleGroups: styleGuideMap.get(action.type) ? styleGuideMap.get(action.type) : [],
            linkGroups: linksMap.get(action.type) ? linksMap.get(action.type) : [],
            terms: state.terms,
            unionMap: state.unionMap
        };
    }
    if (action.type === LACINK_TAG) {
        return {
            style: LACINK_TAG,
            dictionaries: state.dictionaries,
            labels: LACINK,
            ruleGroups: styleGuideMap.get(action.type) ? styleGuideMap.get(action.type) : [],
            linkGroups: linksMap.get(action.type) ? linksMap.get(action.type) : [],
            terms: state.terms,
            unionMap: state.unionMap
        };
    }
    if (action.type === TARASK_TAG) {
        return {
            style: TARASK_TAG,
            dictionaries: state.dictionaries,
            labels: TARASK,
            ruleGroups: styleGuideMap.get(action.type) ? styleGuideMap.get(action.type) : [],
            linkGroups: linksMap.get(action.type) ? linksMap.get(action.type) : [],
            terms: state.terms,
            unionMap: state.unionMap
        };
    }

    if (action.type === 'setDictionaries') {
        return {
            style: state.style,
            dictionaries: action.dictionaries,
            labels: state.labels,
            ruleGroups: state.ruleGroups,
            linkGroups: state.linkGroups,
            terms: state.terms,
            unionMap: state.unionMap
        };
    }

    if (action.type === 'addUnionMap') {
        let keys = [];
        for (let key in action.unionMap) {
            if (action.unionMap.hasOwnProperty(key)) {
                state.unionMap.set(key, action.unionMap[key]);
                keys.push(key);
            }
        }
        return {
            style: state.style,
            dictionaries: state.dictionaries,
            labels: state.labels,
            ruleGroups: state.ruleGroups,
            linkGroups: state.linkGroups,
            terms: keys,
            unionMap: state.unionMap
        };
    }

    return state;


};

const store = createStore(styleReducer);

export default store;