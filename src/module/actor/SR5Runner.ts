import SR5BaseActor, { ISR5BaseActorData, ISR5BaseActorDataContainer } from './SR5BaseActor';

// TODO: Assumes Foundry will be enforcing types - as we can see here
//  it's technically possible to get unexpected results.
export interface ISR5RunnerDataContainer extends ISR5BaseActorDataContainer {
    data: ISR5RunnerData;
}
export interface ISR5RunnerData extends ISR5BaseActorData {
    butts: string;
}

export default class SR5Runner extends SR5BaseActor {
    // <editor-fold desc="Static Properties"></editor-fold>
    // <editor-fold desc="Static Methods"></editor-fold>
    // <editor-fold desc="Properties">
    data: ISR5RunnerDataContainer;
    // </editor-fold>
    // <editor-fold desc="Constructor & Initialization"></editor-fold>
    // <editor-fold desc="Getters & Setters"></editor-fold>
    // <editor-fold desc="Instance Methods"></editor-fold>
}
