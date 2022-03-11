import {createStore} from "redux";
import {LACINK_TAG, NARKAM_TAG, TARASK_TAG} from "../base/constant";
import {NARKAM} from "../styles/narkam";
import {LACINK} from "../styles/lacink";
import {TARASK} from "../styles/tarask";

const styleGuideMap = new Map();
const linksMap = new Map();
const termsMap = new Map();

const styleReducer = (state = {
    style: TARASK_TAG,
    labels: TARASK,
    ruleGroups: [],
    linkGroups: [],
    terms: []
}, action) => {
    if (action.type === NARKAM_TAG) {
        return {
            style: NARKAM_TAG,
            labels: NARKAM,
            ruleGroups: styleGuideMap.get(action.type) ? styleGuideMap.get(action.type) : [],
            linkGroups: linksMap.get(action.type) ? linksMap.get(action.type) : [],
            terms: termsMap.get(action.type) ? termsMap.get(action.type) : [],
        };
    }
    if (action.type === LACINK_TAG) {
        return {
            style: LACINK_TAG,
            labels: LACINK,
            ruleGroups: styleGuideMap.get(action.type) ? styleGuideMap.get(action.type) : [],
            linkGroups: linksMap.get(action.type) ? linksMap.get(action.type) : [],
            terms: termsMap.get(action.type) ? termsMap.get(action.type) : [],
        };
    }
    if (action.type === TARASK_TAG) {
        return {
            style: TARASK_TAG,
            labels: TARASK,
            ruleGroups: styleGuideMap.get(action.type) ? styleGuideMap.get(action.type) : [],
            linkGroups: linksMap.get(action.type) ? linksMap.get(action.type) : [],
            terms: termsMap.get(action.type) ? termsMap.get(action.type) : [],
        };
    }
    if (action.type === 'addR') {
        styleGuideMap.set(NARKAM_TAG, action.rulesMap.get(NARKAM_TAG));
        styleGuideMap.set(TARASK_TAG, action.rulesMap.get(TARASK_TAG));
        styleGuideMap.set(LACINK_TAG, action.rulesMap.get(LACINK_TAG));
        return {
            style: state.style,
            labels: state.labels,
            ruleGroups: styleGuideMap.get(state.style),
            linkGroups: state.linkGroups,
            terms: state.terms,
        };
    }
    if (action.type === 'addL') {
        linksMap.set(NARKAM_TAG, action.linksMap.get(NARKAM_TAG));
        linksMap.set(TARASK_TAG, action.linksMap.get(TARASK_TAG));
        linksMap.set(LACINK_TAG, action.linksMap.get(LACINK_TAG));
        return {
            style: state.style,
            labels: state.labels,
            ruleGroups: state.ruleGroups,
            linkGroups: linksMap.get(state.style),
            terms: state.terms,
        };
    }
    if (action.type === 'addT') {
        termsMap.set(NARKAM_TAG, action.termsMap.get(NARKAM_TAG));
        termsMap.set(TARASK_TAG, action.termsMap.get(TARASK_TAG));
        termsMap.set(LACINK_TAG, action.termsMap.get(LACINK_TAG));
        return {
            style: state.style,
            labels: state.labels,
            ruleGroups: state.ruleGroups,
            linkGroups: state.linkGroups,
            terms: termsMap.get(state.style)
        };
    }

    return state;


};

const store = createStore(styleReducer);

export default store;