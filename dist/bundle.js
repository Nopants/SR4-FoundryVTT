(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SYSTEM_NAME = void 0;
exports.SYSTEM_NAME = 'shadowrun5e';
},{}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Setup_1 = require("./Setup");
Setup_1.default.run();
},{"./Setup":3}],3:[function(require,module,exports){
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const SR5ActorProxy_1 = require("./actor/SR5ActorProxy");
const Constants_1 = require("./Constants");
const SR5BaseActorSheet_1 = require("./actor/sheet/SR5BaseActorSheet");
const SR5ItemProxy_1 = require("./item/SR5ItemProxy");
const SR5BaseItemSheet_1 = require("./item/sheet/SR5BaseItemSheet");
class Setup {
    static run() {
        Hooks.once('init', this.init);
        Hooks.once('setup', this.setup);
        Hooks.once('ready', this.ready);
    }
    // Tasks called on init
    static init() {
        // Register actor + sheets
        CONFIG.Actor.entityClass = SR5ActorProxy_1.default;
        Actors.unregisterSheet('core', ActorSheet);
        Actors.registerSheet(Constants_1.SYSTEM_NAME, SR5BaseActorSheet_1.default, { makeDefault: true });
        // Register item + sheets
        CONFIG.Item.entityClass = SR5ItemProxy_1.default;
        Items.unregisterSheet('core', ItemSheet);
        Items.registerSheet(Constants_1.SYSTEM_NAME, SR5BaseItemSheet_1.default, { makeDefault: true });
        // Above code will run synchronously with Foundry
        // Async tasks can be done by returning a new Promise
        return Promise.resolve();
    }
    static setup() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    static ready() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
}
exports.default = Setup;
},{"./Constants":1,"./actor/SR5ActorProxy":4,"./actor/sheet/SR5BaseActorSheet":8,"./item/SR5ItemProxy":13,"./item/sheet/SR5BaseItemSheet":14}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SR5Runner_1 = require("./SR5Runner");
const SR5Grunt_1 = require("./SR5Grunt");
const ActorType_1 = require("./types/ActorType");
class SR5ActorProxy extends Actor {
    // </editor-fold>
    // <editor-fold desc="Constructor & Initialization">
    constructor(data, options) {
        super(data, options);
        switch (data.type) {
            case ActorType_1.ActorType.Runner:
                this._implementation = new SR5Runner_1.default(this, data, options);
                break;
            case ActorType_1.ActorType.Grunt:
                this._implementation = new SR5Grunt_1.default(this, data, options);
                break;
            case ActorType_1.ActorType.Spirit:
                break;
            case ActorType_1.ActorType.Sprite:
                break;
            case ActorType_1.ActorType.Vehicle:
                break;
            case ActorType_1.ActorType.Host:
                break;
            case ActorType_1.ActorType.IC:
                break;
        }
    }
    // TODO: These can't be proxy'd because they're called in the constructor
    //  of Actor or a parent class. However, that does mean our 'real' actor
    //  also has it's data prepared in the constructor. Functionally, we might
    //  (maybe even *should*) be OK simply only forwarding preparation requests
    //  after the class has been constructed.
    /** @override */
    prepareData() {
        if (this._implementation !== undefined) {
            this._implementation.prepareData();
        }
        return super.prepareData();
    }
    /** @override */
    prepareEmbeddedEntities() {
        if (this._implementation !== undefined) {
            this._implementation.prepareEmbeddedEntities();
        }
        return super.prepareEmbeddedEntities();
    }
    // TODO: These should be OK to proxy straight up.
    /** @override */
    get itemTypes() {
        return this._implementation.itemTypes;
    }
    /** @override */
    get img() {
        return this._implementation.img;
    }
    /** @override */
    get isPC() {
        return this._implementation.isPC;
    }
    /** @override */
    get isToken() {
        return this._implementation.isToken;
    }
    /** @override */
    getActiveTokens(linked) {
        return this._implementation.getActiveTokens(linked);
    }
    /** @override */
    getTokenImages() {
        return this._implementation.getTokenImages();
    }
    /** @override */
    modifyTokenAttributes(attribute, value, isDelta, isBar) {
        return this._implementation.modifyTokenAttributes(attribute, value, isDelta, isBar);
    }
    /** @override */
    update(data, options) {
        return this._implementation.update(data, options);
    }
    /** @override */
    delete(options) {
        return this._implementation.delete(options);
    }
    /** @override */
    createEmbeddedEntity(embeddedName, createData, options) {
        return this._implementation.createEmbeddedEntity(embeddedName, createData, options);
    }
    /** @override */
    updateEmbeddedEntity(embeddedName, updateData, options) {
        return this._implementation.updateEmbeddedEntity(embeddedName, updateData, options);
    }
    /** @override */
    deleteEmbeddedEntity(embeddedName, childId, options) {
        return this._implementation.deleteEmbeddedEntity(embeddedName, childId, options);
    }
    /** @override */
    importItemFromCollection(collection, entryId) {
        return this._implementation.importItemFromCollection(collection, entryId);
    }
    /** @override */
    getOwnedItem(itemId) {
        return this._implementation.getOwnedItem(itemId);
    }
    /** @override */
    createOwnedItem(itemData, options) {
        return this._implementation.createOwnedItem(itemData, options);
    }
    /** @override */
    updateOwnedItem(itemData, options) {
        return this._implementation.updateOwnedItem(itemData, options);
    }
    /** @override */
    updateManyOwnedItems(data, options) {
        return this._implementation.updateManyOwnedItems(data, options);
    }
    /** @override */
    deleteOwnedItem(itemId, options) {
        return this._implementation.deleteOwnedItem(itemId, options);
    }
}
exports.default = SR5ActorProxy;
},{"./SR5Grunt":6,"./SR5Runner":7,"./types/ActorType":9}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SR5BaseActor extends Actor {
    // </editor-fold>
    // <editor-fold desc="Constructor & Initialization">
    constructor(proxy, data, options) {
        super(data, options);
        this.data = data;
        this.proxy = proxy;
    }
    prepareData() {
        super.prepareData();
    }
    prepareEmbeddedEntities() {
        super.prepareEmbeddedEntities();
    }
}
exports.default = SR5BaseActor;
},{}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SR5BaseActor_1 = require("./SR5BaseActor");
class SR5Grunt extends SR5BaseActor_1.default {
    // </editor-fold>
    // <editor-fold desc="Constructor & Initialization"></editor-fold>
    // <editor-fold desc="Getters & Setters"></editor-fold>
    // <editor-fold desc="Instance Methods"></editor-fold>
    prepareData() {
        super.prepareData();
    }
    prepareEmbeddedEntities() {
        super.prepareEmbeddedEntities();
    }
}
exports.default = SR5Grunt;
},{"./SR5BaseActor":5}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SR5BaseActor_1 = require("./SR5BaseActor");
class SR5Runner extends SR5BaseActor_1.default {
}
exports.default = SR5Runner;
},{"./SR5BaseActor":5}],8:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SR5BaseActorSheet extends ActorSheet {
    // <editor-fold desc="Static Properties"></editor-fold>
    // <editor-fold desc="Static Methods"></editor-fold>
    // <editor-fold desc="Properties"></editor-fold>
    // <editor-fold desc="Constructor & Initialization">
    constructor(...args) {
        super(...args);
    }
}
exports.default = SR5BaseActorSheet;
},{}],9:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorType = void 0;
var ActorType;
(function (ActorType) {
    ActorType["Runner"] = "Runner";
    ActorType["Grunt"] = "Grunt";
    ActorType["Spirit"] = "Spirit";
    ActorType["Sprite"] = "Sprite";
    ActorType["Vehicle"] = "Vehicle";
    ActorType["Host"] = "Host";
    ActorType["IC"] = "IC";
})(ActorType = exports.ActorType || (exports.ActorType = {}));
},{}],10:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SR5BaseItem_1 = require("./SR5BaseItem");
class SR5Armor extends SR5BaseItem_1.default {
}
exports.default = SR5Armor;
},{"./SR5BaseItem":11}],11:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SR5BaseItem extends Item {
    // </editor-fold>
    // <editor-fold desc="Constructor & Initialization">
    constructor(data, options) {
        super(data, options);
        console.warn(`Created a new ${this.constructor.name}`);
    }
}
exports.default = SR5BaseItem;
},{}],12:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SR5BaseItem_1 = require("./SR5BaseItem");
class SR5BaseWeapon extends SR5BaseItem_1.default {
}
exports.default = SR5BaseWeapon;
},{"./SR5BaseItem":11}],13:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ItemType_1 = require("./types/ItemType");
const SR5BaseWeapon_1 = require("./SR5BaseWeapon");
const SR5Armor_1 = require("./SR5Armor");
class SR5ItemProxy extends Item {
    // </editor-fold>
    // <editor-fold desc="Constructor & Initialization">
    constructor(data, options) {
        super(data, options);
        switch (data.type) {
            case ItemType_1.ItemType.Weapon:
                this._implementation = new SR5BaseWeapon_1.default(data, options);
                break;
            case ItemType_1.ItemType.Armor:
                this._implementation = new SR5Armor_1.default(data, options);
                break;
            case ItemType_1.ItemType.Device:
                break;
            case ItemType_1.ItemType.Program:
                break;
            case ItemType_1.ItemType.Ammunition:
                break;
        }
    }
    // </editor-fold>
    // <editor-fold desc="Getters & Setters"></editor-fold>
    // <editor-fold desc="Instance Methods">
    /** @override */
    update(data, options) {
        return this._implementation.update(data, options);
    }
}
exports.default = SR5ItemProxy;
},{"./SR5Armor":10,"./SR5BaseWeapon":12,"./types/ItemType":15}],14:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SR5BaseItemSheet extends ItemSheet {
}
exports.default = SR5BaseItemSheet;
},{}],15:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemType = void 0;
var ItemType;
(function (ItemType) {
    ItemType["Weapon"] = "Weapon";
    ItemType["Armor"] = "Armor";
    ItemType["Device"] = "Device";
    ItemType["Program"] = "Program";
    ItemType["Ammunition"] = "Ammunition";
})(ItemType = exports.ItemType || (exports.ItemType = {}));
},{}]},{},[2])

//# sourceMappingURL=bundle.js.map
