const { loadModule, getResourceUrl, version } = mod.getContext(import.meta);

class EnchantingActionIcon extends HTMLElement {
    constructor() {
        super();
        this._content = new DocumentFragment();
        this._content.append(getTemplateNode('enchanting-action-icon-template'));
        this.container = getElementFromFragment(this._content, 'container', 'div');
        this.image = getElementFromFragment(this._content, 'image', 'img');
        this.tooltipElem = createElement('div', {
            className: 'text-center'
        });
    }
    setCallback(callback) {
        this.container.onclick = callback;
    }
    setAction(action) {
        this.action = action;
        this.image.src = action.media;
        this.tooltipElem.textContent = action.name;
    }
}
window.customElements.define('enchanting-action-icon', EnchantingActionIcon);

class EnchantingActionIconsElement extends HTMLElement {
    constructor() {
        super();
        this.icons = [];
        this._content = new DocumentFragment();
        this._content.append(getTemplateNode('enchanting-action-icons-template'));
        this.emptyText = getElementFromFragment(this._content, 'empty-text', 'span');
    }
    connectedCallback() {
        this.appendChild(this._content);
    }
    removeIcons() {
        this.icons.forEach((elem)=>elem.remove());
        this.icons = [];
    }
    setSelected() {
        this.icons.forEach(showElement);
        hideElement(this.emptyText);
    }
    setUnselected() {
        this.icons.forEach(hideElement);
        this.emptyText.textContent = '-';
        this.emptyText.classList.remove('text-success');
        showElement(this.emptyText);
    }
    addAction(action) {
        const actionIcon = createElement('enchanting-action-icon', {
            parent: this
        });
        actionIcon.setAction(action);
        this.icons.push(actionIcon);
        return actionIcon;
    }
    addActions(actions) {
        actions.forEach((action)=>{
            const actionIcon = createElement('enchanting-action-icon', {
                parent: this
            });
            actionIcon.setAction(action);
            this.icons.push(actionIcon);
        });
    }
    setActions(actions) {
        this.removeIcons();
        this.addActions(actions);
    }
}
window.customElements.define('enchanting-action-icons', EnchantingActionIconsElement);

class EnchantingActionsBox extends HTMLElement {
    constructor() {
        super();
        this._content = new DocumentFragment();
        this._content.append(getTemplateNode('enchanting-actions-box-template'));
        this.actionIcons = getElementFromFragment(this._content, 'icons', 'enchanting-actions-icons');
    }
    connectedCallback() {
        this.appendChild(this._content);
    }
    destroyIcons() {
        this.actionIcons.removeIcons();
    }
    setSelected(action) {
        let old = this.actionIcons.icons.find(icon => icon.container.classList.contains('bg-easy-task'));
        if(old !== undefined)
            old.container.classList.remove('bg-easy-task');
        let icon = this.actionIcons.icons.find(icon => icon.action === action);
        if(icon !== undefined)
            icon.container.classList.add('bg-easy-task');
    }
    setUnselected() {
        this.actionIcons.setUnselected();
    }
    addAction(action) {
        return this.actionIcons.addAction(action);
    }
}
window.customElements.define('enchanting-actions-box', EnchantingActionsBox);

class AutoDisenchantBox extends HTMLElement {
    constructor() {
        super();
        this._content = new DocumentFragment();
        this._content.append(getTemplateNode('auto-disenchant-box-template'));
    }
    connectedCallback() {
        this.appendChild(this._content);
    }
    
    /*
    constructor(parent, containerClasses=[], enchanting) {
        this.icons = [];
        this.container = createElement('div', {
            classList: containerClasses
        });
        const nameHeader = createElement('h5', {
            classList: ['font-w600', 'font-size-sm', 'mb-1', 'text-center'],
            parent: this.container,
        });
        this.name = nameHeader;
        this.iconContainer = createElement('div', {
            classList: ['row', 'no-gutters', 'justify-content-center'],
            parent: this.container,
        });


        this.rewardsText = createElement('div', {
            classList: ['col-6', 'pt-1', 'text-center'],
            parent: this.iconContainer,
        }).appendChild(createElement('h5', {
            classList: ['font-w600', 'font-size-sm', 'mb-1', 'text-center'],
            text: 'Crafting Rewards'
        }));
        this.dropsText = createElement('div', {
            classList: ['col-6', 'pt-1', 'text-center'],
            parent: this.iconContainer,
        }).appendChild(createElement('h5', {
            classList: ['font-w600', 'font-size-sm', 'mb-1', 'text-center'],
            text: 'Non-Crafting Drops'
        }));


        this.rewardsDropdownCont = createElement('div', {
            classList: ['col-6', 'pb-1', 'text-center'],
            parent: this.iconContainer,
        });
        this.rewardsDropdown = new DropDown(this.rewardsDropdownCont, 'auto-disenchant-rewards-dropdown', ['btn-sm', 'btn-primary'], ['font-size-sm'], true, 60);
        this.dropsDropdownCont = createElement('div', {
            classList: ['col-6', 'pb-1', 'text-center'],
            parent: this.iconContainer,
        });
        this.dropsDropdown = new DropDown(this.dropsDropdownCont, 'auto-disenchant-drops-dropdown', ['btn-sm', 'btn-primary'], ['font-size-sm'], true, 60);


        this.rewardsSwitchCont = createElement('div', {
            classList: ['col-6', 'pb-1', 'text-center'],
            parent: this.iconContainer,
        });
        this.rewardsSwitch = new SettingsSwitchElement();
        this.rewardsSwitch.initialize({
            currentValue: game.enchanting.includeCommonRewards,
            name: "Include Common?"
        },
        () => {
            game.enchanting.includeCommonRewards = this.rewardsSwitch.input.checked;
        });
        this.rewardsSwitch.setAttribute('data-size', 'small');
        this.rewardsSwitchCont.append(this.rewardsSwitch);

        this.dropsSwitchCont = createElement('div', {
            classList: ['col-6', 'pb-1', 'text-center'],
            parent: this.iconContainer,
        });
        this.dropsSwitch = new SettingsSwitchElement();
        this.dropsSwitch.initialize({
            currentValue: game.enchanting.includeCommonDrops,
            name: "Include Common?"
        },
        () => {
            game.enchanting.includeCommonDrops = this.dropsSwitch.input.checked;
        });
        this.dropsSwitch.setAttribute('data-size', 'small');
        this.dropsSwitchCont.append(this.dropsSwitch);


        parent.append(this.container);
    }
    */
    show() {
        showElement(this.container);
    }
    hide() {
        hideElement(this.container);
    }
    invisible() {
        this.container.classList.add('invisible');
    }
    visible() {
        this.container.classList.remove('invisible');
    }
    setName(name) {
        this.name.textContent = name;
    }
    updateDropdowns(rewardsCallback, dropsCallback) {
        const qualities = ['None', 'Common', 'Uncommon', 'Rare', 'Epic', 'Legendary', 'Mythic'];
        this.rewardsDropdown.clearOptions();
        this.dropsDropdown.clearOptions();
        qualities.forEach((quality, i) => {
            const qualityRewardsContainer = createElement('div', {
                classList: ['row', 'gutters-tiny'],
            });
            const qualityDropsContainer = createElement('div', {
                classList: ['row', 'gutters-tiny'],
            });
            
            const qualityRewardsNameContainer = createElement('h5', {
                classList: ['font-w700', 'text-left', 'text-combat-smoke', 'm-1'],
                parent: qualityRewardsContainer
            });
            const qualityDropsNameContainer = createElement('h5', {
                classList: ['font-w700', 'text-left', 'text-combat-smoke', 'm-1'],
                parent: qualityDropsContainer
            });
            
            const qualityRewardsText = qualityRewardsNameContainer.appendChild(createElement('small', {
                classList: ['mr-2'],
                text: quality
            }));
            
            const qualityDropsText = qualityDropsNameContainer.appendChild(createElement('small', {
                classList: ['mr-2'],
                text: quality
            }));
            this.rewardsDropdown.addOption([qualityRewardsContainer], () => {
                this.rewardsDropdown.setButtonText(qualities[i]);
                rewardsCallback(i-1);
                if(i <= 1) {
                    hideElement(this.rewardsSwitch);
                } else {
                    showElement(this.rewardsSwitch);
                }
            });
            this.dropsDropdown.addOption([qualityDropsContainer], () => {
                this.dropsDropdown.setButtonText(qualities[i]);
                dropsCallback(i-1);
                if(i <= 1) {
                    hideElement(this.dropsSwitch);
                } else {
                    showElement(this.dropsSwitch);
                }
            });
        });
    }
}
window.customElements.define('auto-disenchant-box', AutoDisenchantBox);

class RerollRadioButton extends HTMLElement {
    constructor() {
        super();
        this._content = new DocumentFragment();
        this._content.append(getTemplateNode('reroll-radio-template'));
        this.label = getElementFromFragment(this._content, 'label', 'label');
        this.input = getElementFromFragment(this._content, 'input', 'input');
        const id = `reroll-radio-${RerollRadioButton.elementCount}`;
        this.input.id = id;
        this.label.htmlFor = id;
        RerollRadioButton.elementCount++;
    }
    connectedCallback() {
        this.appendChild(this._content);
    }
    initialize(data, onChange) {
        this.setChecked(data.currentValue);
        this.label.innerHTML = data.label;
        this.input.name = data.name;
        this.input.value = data.value;
        this.input.onchange = onChange;
        this.setAttribute('data-init', 'true');
    }
    setLabel(label) {
        this.label.innerHTML = label;
    }
    setChecked(isChecked) {
        this.input.checked = isChecked;
    }
    setValue(value) {
        this.input.value = value;
    }
}
RerollRadioButton.elementCount = 0;
window.customElements.define('reroll-radio', RerollRadioButton);

class RerollBox {
    constructor(parent, containerClasses=[], enchanting) {
        this.icons = [];
        this.container = createElement('div', {
            classList: containerClasses
        });
        const nameHeader = createElement('h5', {
            classList: ['font-w600', 'font-size-sm', 'mb-1', 'text-center'],
            parent: this.container,
        });
        this.name = nameHeader;
        this.iconContainer = createElement('div', {
            classList: ['row', 'no-gutters', 'justify-content-left'],
            parent: this.container,
        });
        this.resetDefault = true;

        this.rerollRadioGroup = [];

        parent.append(this.container);
    }
    show() {
        showElement(this.container);
    }
    hide() {
        hideElement(this.container);
    }
    invisible() {
        this.container.classList.add('invisible');
    }
    visible() {
        this.container.classList.remove('invisible');
    }
    setName(name) {
        this.name.textContent = name;
    }
    updateMod(item, mod, index) {
        if(mod !== undefined) {
            let mods = {};
            mods[mod._localID] = mod.value[Math.max(0, item.quality - mod.quality)];
            
            let modifierSpans = formatModifiers((desc,textClass)=>{
                textClass = `text-enchanting-quality-${item.quality}`;
                return `<span class="${textClass}">${desc}</span>`;
            }, mods, 1, 1);

            let modSpan = `<small>${modifierSpans[0]}</small>`;


            if(this.rerollRadioGroup[index] === undefined) {
                let rerollRadio = new RerollRadioButton();
                rerollRadio.classList.add('col-12');
                rerollRadio.initialize({
                    currentValue: false,
                    name: "reroll",
                    label: modSpan,
                    value: mod.id
                },
                () => {
                    rerollRadio.setChecked(true);
                    rerollRadio.input.blur();
                });
                this.iconContainer.append(rerollRadio);
                this.rerollRadioGroup[index] = rerollRadio;
            } else {
                showElement(this.rerollRadioGroup[index]);
                this.rerollRadioGroup[index].setLabel(modSpan);
                this.rerollRadioGroup[index].setValue(mod.id);
            }

            if(index === 0 && this.resetDefault === true) {
                this.rerollRadioGroup[index].setChecked(true);
                this.resetDefault = false;
            }
        } else {
            hideElement(this.rerollRadioGroup[index]);
        }
    }
    updateMods(item, resetDefault=false) {
        this.item = item;
        let mods = [];
        if(item !== undefined && item.quality !== undefined && item.extraModifiers.size > 0) {
            mods = [...item.extraModifiers];
        }
        let count = Math.max(mods.length, this.rerollRadioGroup.length);
        for(let i=0; i < count; i++) {
            this.updateMod(item, mods[i], i);
        };
    }

    getSelectedMod() {
        let selectedRadio = this.rerollRadioGroup.filter(i => i.input.checked)[0];
        if(selectedRadio !== undefined) {
            let mod = game.enchanting.mods.getObjectByID(selectedRadio.input.value);
            if(mod !== undefined)
                return mod;
        }
    }
}

class EnchantingMenu extends HTMLElement {
    constructor() {
        super();
        this.progressTimestamp = 0;
        this.progressInterval = 0;
        this._content = new DocumentFragment();
        this._content.append(getTemplateNode('enchanting-menu-template'));
        this.actions = getElementFromFragment(this._content, 'actions', 'enchanting-actions-box');

        const actions = game.enchanting.actions.allObjects.forEach(action => {
            let actionIcon = this.actions.addAction(action);
            actionIcon.setCallback(() => game.enchanting.selectActionOnClick(action))
        });

        this.autoDisenchantRow = createElement('div', {
            classList: ['row', 'row-deck', 'gutters-tiny'],
            parent: this.container
        });
        this.autoDisenchantsBlock = this.autoDisenchantRow.appendChild(createElement('div', {
            classList: ['col-12']
        })).appendChild(createElement('div', {
            classList: [...blockClasses, 'pt-2', 'pl-2', 'pr-2', 'pb-1']
        }));
        const autoDisenchantRow = createElement('div', {
            classList: ['row', 'no-gutters'],
            parent: this.autoDisenchantsBlock
        });
        this.autoDisenchantBox = new AutoDisenchantBox(autoDisenchantRow, ['col-12', 'pb-2'], game.enchanting);
        this.autoDisenchantBox.updateDropdowns((i) => { game.enchanting.autoDisenchantRewards = i; }, (i) => { game.enchanting.autoDisenchantDrops = i; });
        hideElement(this.autoDisenchantRow);

        this.nameRow = createElement('div', {
            classList: ['row', 'row-deck', 'gutters-tiny'],
            parent: this.container
        });
        this.productBlock = this.nameRow.appendChild(createElement('div', {
            classList: ['col-4']
        })).appendChild(createElement('div', {
            classList: [...blockClasses, 'text-center', 'p-3']
        }));
        this.productImage = this.productBlock.appendChild(createElement('img', {
            classList: ['bank-img-detail'],
            attributes: [['src', game.enchanting.media]],
        }));
        this.createBlock = this.nameRow.appendChild(createElement('div', {
            classList: ['col-8']
        })).appendChild(createElement('div', {
            classList: [...blockClasses, 'pt-2', 'pl-2', 'pr-2', 'pb-1']
        }));
        this.createText = this.createBlock.appendChild(createElement('h5', {
            classList: ['font-size-sm', 'font-w600', 'text-muted', 'm-1']
        })).appendChild(createElement('small'));
        this.productName = this.createBlock.appendChild(createElement('h5', {
            classList: ['font-w700', 'text-left', 'text-combat-smoke', 'm-1']
        })).appendChild(createElement('span', {
            text: '-'
        }));
        this.productDescription = this.createBlock.appendChild(createElement('h5', {
            classList: ['font-w400', 'font-size-sm', 'text-left', 'text-bank-desc', 'm-1', 'mb-2']
        })).appendChild(createElement('small'));
        this.selectedText = this.createBlock.appendChild(createElement('h5', {
            classList: ['font-w400', 'font-size-sm', 'text-left', 'text-bank-desc', 'm-1', 'mb-2']
        })).appendChild(createElement('small'));

        this.rerollRow = createElement('div', {
            classList: ['row', 'row-deck', 'gutters-tiny'],
            parent: this.container
        });
        this.rerollBlock = this.rerollRow.appendChild(createElement('div', {
            classList: ['col-12']
        })).appendChild(createElement('div', {
            classList: [...blockClasses, 'pt-2', 'pl-2', 'pr-2', 'pb-1']
        }));
        const rerollRow = createElement('div', {
            classList: ['row', 'no-gutters'],
            parent: this.rerollBlock
        });
        this.rerollBox = new RerollBox(rerollRow, ['col-12', 'pb-2'], game.enchanting);
        hideElement(this.rerollRow);

        this.ingredientsCol = createElement('div', {
            classList: [...colClasses, 'pt-2', 'pb-1', 'text-center'],
            parent: this.container,
        });

        const ingRow = createElement('div', {
            classList: ['row', 'no-gutters'],
            parent: this.ingredientsCol
        });
        this.requires = new RequiresBox(ingRow,false,boxClasses);
        this.haves = new HavesBox(ingRow,false,boxClasses);
        this.productsCol = createElement('div', {
            classList: [...colClasses, 'pt-2', 'pb-1', 'text-center'],
            parent: this.container,
        });
        const prodRow = createElement('div', {
            classList: ['row', 'no-gutters'],
            parent: this.productsCol
        });
        this.produces = new ProducesBoxElement(prodRow,false,boxClasses);
        this.productIcon = new ItemQtyIcon(this.produces.iconContainer,false,0);
        this.productIcon.hide();
        this.produces.addIcon(this.productIcon);
        this.grants = new GrantsBox(prodRow,false,boxClasses);
        this.creationCol = createElement('div', {
            classList: [...colClasses, 'p-3', 'text-center'],
            parent: this.container,
        });

        const createRow = createElement('div', {
            classList: ['row', 'justify-content-center'],
            parent: this.creationCol
        });
        this.createButton = createRow.appendChild(createElement('div')).appendChild(createElement('button', {
            classList: ['btn', 'btn-success', 'm-1', 'p-2'],
            attributes: [['type', 'button'], ['style', 'height:48px;'], ],
        }));
        this.interval = new IntervalIcon(createRow,0);
        this.progressBar = createRow.appendChild(createElement('div', {
            classList: ['col-12']
        })).appendChild(createElement('div', {
            classList: ['progress', 'active', 'mt-3'],
            attributes: [['style', 'height:5px;']]
        })).appendChild(createElement('progress-bar'));
    }
    connectedCallback() {
        this.appendChild(this._content);
        this.productIcon = this.produces.addSingleProductIcon();
    }
    localize() {
        this.createText.textContent = 'Select an Action';
        if (this.product !== undefined) {
            this.productName.textContent = this.product.name;
            this.productDescription.textContent = '';
            if (this.product.hasDescription) {
                this.productDescription.append(...$.parseHTML(this.product.description));
            }
        }
        this.selectedText.textContent = getLangString('MENU_TEXT_NONE_SELECTED');
        this.requires.localize();
        this.haves.localize();
        this.produces.localize();
        this.grants.localize();
        this.createButton.textContent = '???';
        this.interval.localize();
        this.autoDisenchantBox.setName('Auto-Disenchant');
        const qualities = ['None', 'Common', 'Uncommon', 'Rare', 'Epic', 'Legendary', 'Mythic'];
        this.autoDisenchantBox.rewardsDropdown.setButtonText(qualities[game.enchanting.autoDisenchantRewards + 1]);
        if(game.enchanting.autoDisenchantRewards <= 0) {
            hideElement(this.autoDisenchantBox.rewardsSwitch);
        } else {
            showElement(this.autoDisenchantBox.rewardsSwitch);
        }
        this.autoDisenchantBox.rewardsSwitch.input.checked = game.enchanting.includeCommonRewards;

        this.autoDisenchantBox.dropsDropdown.setButtonText(qualities[game.enchanting.autoDisenchantDrops + 1]);
        if(game.enchanting.autoDisenchantDrops <= 0) {
            hideElement(this.autoDisenchantBox.dropsSwitch);
        } else {
            showElement(this.autoDisenchantBox.dropsSwitch);
        }
        this.autoDisenchantBox.dropsSwitch.input.checked = game.enchanting.includeCommonDrops;
        this.rerollBox.setName('Select mod to reroll');
    }
    setActionCallback(callback) {
        this.createButton.onclick = () => {
            callback(),
            this.createButton.blur();
        };
    }
    setAction(action) {
        if(action !== undefined) {
            this.actions.setSelected(action);
            this.createText.textContent = action.actionText;
            this.createButton.textContent = action.name;
            if(action === game.enchanting.actions.getObjectByID('enchanting:Disenchant')) {
                showElement(this.autoDisenchantRow);
            } else {
                hideElement(this.autoDisenchantRow);
            }
            if(action === game.enchanting.actions.getObjectByID('enchanting:Reroll')) {
                showElement(this.rerollRow);
            } else {
                hideElement(this.rerollRow);
            }
        }
    }

    setSelected(item) {
        if(item !== undefined) {
            this.requires.setSelected();
            this.haves.setSelected();
            this.grants.setSelected();
            this.produces.setSelected();
            hideElement(this.selectedText);
            this.productIcon.show();
            this.rerollBox.updateMods(item);
        } else {
            this.requires.setUnselected();
            this.haves.setUnselected();
            this.grants.setUnselected();
            this.produces.setUnselected();
            showElement(this.selectedText);
            this.productIcon.hide();
            this.rerollBox.updateMods();
        }
    }
    setIngredients(items, gp, sc) {
        this.requires.setItems(items, gp, sc);
        this.haves.setItems(items, gp, sc);
    }
    setProduct(item, qty) {
        this.product = item;
        this.productImage.src = item.media;
        this.productName.textContent = item.name.replace('&apos;', "'");
        this.productDescription.innerHTML = '';
        if (item.hasDescription) {
            this.productDescription.innerHTML = item.description;
        }
        this.productIcon.setItem(item, qty);
    }
    updateQuantities() {
        this.haves.updateQuantities();
        if (this.product !== undefined) {
            const bankQty = game.bank.getQty(this.product);
        }
    }
    updateGrants(xp, baseXP, masteryXP, baseMasteryXP, poolXP) {
        this.grants.updateGrants(xp, baseXP, masteryXP, baseMasteryXP, poolXP);
    }
    updateInterval(interval) {
        this.interval.setInterval(interval);
    }
    animateProgressFromTimer(timer) {
        this.progressBar.animateProgressFromTimer(timer);
    }
    startProgressBar(interval) {
        this.progressBar.animateProgress(0, interval);
        this.progressInterval = interval;
        this.progressTimestamp = performance.now();
    }
    stopProgressBar() {
        this.progressBar.stopAnimation();
    }
    updateProgressBar() {
        const newTimestamp = performance.now();
        const timeDiff = newTimestamp - this.progressTimestamp;
        if (timeDiff < this.progressInterval) {
            this.progressBar.animateProgress(timeDiff, this.progressInterval);
            this.progressTimestamp = newTimestamp;
        } else {
            this.progressBar.stopAnimation();
        }
    }
}
window.customElements.define('enchanting-menu', EnchantingMenu);

class ItemEnchantIcon extends InfoIconElement {
    constructor() {
        super();
        this._content = new DocumentFragment();
        this._content.append(getTemplateNode('item-enchant-icon-template'));
        this.container = getElementFromFragment(this._content, 'container', 'div');
        this.itemImage = getElementFromFragment(this._content, 'item-image', 'img');
        this.quantity = getElementFromFragment(this._content, 'quantity', 'small');
        this.tooltipElem = createElement('div', {
            className: 'text-center'
        });
    }
    setItem(item, quantity, allowQuickBuy=false, altMedia=false) {
        this.quantity.textContent = numberWithCommas(quantity);
        this.itemImage.src = altMedia ? item.altMedia : item.media;
        this.itemQuantity = {
            item,
            quantity
        };
        this.tooltipElem.textContent = this.getTooltipContent();
    }
    setCallback(callback) {
        this.container.onclick = callback;
    }
    updateQty() {
        this.container.classList.toggle('bg-trader-locked', game.bank.lockedItems.has(this.item));
        this.qty = this.getCurrentQty();
        this.setText(this.qty);
    }
    getTooltipContent() {
        let desc = '';
        if(this.itemQuantity.item !== undefined && this.itemQuantity.item.hasDescription)
            desc = `<br><small class="text-info">${this.itemQuantity.item.description}</small>`;
        if(this.itemQuantity.item !== undefined && this.itemQuantity.item.specialAttacks.length > 0)
            desc += `<br><small class="text-info">${getItemSpecialAttackInformation(this.itemQuantity.item)}</small>`;
        let tt = `<div class="text-center">${this.getName()}${desc}</div>`;
        return tt;
    }
}
window.customElements.define('item-enchant-icon', ItemEnchantIcon);

class EnchantingItemSelector {
    constructor(enchanting) {
        this.parent = document.getElementById('enchanting-item-selector-container');
        this.icons = [];
    }
    show() {
        showElement(this.container);
    }
    hide() {
        hideElement(this.container);
    }
    invisible() {
        this.container.classList.add('invisible');
    }
    visible() {
        this.container.classList.remove('invisible');
    }
    setSelected(item) {
        let old = this.icons.find(icon => icon.container.classList.contains('bg-easy-task'));
        if(old !== undefined)
            old.container.classList.remove('bg-easy-task');
        let icon = this.icons.find(icon => icon.item === item);
        if(icon !== undefined)
            icon.container.classList.add('bg-easy-task');
    }
    localize() {
        this.icons.forEach((icon)=>icon.localize());
    }
    destroyIcons() {
        this.icons.forEach((icon)=>{
            icon.destroy();
        });
        this.icons = [];
    }
    
    updateQty() {
        this.icons = this.icons.filter((icon)=> {
            icon.updateQty();
            if(icon.qty <= 0) {
                icon.destroy();
                return false;
            }
            return true;
        });
    }
    updateItem(item) {
        let icon = this.icons.find(i => i.item === item);
        let qty = game.bank.getQty(item);
        if(qty > 0) {
            if(icon !== undefined) {
                icon.updateQty();
            } else {
                if(!game.enchanting.canAugmentItem(item) && !game.enchanting.isAugmentedItem(item))
                    return;
                let icon = new ItemEnchantIcon(this.parent);
                icon.setItem(item, game.bank.getQty(item));
                icon.setCallback(()=>game.enchanting.selectItemOnClick(item));
                if(item === game.enchanting.selectedItem)
                    icon.container.classList.add('bg-easy-task');
                icon.localize();
                this.icons.push(icon);
            }
        } else if (qty === 0) {
            if(icon !== undefined) {
                icon.destroy();
                this.icons.splice(this.icons.indexOf(icon), 1);
            }
        }
    }
    updateItems() {
        this.destroyIcons();
        let items = game.bank.filterItems(bankItem => {
            if(game.enchanting.canAugmentItem(bankItem.item) || game.enchanting.isAugmentedItem(bankItem.item))
                return true;
            return false;
        });
        items.forEach((item)=>{
            this.updateItem(item);
        });
        this.localize();
    }
}

class EnchantingEquipmentItem extends EquipmentItem {
    constructor({id='e' + Math.random().toString(36).slice(-5), item, quality=1, rolledMods=new Set()}, manager, game) {
        super(game.registeredNamespaces.getNamespace('enchanting'), {
            id,
            tier: 'dummyItem',
            name: '',
            category: '',
            type: '',
            media: "assets/media/main/question.svg",
            ignoreCompletion: true,
            obtainFromItemLog: false,
            golbinRaidExclusive: false,
            sellsFor: 0,
            validSlots: [],
            occupiesSlots: [],
            equipRequirements: [],
            equipmentStats: []
        }, game);
        this.manager = manager;
        this.game = game;
        this.item = item || game.emptyEquipmentItem;
        this.quality = quality;
        this.extraModifiers = rolledMods;
        this.extraSpecials = new Set();
    }
    set tier(_) { }
    get tier() {
        return this.item.tier;
    }
    set name(_) { }
    get name() {
        let q;
        switch (this.quality) {
            case 1:
                q = 'Uncommon'
                break;
            case 2:
                q = 'Rare'
                break;
            case 3:
                q = 'Epic'
                break;
            case 4:
                q = 'Legendary'
                break;
            case 5:
                q = 'Mythic'
                break;
            default:
                break;
        }
        let name = this.item.name;
        if(this.item === game.emptyEquipmentItem)
            name = "Old Modded Content"
        return `${q} ${name}`;
    }
    set category(_) { }
    get category() {
        return this.item.category;
    }
    set type(_) { }
    get type() {
        return this.item.type;
    }
    set media(_) { }
    get media() {
        return `${this.item.media}#q=${this.quality}`;
    }
    set altMedia(_) { }
    get altMedia() {
        return this.item.altMedia;
    }
    set mediaAnimation(_) { }
    get mediaAnimation() {
        return this.item.mediaAnimation;
    }
    set ignoreCompletion(_) { }
    get ignoreCompletion() {
        return true;
    }
    set obtainFromItemLog(_) { }
    get obtainFromItemLog() {
        return false;
    }
    set golbinRaidExclusive(_) { }
    get golbinRaidExclusive() {
        return this.item.golbinRaidExclusive;
    }
    set sellsFor(_) { }
    get sellsFor() {
        return this.item.sellsFor;
    }
    set validSlots(_) { }
    get validSlots() {
        if(this.item === game.emptyEquipmentItem)
            return Object.keys(equipmentSlotData);
        return this.item.validSlots;
    }
    set occupiesSlots(_) { }
    get occupiesSlots() {
        return this.item.occupiesSlots;
    }
    set equipRequirements(_) { }
    get equipRequirements() {
        return this.item.equipRequirements;
    }
    set scale(_) { }
    get scale() {
        let scale = [1, 1.1, 1.2, 1.3, 1.4, 1.5];
        return scale[this.quality];
    }
    set equipmentStats(_) { }
    get equipmentStats() {
        let stats = [...this.item.equipmentStats];
        stats = stats.map(stat => (stat.key !== 'attackSpeed' && stat.key !== 'damageReduction' ? { key: stat.key, value: Math.floor(stat.value * this.scale) } : stat));
        return stats;
    }
    set hasDescription(_) { }
    get hasDescription() {
        return this.item.hasDescription || this.modifiers !== undefined;
    }
    set description(_) { }
    get description() {
        let description = '';
        if (this.item.hasDescription)
            description = this.item.description;
        
        if(this.extraModifiers.size > 0) {
            if(description !== '')
                description += '<br>';
            let extraModifiers = {};
            this.extraModifiers.forEach(mod => {
                extraModifiers[mod._localID] = mod.value[Math.max(0, this.quality - mod.quality)];
            });
            let modifierSpans = formatModifiers((desc,textClass)=>{
                textClass = `text-enchanting-quality-${this.quality}`;
                return `<span class="${textClass}">${desc}</span>`;
            }, extraModifiers, 1, 1);
            description += joinAsLineBreakList(modifierSpans);
        }
        return description;
    }
    set modifiers(_) { }
    get modifiers() {
        let modifiers;
        if(this.item.modifiers !== undefined)
            modifiers = { ...this.item.modifiers };
        if(this.extraModifiers.size > 0) {
            if(modifiers === undefined)
                modifiers = {};
            this.extraModifiers.forEach(mod => {
                modifiers[mod._localID] = (modifiers[mod._localID] !== undefined ? modifiers[mod._localID] : 0) + mod.value[Math.max(0, this.quality - mod.quality)];
            });
        }
        return modifiers;
    }
    set enemyModifiers(_) { }
    get enemyModifiers() {
        return this.item.enemyModifiers;
    }
    set conditionalModifiers(_) { }
    get conditionalModifiers() {
        return this.item.conditionalModifiers;
    }
    set specialAttacks(_) { }
    get specialAttacks() {
        return this.item.specialAttacks;
    }
    set overrideSpecialChances(_) { }
    get overrideSpecialChances() {
        return this.item.overrideSpecialChances;
    }
    set providedRunes(_) { }
    get providedRunes() {
        return this.item.providedRunes;
    }
    set ammoType(_) { }
    get ammoType() {
        return this.item.ammoType;
    }

    encode(writer) {
        writer.writeNamespacedObject(this.item);
        writer.writeUint8(this.quality);
        writer.writeSet(this.extraModifiers, (perk, writer) => {
            writer.writeNamespacedObject(perk);
        });
    }

    decode(reader) {
        this.item = reader.getNamespacedObject(this.game.items);
        this.quality = reader.getUint8();
        if(typeof this.item === 'string') {
            this._postLoadID = this.item;
            this.item = game.emptyEquipmentItem;
        }
        this.extraModifiers = reader.getSet((reader) => {
            return reader.getNamespacedObject(game.enchanting.mods);
        });
    }
}

class EnchantingWeaponItem extends WeaponItem {
    constructor({id='w' + Math.random().toString(36).slice(-5), item, quality=1, rolledMods=new Set(), rolledSpecials=new Set()}, manager, game) {
        super(game.registeredNamespaces.getNamespace('enchanting'), {
            id,
            tier: 'dummyItem',
            name: '',
            category: '',
            type: '',
            media: "assets/media/main/question.svg",
            ignoreCompletion: true,
            obtainFromItemLog: false,
            golbinRaidExclusive: false,
            sellsFor: 0,
            validSlots: [],
            occupiesSlots: [],
            equipRequirements: [],
            equipmentStats: [],
            attackType: ''
        }, game);
        this.manager = manager;
        this.game = game;
        this.item = item || game.emptyEquipmentItem;
        this.quality = quality;
        this.extraModifiers = rolledMods;
        this.extraSpecials = rolledSpecials;
    }
    set tier(_) { }
    get tier() {
        return this.item.tier;
    }
    set name(_) { }
    get name() {
        let q;
        switch (this.quality) {
            case 1:
                q = 'Uncommon'
                break;
            case 2:
                q = 'Rare'
                break;
            case 3:
                q = 'Epic'
                break;
            case 4:
                q = 'Legendary'
                break;
            case 5:
                q = 'Mythic'
                break;
            default:
                break;
        }
        let name = this.item.name;
        if(this.item === game.emptyEquipmentItem)
            name = "Old Modded Content"
        return `${q} ${name}`;
    }
    set category(_) { }
    get category() {
        return this.item.category;
    }
    set type(_) { }
    get type() {
        return this.item.type;
    }
    set media(_) { }
    get media() {
        return `${this.item.media}#q=${this.quality}`;
    }
    set altMedia(_) { }
    get altMedia() {
        return this.item.altMedia;
    }
    set mediaAnimation(_) { }
    get mediaAnimation() {
        return this.item.mediaAnimation;
    }
    set ignoreCompletion(_) { }
    get ignoreCompletion() {
        return true;
    }
    set obtainFromItemLog(_) { }
    get obtainFromItemLog() {
        return false;
    }
    set golbinRaidExclusive(_) { }
    get golbinRaidExclusive() {
        return this.item.golbinRaidExclusive;
    }
    set sellsFor(_) { }
    get sellsFor() {
        return this.item.sellsFor;
    }
    set validSlots(_) { }
    get validSlots() {
        if(this.item === game.emptyEquipmentItem)
            return Object.keys(equipmentSlotData);
        return this.item.validSlots;
    }
    set occupiesSlots(_) { }
    get occupiesSlots() {
        return this.item.occupiesSlots;
    }
    set equipRequirements(_) { }
    get equipRequirements() {
        return this.item.equipRequirements;
    }
    set scale(_) { }
    get scale() {
        let scale = [1, 1.1, 1.2, 1.3, 1.4, 1.5];
        return scale[this.quality];
    }
    set equipmentStats(_) { }
    get equipmentStats() {
        let stats = [...this.item.equipmentStats];
        stats = stats.map(stat => (stat.key !== 'attackSpeed' && stat.key !== 'damageReduction' ? { key: stat.key, value: Math.floor(stat.value * this.scale) } : stat));
        return stats;
    }
    set attackType(_) { }
    get attackType() {
        if(this.item === game.emptyEquipmentItem)
            return 'melee';
        return this.item.attackType;
    }
    set ammoTypeRequired(_) { }
    get ammoTypeRequired() {
        return this.item.ammoTypeRequired;
    }
    set hasDescription(_) { }
    get hasDescription() {
        return this.item.hasDescription || this.modifiers !== undefined;
    }
    set description(_) { }
    get description() {
        let description = '';
        if (this.item.hasDescription)
            description = this.item.description;
        
        if(this.extraModifiers.size > 0) {
            if(description !== '')
                description += '<br>';
            let extraModifiers = {};
            this.extraModifiers.forEach(mod => {
                extraModifiers[mod._localID] = mod.value[Math.max(0, this.quality - mod.quality)];
            });
            let modifierSpans = formatModifiers((desc,textClass)=>{
                textClass = `text-enchanting-quality-${this.quality}`;
                return `<span class="${textClass}">${desc}</span>`;
            }, extraModifiers, 1, 1);
            description += joinAsLineBreakList(modifierSpans);
        }
        return description;
    }
    set modifiers(_) { }
    get modifiers() {
        let modifiers;
        if(this.item.modifiers !== undefined)
            modifiers = { ...this.item.modifiers };
        if(this.extraModifiers.size > 0) {
            if(modifiers === undefined)
                modifiers = {};
            this.extraModifiers.forEach(mod => {
                modifiers[mod._localID] = (modifiers[mod._localID] !== undefined ? modifiers[mod._localID] : 0) + mod.value[Math.max(0, this.quality - mod.quality)];
            });
        }
        return modifiers;
    }
    set enemyModifiers(_) { }
    get enemyModifiers() {
        return this.item.enemyModifiers;
    }
    set conditionalModifiers(_) { }
    get conditionalModifiers() {
        return this.item.conditionalModifiers;
    }
    set specialAttacks(_) { }
    get specialAttacks() {
        let specials = [...this.item.specialAttacks];
        if(this.extraSpecials.size > 0) {
            let extraSpecials = [...this.extraSpecials].map(special => special.specialAttacks[Math.max(0, this.quality - special.quality)]);
            specials = specials.concat(extraSpecials);
        }
        return specials;
    }
    set overrideSpecialChances(_) { }
    get overrideSpecialChances() {
        let overrideSpecialChances;
        if(this.item.overrideSpecialChances !== undefined)
            overrideSpecialChances = [...this.item.overrideSpecialChances];
        
        if(this.extraSpecials.size > 0) {
            if(overrideSpecialChances === undefined)
                overrideSpecialChances = [];

            let defaultChances = this.item.specialAttacks.map((attack, i) => {
                return overrideSpecialChances[i] || attack.defaultChance;
            });

            let extraChances = [...this.extraSpecials].map(special => {
                return special.chance[Math.max(0, this.quality - special.quality)];
            });

            //let totalDefault = defaultChances.reduce((sum, val) => sum + val, 0);

            //let totalExtra = extraChances.reduce((sum, val) => sum + val, 0);

            //if(totalDefault + totalExtra > 100) {
            //    let rescaledDefaults = defaultChances.map(chance => chance / (totalDefault / (totalDefault - totalExtra)));
            //    overrideSpecialChances = [...rescaledDefaults, ...extraChances];
            //} else {
            overrideSpecialChances = [...defaultChances, ...extraChances];
            //}
        }
        return overrideSpecialChances;
    }
    set providedRunes(_) { }
    get providedRunes() {
        return this.item.providedRunes;
    }
    set ammoType(_) { }
    get ammoType() {
        return this.item.ammoType;
    }

    encode(writer) {
        writer.writeNamespacedObject(this.item);
        writer.writeUint8(this.quality);
        writer.writeSet(this.extraModifiers, (perk, writer) => {
            writer.writeNamespacedObject(perk);
        });
        writer.writeSet(this.extraSpecials, (special, writer) => {
            writer.writeNamespacedObject(special);
        });
    }

    decode(reader) {
        this.item = reader.getNamespacedObject(game.items);
        this.quality = reader.getUint8();
        if(typeof this.item === 'string') {
            this._postLoadID = this.item;
            this.item = game.emptyEquipmentItem;
        }
        this.extraModifiers = reader.getSet((reader) => {
            return reader.getNamespacedObject(game.enchanting.mods);
        });
        this.extraSpecials = reader.getSet((reader) => {
            return reader.getNamespacedObject(game.enchanting.specials);
        });
    }
}

class EnchantingUpgradedEquipmentItemWrapper extends EquipmentItem {
    constructor(item, upgradedItem) {
        super(game.registeredNamespaces.getNamespace('enchanting'), {
            id: upgradedItem._localID + 'dummy',
            tier: 'dummyItem',
            name: '',
            category: '',
            type: '',
            media: "assets/media/main/question.svg",
            ignoreCompletion: true,
            obtainFromItemLog: false,
            golbinRaidExclusive: false,
            sellsFor: 0,
            validSlots: [],
            occupiesSlots: [],
            equipRequirements: [],
            equipmentStats: []
        }, game);
        this.item = item;
        this.upgradedItem = upgradedItem;
    }
    set tier(_) { }
    get tier() {
        return this.upgradedItem.tier;
    }
    set name(_) { }
    get name() {
        let q;
        switch (this.item.quality) {
            case 1:
                q = 'Uncommon'
                break;
            case 2:
                q = 'Rare'
                break;
            case 3:
                q = 'Epic'
                break;
            case 4:
                q = 'Legendary'
                break;
            case 5:
                q = 'Mythic'
                break;
            default:
                break;
        }
        let name = this.upgradedItem.name;
        if(this.upgradedItem === game.emptyEquipmentItem)
            name = "Old Modded Content"
        return `${q} ${name}`;
    }
    set category(_) { }
    get category() {
        return this.upgradedItem.category;
    }
    set type(_) { }
    get type() {
        return this.upgradedItem.type;
    }
    set media(_) { }
    get media() {
        return `${this.upgradedItem.media}#q=${this.item.quality}`;
    }
    set altMedia(_) { }
    get altMedia() {
        return this.upgradedItem.altMedia;
    }
    set mediaAnimation(_) { }
    get mediaAnimation() {
        return this.upgradedItem.mediaAnimation;
    }
    set ignoreCompletion(_) { }
    get ignoreCompletion() {
        return true;
    }
    set obtainFromItemLog(_) { }
    get obtainFromItemLog() {
        return false;
    }
    set golbinRaidExclusive(_) { }
    get golbinRaidExclusive() {
        return this.upgradedItem.golbinRaidExclusive;
    }
    set sellsFor(_) { }
    get sellsFor() {
        return this.upgradedItem.sellsFor;
    }
    set validSlots(_) { }
    get validSlots() {
        return this.upgradedItem.validSlots;
    }
    set occupiesSlots(_) { }
    get occupiesSlots() {
        return this.upgradedItem.occupiesSlots;
    }
    set equipRequirements(_) { }
    get equipRequirements() {
        return this.upgradedItem.equipRequirements;
    }
    set scale(_) { }
    get scale() {
        let scale = [1, 1.1, 1.2, 1.3, 1.4, 1.5];
        return scale[this.item.quality];
    }
    set equipmentStats(_) { }
    get equipmentStats() {
        let stats = [...this.upgradedItem.equipmentStats];
        stats = stats.map(stat => (stat.key !== 'attackSpeed' && stat.key !== 'damageReduction' ? { key: stat.key, value: Math.floor(stat.value * this.scale) } : stat));
        return stats;
    }
    set hasDescription(_) { }
    get hasDescription() {
        return this.upgradedItem.hasDescription;
    }
    set description(_) { }
    get description() {
        let description = '';
        if (this.upgradedItem.hasDescription)
            description = this.upgradedItem.description;
        
        if(this.item.extraModifiers.size > 0) {
            if(description !== '')
                description += '<br>';
            let extraModifiers = {};
            this.item.extraModifiers.forEach(mod => {
                extraModifiers[mod._localID] = mod.value[Math.max(0, this.item.quality - mod.quality)];
            });
            let modifierSpans = formatModifiers((desc,textClass)=>{
                textClass = `text-enchanting-quality-${this.item.quality}`;
                return `<span class="${textClass}">${desc}</span>`;
            }, extraModifiers, 1, 1);
            description += joinAsLineBreakList(modifierSpans);
        }
        return description;
    }
    set modifiers(_) { }
    get modifiers() {
        let modifiers;
        if(this.upgradedItem.modifiers !== undefined)
            modifiers = { ...this.upgradedItem.modifiers };
        if(this.item.extraModifiers.size > 0) {
            if(modifiers === undefined)
                modifiers = {};
            this.item.extraModifiers.forEach(mod => {
                modifiers[mod._localID] = (modifiers[mod._localID] !== undefined ? modifiers[mod._localID] : 0) + mod.value[Math.max(0, this.item.quality - mod.quality)];
            });
        }
        return modifiers;
    }
    set enemyModifiers(_) { }
    get enemyModifiers() {
        return this.upgradedItem.enemyModifiers;
    }
    set conditionalModifiers(_) { }
    get conditionalModifiers() {
        return this.upgradedItem.conditionalModifiers;
    }
    set specialAttacks(_) { }
    get specialAttacks() {
        return this.upgradedItem.specialAttacks;
    }
    set overrideSpecialChances(_) { }
    get overrideSpecialChances() {
        return this.upgradedItem.overrideSpecialChances;
    }
    set providedRunes(_) { }
    get providedRunes() {
        return this.upgradedItem.providedRunes;
    }
    set ammoType(_) { }
    get ammoType() {
        return this.upgradedItem.ammoType;
    }
}

class EnchantingUpgradedWeaponItemWrapper extends WeaponItem {
    constructor(item, upgradedItem) {
        super(game.registeredNamespaces.getNamespace('enchanting'), {
            id: upgradedItem._localID + 'dummy',
            tier: 'dummyItem',
            name: '',
            category: '',
            type: '',
            media: "assets/media/main/question.svg",
            ignoreCompletion: true,
            obtainFromItemLog: false,
            golbinRaidExclusive: false,
            sellsFor: 0,
            validSlots: [],
            occupiesSlots: [],
            equipRequirements: [],
            equipmentStats: [],
            attackType: ''
        }, game);
        this.item = item;
        this.upgradedItem = upgradedItem;
    }
    set tier(_) { }
    get tier() {
        return this.upgradedItem.tier;
    }
    set name(_) { }
    get name() {
        let q;
        switch (this.item.quality) {
            case 1:
                q = 'Uncommon'
                break;
            case 2:
                q = 'Rare'
                break;
            case 3:
                q = 'Epic'
                break;
            case 4:
                q = 'Legendary'
                break;
            case 5:
                q = 'Mythic'
                break;
            default:
                break;
        }
        let name = this.upgradedItem.name;
        if(this.upgradedItem === game.emptyEquipmentItem)
            name = "Old Modded Content"
        return `${q} ${name}`;
    }
    set category(_) { }
    get category() {
        return this.upgradedItem.category;
    }
    set type(_) { }
    get type() {
        return this.upgradedItem.type;
    }
    set media(_) { }
    get media() {
        return `${this.upgradedItem.media}#q=${this.item.quality}`;
    }
    set altMedia(_) { }
    get altMedia() {
        return this.upgradedItem.altMedia;
    }
    set mediaAnimation(_) { }
    get mediaAnimation() {
        return this.upgradedItem.mediaAnimation;
    }
    set ignoreCompletion(_) { }
    get ignoreCompletion() {
        return true;
    }
    set obtainFromItemLog(_) { }
    get obtainFromItemLog() {
        return false;
    }
    set golbinRaidExclusive(_) { }
    get golbinRaidExclusive() {
        return this.upgradedItem.golbinRaidExclusive;
    }
    set sellsFor(_) { }
    get sellsFor() {
        return this.upgradedItem.sellsFor;
    }
    set validSlots(_) { }
    get validSlots() {
        return this.upgradedItem.validSlots;
    }
    set occupiesSlots(_) { }
    get occupiesSlots() {
        return this.upgradedItem.occupiesSlots;
    }
    set equipRequirements(_) { }
    get equipRequirements() {
        return this.upgradedItem.equipRequirements;
    }
    set scale(_) { }
    get scale() {
        let scale = [1, 1.1, 1.2, 1.3, 1.4, 1.5];
        return scale[this.item.quality];
    }
    set equipmentStats(_) { }
    get equipmentStats() {
        let stats = [...this.upgradedItem.equipmentStats];
        stats = stats.map(stat => (stat.key !== 'attackSpeed' && stat.key !== 'damageReduction' ? { key: stat.key, value: Math.floor(stat.value * this.scale) } : stat));
        return stats;
    }
    set attackType(_) { }
    get attackType() {
        return this.upgradedItem.attackType;
    }
    set ammoTypeRequired(_) { }
    get ammoTypeRequired() {
        return this.upgradedItem.ammoTypeRequired;
    }
    set hasDescription(_) { }
    get hasDescription() {
        return this.upgradedItem.hasDescription;
    }
    set description(_) { }
    get description() {
        let description = '';
        if (this.upgradedItem.hasDescription)
            description = this.upgradedItem.description;
        
        if(this.item.extraModifiers.size > 0) {
            if(description !== '')
                description += '<br>';
            let extraModifiers = {};
            this.item.extraModifiers.forEach(mod => {
                extraModifiers[mod._localID] = mod.value[Math.max(0, this.item.quality - mod.quality)];
            });
            let modifierSpans = formatModifiers((desc,textClass)=>{
                textClass = `text-enchanting-quality-${this.item.quality}`;
                return `<span class="${textClass}">${desc}</span>`;
            }, extraModifiers, 1, 1);
            description += joinAsLineBreakList(modifierSpans);
        }
        return description;
    }
    set modifiers(_) { }
    get modifiers() {
        let modifiers;
        if(this.upgradedItem.modifiers !== undefined)
            modifiers = { ...this.upgradedItem.modifiers };
        if(this.item.extraModifiers.size > 0) {
            if(modifiers === undefined)
                modifiers = {};
            this.item.extraModifiers.forEach(mod => {
                modifiers[mod._localID] = (modifiers[mod._localID] !== undefined ? modifiers[mod._localID] : 0) + mod.value[Math.max(0, this.item.quality - mod.quality)];
            });
        }
        return modifiers;
    }
    set enemyModifiers(_) { }
    get enemyModifiers() {
        return this.upgradedItem.enemyModifiers;
    }
    set conditionalModifiers(_) { }
    get conditionalModifiers() {
        return this.upgradedItem.conditionalModifiers;
    }
    set specialAttacks(_) { }
    get specialAttacks() {
        let specials = [...this.upgradedItem.specialAttacks];
        if(this.item.extraSpecials.size > 0) {
            let extraSpecials = [...this.item.extraSpecials].map(special => special.specialAttacks[Math.max(0, this.item.quality - special.quality)]);
            specials = specials.concat(extraSpecials);
        }
        return specials;
    }
    set overrideSpecialChances(_) { }
    get overrideSpecialChances() {
        let overrideSpecialChances;
        if(this.upgradedItem.overrideSpecialChances !== undefined)
            overrideSpecialChances = [...this.upgradedItem.overrideSpecialChances];
        
        if(this.item.extraSpecials.size > 0) {
            if(overrideSpecialChances === undefined)
                overrideSpecialChances = [];

            let defaultChances = this.upgradedItem.specialAttacks.map((attack, i) => {
                return overrideSpecialChances[i] || attack.defaultChance;
            });

            let extraChances = [...this.item.extraSpecials].map(special => {
                return special.chance[Math.max(0, this.item.quality - special.quality)];
            });

            overrideSpecialChances = [...defaultChances, ...extraChances];
        }
        return overrideSpecialChances;
    }
    set providedRunes(_) { }
    get providedRunes() {
        return this.upgradedItem.providedRunes;
    }
    set ammoType(_) { }
    get ammoType() {
        return this.upgradedItem.ammoType;
    }
}

//upgradeItemOnClick
class EnchantingItemUpgrade {
    constructor(itemToUpgrade, itemUpgrade) {
        this.itemCosts = [];
        itemUpgrade.itemCosts.forEach(({ item, quantity }) => {
            if(itemToUpgrade.item === item) {
                if(quantity > 1) {
                    this.itemCosts.push({item: itemToUpgrade, quantity: 1 });
                    this.itemCosts.push({item: itemToUpgrade.item, quantity: quantity - 1 });
                } else {
                    this.itemCosts.push({item: itemToUpgrade, quantity });
                }
            } else {
                this.itemCosts.push({ item, quantity });
            }
        });
        this.gpCost = itemUpgrade.gpCost;
        this.scCost = itemUpgrade.scCost;
        this.rootItems = [];
        
        itemUpgrade.rootItems.forEach(root => {
            if(itemToUpgrade.item === root) {
                this.rootItems.push(itemToUpgrade);
            } else {
                if(!game.enchanting.isAugmentedItem(root))
                    this.rootItems.push(root);
            }
        });
        
        if(itemUpgrade.upgradedItem instanceof WeaponItem) {
            this.upgradedItem = new EnchantingUpgradedWeaponItemWrapper(itemToUpgrade, itemUpgrade.upgradedItem);
        } else if (itemUpgrade.upgradedItem instanceof EquipmentItem) {
            this.upgradedItem = new EnchantingUpgradedEquipmentItemWrapper(itemToUpgrade, itemUpgrade.upgradedItem);
        }
        this.isDowngrade = itemUpgrade.isDowngrade;
        this.upgradedQuantity = itemUpgrade.upgradedQuantity;
    }
}

class EnchantingMod extends NamespacedObject {
    constructor(namespace, data, manager, game) {
        super(namespace, data.id);
        this.manager = manager;
        this.game = game;
        this.tags = data.tags;
        this.quality = data.quality;
        this.value = data.value;
        this.level = data.level;
    }
}

class EnchantingSpecial extends NamespacedObject {
    constructor(namespace, data, manager, game) {
        super(namespace, data.id);
        this.manager = manager;
        this.game = game;
        this.tags = data.tags;
        this.quality = data.quality;
        this.chance = data.chance;
        this.level = data.level;

        this.game.queueForSoftDependencyReg(data, this);
    }

    registerSoftDependencies(data, game) {
        if (data.specialAttacks !== undefined) {
            this.specialAttacks = data.specialAttacks.map((id) => {
                const specialAttack = game.specialAttacks.getObjectByID(id);
                if (specialAttack === undefined)
                    throw new Error(`Error constructing EnchantingSpecial, specialAttack with ${id} is not registered.`);
                return specialAttack;
            });
        }
    }
}

class EnchantProduct {
    constructor(baseItem) {
        this.baseItem = baseItem;
    }

    get quality() {
        return this.baseItem.quality !== undefined ? Math.min(this.baseItem.quality + 1, 5) : 1;
    }

    get name() {
        let q;
        let name = this.baseItem.item !== undefined ? this.baseItem.item.name : this.baseItem.name;
        switch (this.quality) {
            case 1:
                q = 'Uncommon'
                break;
            case 2:
                q = 'Rare'
                break;
            case 3:
                q = 'Epic'
                break;
            case 4:
                q = 'Legendary'
                break;
            case 5:
                q = 'Mythic'
                break;
            default:
                break;
        }
        return `${q} ${name}`;
    }

    get media() {
        let media = this.baseItem.item !== undefined ? this.baseItem.item.media : this.baseItem.media;
        return `${media}#q=${this.quality}`;
    }

    get hasDescription() {
        return this.baseItem.hasDescription;
    }

    get description() {
        return this.baseItem.description;
    }
}

class EnchantingAction extends NamespacedObject {
    constructor(namespace, data, manager, game) {
        super(namespace, data.id);
        this.manager = manager;
        this.game = game;
        this.name = data.name;
        this._media = data.media;
        this.actionText = data.actionText;
        this.baseXP = data.baseXP;
        this.baseInterval = data.baseInterval;
    }
    get media() {
        return this.getMediaURL(this._media);
    }
}

const { EnchantingPageUIComponent } = await loadModule('src/components/enchanting.mjs');

class EnchantingRenderQueue extends SkillRenderQueue {
    constructor() {
        super();
        this.selectedItem = false;
        this.recipeInfo = false;
        this.quantities = false;
        this.progressBar = false;
        this.icons = new Set();
    }
}

class Enchanting extends Skill {
    constructor(namespace, game) {
        super(namespace, 'Enchanting', game);
        this.version = parseInt(version.split('.')[1]);
        this.saveVersion = -1;
        this._media = 'assets/enchanting.png';
        this.isActive = false;

        this.renderQueue = new EnchantingRenderQueue();

        this.actions = new NamespaceRegistry(this.game.registeredNamespaces);
        this.equipment = new NamespaceRegistry(this.game.registeredNamespaces);
        this.mods = new NamespaceRegistry(this.game.registeredNamespaces);
        this.specials = new NamespaceRegistry(this.game.registeredNamespaces);

        this.actionTimer = new Timer('Skill', () => this.action());
        this.shouldResetAction = false;
        this.includeCommonDrops = false;
        this.autoDisenchantDrops = -1;
        this.includeCommonRewards = false;
        this.autoDisenchantRewards = -1;

        this.dropWeights = this.generateWeights(3);
        this.totalDropWeight = this.dropWeights.reduce((sum, val) => sum + val.weight, 0);
        this.rewardWeights = this.generateWeights(5);
        this.totalRewardWeight = this.rewardWeights.reduce((sum, val) => sum + val.weight, 0);

        this.component = new EnchantingPageUIComponent();
    }

    generateWeights(base) {
        let weights = [];
        for(let i=5; i>=0; i--) {
            weights[i] = {
                weight: Math.floor(Math.pow(base, i)),
                quality: 5 - i
            }
        }
        return weights;
    }

    get name() { return "Enchanting"; }
    get isCombat() { return false; }
    get hasMinibar() { return true; }

    get activeSkills() {
        if (!this.isActive)
            return [];
        else
            return [this];
    }

    get canStop() {
        return this.isActive && !this.game.isGolbinRaid;
    }

    get canStart() {
        return !this.game.idleChecker(this);
    }

    start() {
        if (!this.canStart)
            return false;
        
        this.isActive = true;
        this.game.renderQueue.activeSkills = true;
        this.startActionTimer();
        this.game.activeAction = this;

        this.game.scheduleSave();
        return true;
    }

    stop() {
        if(!this.canStop)
            return false;
            
        this.isActive = false;
        this.actionTimer.stop();
        this.renderQueue.progressBar = true;
        this.game.renderQueue.activeSkills = true;
        this.game.clearActiveAction(false);

        this.game.scheduleSave();
        return true;
    }

    startActionTimer() {
        this.actionTimer.start(this.currentActionInterval);
        this.renderQueue.progressBar = true;
    }

    getErrorLog() {
        return `Is Active: ${this.isActive}\n`;
    }

    onLoad() {
        super.onLoad();

        if(game.currentGamemode.allowDungeonLevelCapIncrease === true)
            game.currentGamemode.startingSkills.add(game.enchanting);

        this.itemSelector.updateItems();
        this.menu.localize();
        this.menu.setActionCallback(()=>{ this.actionButtonOnClick() });
        
        this.renderQueue.selectedItem = true;
    }

    onPageChange() {
        if(this.isActive) {
            this.renderQueue.progressBar = true;
        }
        this.itemSelector.updateItems();
        this.renderQueue.quantities = true;
    }

    activeTick() {
        this.actionTimer.tick();
    }

    get maxQuality() {
        return 5;
    }

    selectActionOnClick(action) {
        if(action !== this.selectedAction && this.actionTimer.isActive && !this.stop())
            return;
        this.selectedAction = action;
        this.renderQueue.selectedItem = true;
        this.render();
    }

    get currentActionInterval() {
        return this.modifyInterval(this.currentAction.baseInterval, this.currentAction);
    }

    get currentAction() {
        if(!(this.selectedAction instanceof EnchantingAction))
            return this.actions.getObjectByID('enchanting:Enchant');
        return this.selectedAction;
    }

    selectItemOnClick(item) {
        if(item !== this.selectedItem && this.actionTimer.isActive && !this.stop())
            return;
        this.selectedItem = item;
        this.menu.rerollBox.resetDefault = true;
        this.renderQueue.selectedItem = true;
        this.render();
    }

    isCostEmpty(cost) {
        return cost.gp === 0 && cost.sc === 0 && cost.raidCoins === 0 && cost._items.size === 0;
    }

    actionButtonOnClick() {
        if(this.isActive && !this.actionTimer.isActive)
            this.stop();
        
        if(this.isActive) {
            this.stop();
        } else if(this.selectedAction !== undefined && this.selectedItem !== undefined) {
            
            if(game.bank.lockedItems.has(this.selectedItem)) {
                notifyPlayer(this, "Item is locked.", 'danger');
                return;
            }
            if(this.isCostEmpty(this.getCurrentActionCosts())) {
                notifyPlayer(this, "Can't perform this action", 'danger');
                return;
            }
            if(this.getCurrentActionCosts().checkIfOwned()) {
                if(this.currentAction === this.actions.getObjectByID('enchanting:Reroll')) {
                    if(this.executeReroll())
                        this.getCurrentActionCosts().consumeCosts();
                } else {
                    this.start();
                }
            } else {
                notifyPlayer(this, "You don't have the required materials.", 'danger');
            }
        } else {
            notifyPlayer(this, "You somehow don't have an action selected", 'danger');
        }
    }

    executeReroll() {
        let selectedItem = this.selectedItem;
        let selectedMod = this.menu.rerollBox.getSelectedMod();
        let modArr = [...this.selectedItem.extraModifiers];
        let modIdx = modArr.indexOf(selectedMod);
        if(modIdx > -1) {
            modArr[modIdx] = undefined;
            let possibleMods = this.getPossibleMods(selectedItem.item, selectedItem.quality).filter(mod => !modArr.includes(mod));
            let rolledMod = possibleMods[rollInteger(0, possibleMods.length-1)];
            modArr[modIdx] = rolledMod;
            let newMods = new Set(modArr);

            let newItem = this.createEnchantingItem(selectedItem.item, selectedItem.quality, newMods, selectedItem.extraSpecials);
            if(newItem === undefined)
                return false;
            if(game.bank.addItem(newItem, 1, true, true, false, false)) {
                game.bank.removeItemQuantity(selectedItem, 1);
                this.selectedItem = newItem;
                this.menu.rerollBox.resetDefault = false;
            }
            this.renderQueue.selectedItem = true;
            return true;
        } else {
            return false;
        }
    }

    queueBankQuantityRender(item) {
        this.renderQueue.icons.add(item);
        this.renderQueue.quantities = true;
    }

    resetActionState() {
        if (this.isActive)
            this.game.clearActionIfActiveOrPaused(this);
        this.isActive = false;
        this.actionTimer.stop();
    }

    preAction() { }
    
    action() {
        const costs = this.getCurrentActionCosts();
        if (!costs.checkIfOwned() || this.isCostEmpty(costs)) {
            notifyPlayer(this, this.noCostsMessage, 'danger');
            this.stop();
            return;
        }
        this.preAction();
        let notAllGiven = this.addCurrentActionRewards();
        costs.consumeCosts();
        this.postAction();

        const nextCosts = this.getCurrentActionCosts();
        if(notAllGiven || !nextCosts.checkIfOwned() || this.isCostEmpty(nextCosts)) {
            this.stop();
        } else {
            this.start();
        }
    }

    postAction() {
        this.renderQueue.recipeInfo = true;
        this.renderQueue.quantities = true;
    }

    get currentActionRewards() {
        const rewards = new Rewards(this.game);
        rewards.addXP(this, this.currentAction.baseXP);
        
        //this.addCommonRewards(rewards);
        return rewards;
    }

    addCurrentActionRewards() {
        if(this.selectedItem === undefined)
            return false;
        const rewards = this.currentActionRewards;
        rewards.setSource(`Skill.${this.id}`);
        
        if(this.currentAction === this.actions.getObjectByID("enchanting:Enchant")) {
            let item;
            if(this.isAugmentedItem(this.selectedItem)) {
                item = this.createEnchantingItem(this.selectedItem.item, Math.min(this.selectedItem.quality + 1, 5), this.selectedItem.extraModifiers, this.selectedItem.extraSpecials);
            } else {
                item = this.createEnchantingItem(this.selectedItem, 1);
            }
            if(item === undefined) {
                notifyPlayer(this, `Something went wrong enchanting the item.`, 'danger');
                this.stop();
                return;
            }
            rewards.addItem(item, 1);
        } else if(this.currentAction === this.actions.getObjectByID("enchanting:Disenchant")) {
            let [ item, quantity ] = this.getCurrentDisenchantProduct();
            rewards.addItem(item, quantity);
        } else {
            return false;
        }

        const notAllGiven = rewards.giveRewards();
        if(notAllGiven) {
            notifyPlayer(this, "No space", 'danger');
        }
        return notAllGiven;
    }

    getXPForAction(action, item, quality=0, isAuto=false) {
        let qualityModifier = quality + 1;
        if(quality === 0 && item.quality !== undefined)
            qualityModifier = item.quality + 1;
        let itemLevelModifier = this.getItemLevelMultiplier(item);
        let xp = this.currentAction.baseXP * qualityModifier * itemLevelModifier;
        if(isAuto && action === this.actions.getObjectByID('enchanting:Disenchant'))
            xp /= 2;
        return xp;
    }

    getFlatIntervalModifier(action) {
        return (this.game.modifiers.getSkillModifierValue('increasedSkillInterval', this) - this.game.modifiers.getSkillModifierValue('decreasedSkillInterval', this));
    }
    getPercentageIntervalModifier(action) {
        return (this.game.modifiers.getSkillModifierValue('increasedSkillIntervalPercent', this) - this.game.modifiers.getSkillModifierValue('decreasedSkillIntervalPercent', this) + this.game.modifiers.increasedGlobalSkillIntervalPercent - this.game.modifiers.decreasedGlobalSkillIntervalPercent);
    }
    modifyInterval(interval, action) {
        const flatModifier = this.getFlatIntervalModifier(action);
        const percentModifier = this.getPercentageIntervalModifier(action);
        interval *= 1 + percentModifier / 100;
        interval += flatModifier;
        interval = roundToTickInterval(interval);
        return Math.max(interval, 250);
    }

    render() {
        this.renderSelectedItem();
        super.render();
        this.renderQuantities();
        this.renderIcons();
        this.renderProgressBar();
    }

    renderIcons() {
        if(!this.renderQueue.icons.size > 0)
            return;
        this.renderQueue.icons.forEach(icon => this.itemSelector.updateItem(icon));
        this.renderQueue.icons.clear();
    }

    renderQuantities() {
        if (!this.renderQueue.quantities)
            return;
        this.menu.updateQuantities();
        this.itemSelector.updateQty();
        this.renderQueue.quantities = false;
    }

    renderSelectedItem() {
        if (!this.renderQueue.selectedItem)
            return;
        if (this.selectedAction !== undefined) {
            this.menu.setAction(this.currentAction);
        }
        if (this.selectedItem !== undefined) {
            this.itemSelector.setSelected(this.selectedItem);
            this.menu.setSelected(this.selectedItem);
            const [ product, quantity ] = this.getCurrentActionProduct();
            this.menu.setProduct(product, quantity);
            const costs = this.getCurrentActionCosts();
            this.menu.setIngredients(costs.getItemQuantityArray(), costs.gp, costs.sc);
            this.menu.updateGrants(this.modifyXP(this.getXPForAction(this.currentAction, this.selectedItem), this.currentAction), this.getXPForAction(this.currentAction, this.selectedItem), 0, 0, 0);
            this.menu.updateInterval(this.currentActionInterval);
            this.menu.grants.hideMastery();
            this.renderQueue.recipeInfo = true;
        } else {
            this.menu.setSelected();
            this.itemSelector.setSelected();
        }
        this.renderQueue.selectedItem = false;
    }

    renderProgressBar() {
        if (!this.renderQueue.progressBar)
            return;
        if (this.actionTimer.isActive) {
            this.menu.animateProgressFromTimer(this.actionTimer);
        } else {
            this.menu.stopProgressBar();
        }
        this.renderQueue.progressBar = false;
    }
    
    getCurrentActionCosts() {
        if(this.currentAction === this.actions.getObjectByID("enchanting:Enchant")) {
            return this.getCurrentEnchantCosts();
        } else if(this.currentAction === this.actions.getObjectByID("enchanting:Disenchant")) {
            return this.getCurrentDisenchantCosts();
        } else if(this.currentAction === this.actions.getObjectByID("enchanting:Reroll")) {
            return this.getCurrentRerollCosts();
        } else {
            return new Costs(this.game);
        }
    }

    getCurrentActionProduct() {
        if(this.currentAction === this.actions.getObjectByID("enchanting:Enchant")) {
            return this.getCurrentEnchantProduct();
        } else if(this.currentAction === this.actions.getObjectByID("enchanting:Disenchant")) {
            return this.getCurrentDisenchantProduct();
        } else if(this.currentAction === this.actions.getObjectByID("enchanting:Reroll")) {
            return this.getCurrentRerollProduct();
        } else {
            return [];
        }
    }

    getCurrentEnchantProduct() {
        return [new EnchantProduct(this.selectedItem), 1];
    }

    getCurrentDisenchantProduct() {
        return this.getEssenceForItem(this.selectedItem, this.selectedItem.item !== undefined ? this.selectedItem.quality : 0);
    }

    getCurrentRerollProduct() {
        return [ this.selectedItem, 1 ];
    }

    getCurrentEnchantCosts() {
        return this.getEnchantCosts(this.selectedItem);
    }
    
    getCurrentDisenchantCosts() {
        const costs = new Costs(this.game);
        if(this.selectedItem !== undefined) {
            costs.addItem(this.selectedItem, 1);
        }
        return costs;
    }

    getCurrentRerollCosts() {
        return this.getRerollCosts(this.selectedItem);
    }

    getEnchantCosts(item) {
        const costs = new Costs(this.game);
        if(item !== undefined && (item.item === undefined || item.quality < 5)) {
            costs.addItem(item, 1);
            if(item.item !== undefined && item.quality !== undefined) {
                if(item.quality === 4) {
                    costs.addItem(game.items.getObjectByID('enchanting:Legendary_Essence'), 10 * this.getItemLevelMultiplier(item));
                    costs.addItem(game.items.getObjectByID('enchanting:Mythic_Essence'), 5 * this.getItemLevelMultiplier(item));
                } else if (item.quality === 3) {
                    costs.addItem(game.items.getObjectByID('enchanting:Epic_Essence'), 15 * this.getItemLevelMultiplier(item));
                    costs.addItem(game.items.getObjectByID('enchanting:Legendary_Essence'), 10 * this.getItemLevelMultiplier(item));
                } else if (item.quality === 2) {
                    costs.addItem(game.items.getObjectByID('enchanting:Rare_Essence'), 20 * this.getItemLevelMultiplier(item));
                    costs.addItem(game.items.getObjectByID('enchanting:Epic_Essence'), 15 * this.getItemLevelMultiplier(item));
                } else if (item.quality === 1) {
                    costs.addItem(game.items.getObjectByID('enchanting:Uncommon_Essence'), 25 * this.getItemLevelMultiplier(item));
                    costs.addItem(game.items.getObjectByID('enchanting:Rare_Essence'), 20 * this.getItemLevelMultiplier(item));
                }
            } else {
                costs.addItem(game.items.getObjectByID('enchanting:Common_Essence'), 50 * this.getItemLevelMultiplier(item));
                costs.addItem(game.items.getObjectByID('enchanting:Uncommon_Essence'), 25 * this.getItemLevelMultiplier(item));
            }
        }

        return costs;
    }

    getRerollCosts(item) {
        const costs = new Costs(this.game);
        if(item !== undefined && item.item !== undefined) {
            if(item.quality === 5) {
                costs.addItem(game.items.getObjectByID('enchanting:Mythic_Essence'), 1 * this.getItemLevelMultiplier(item));
            } else if(item.quality === 4) {
                costs.addItem(game.items.getObjectByID('enchanting:Legendary_Essence'), 2 * this.getItemLevelMultiplier(item));
            } else if (item.quality === 3) {
                costs.addItem(game.items.getObjectByID('enchanting:Epic_Essence'), 5 * this.getItemLevelMultiplier(item));
            } else if (item.quality === 2) {
                costs.addItem(game.items.getObjectByID('enchanting:Rare_Essence'), 10 * this.getItemLevelMultiplier(item));
            } else if (item.quality === 1) {
                costs.addItem(game.items.getObjectByID('enchanting:Uncommon_Essence'), 25 * this.getItemLevelMultiplier(item));
            }
        }

        return costs;
    }

    getItemLevel(item) {
        let level = 1;
        if(this.isAugmentedItem(item))
            item = item.item;

        if(item.constructor === EquipmentItem || item.constructor === WeaponItem) {
            level = item.equipRequirements.reduce((highest, current) => {
                return current.type === "SkillLevel" && current.level > highest ? current.level : highest;
            }, 1);

            if(level === 1 && (item.type === "Ring" || item.type === "Amulet")) {
                let action = game.crafting.actions.find(action => action.product === item);
                if(action !== undefined)
                    level = action.level;
            }

            if(level === 1 && item.equipRequirements.filter(req => req.type === 'SkillLevel' && req.skill !== game.altMagic).length === 0) {
                if(item.sellsFor >= 150)
                    level = 10;
                if(item.sellsFor >= 10000)
                    level = 25;
                if(item.sellsFor >= 10000)
                    level = 40;
                if(item.sellsFor >= 20000)
                    level = 60;
                if(item.sellsFor >= 100000)
                    level = 70;
                if(item.sellsFor >= 300000)
                    level = 85;
                if(item.sellsFor >= 1000000)
                    level = 99;
            }
        }
        return level;
    }

    getItemLevelMultiplier(item) {
        let multiplier = 1;
        let itemLevel = this.getItemLevel(item);
        if(itemLevel >= 20)
            multiplier = 2;
        if(itemLevel >= 40)
            multiplier = 3;
        if(itemLevel >= 60)
            multiplier = 4;
        if(itemLevel >= 80)
            multiplier = 5;
        if(itemLevel >= 90)
            multiplier = 6;
        return multiplier;
    }

    getEssenceForItem(item, quality, quantity=1) {
        let essence;
        switch (quality) {
            case 5:
                essence = game.items.getObjectByID('enchanting:Mythic_Essence');
                break;
            case 4:
                essence = game.items.getObjectByID('enchanting:Legendary_Essence');
                break;
            case 3:
                essence = game.items.getObjectByID('enchanting:Epic_Essence');
                break;
            case 2:
                essence = game.items.getObjectByID('enchanting:Rare_Essence');
                break;
            case 1:
                essence = game.items.getObjectByID('enchanting:Uncommon_Essence');
                break;
            case 0:
            default:
                essence = game.items.getObjectByID('enchanting:Common_Essence');
                break;
        }
        return [ essence, this.getItemLevelMultiplier(item) * quantity ];
    }

    giveAutoDisenchantRewards(item, quality) {
        const action = this.actions.getObjectByID('enchanting:Disenchant');
        const rewards = new Rewards(this.game);
        rewards.addXP(this, this.modifyXP(this.getXPForAction(action, item, quality, true), action));

        rewards.giveRewards();
    }

    replaceRewards(item, quantity) {
        let drop = selectFromWeightedArray(this.rewardWeights, this.totalRewardWeight);
        let dropQuality = Math.min(drop.quality, this.maxQuality);
        if(dropQuality > 0) {
            if(this.autoDisenchantRewards >= dropQuality) {
                this.giveAutoDisenchantRewards(item, dropQuality);
                [ item, quantity ] = this.getEssenceForItem(item, dropQuality, quantity);
            } else {
                item = this.createEnchantingItem(item, dropQuality);
            }
        } else if (this.autoDisenchantRewards > -1 && this.includeCommonRewards) {
            this.giveAutoDisenchantRewards(item, dropQuality);
            [ item, quantity ] = this.getEssenceForItem(item, dropQuality, quantity);
        }
        return [item, quantity];
    }

    replaceDrop(item, quantity) {
        let drop = selectFromWeightedArray(this.dropWeights, this.totalDropWeight);
        let dropQuality = Math.min(drop.quality, this.maxQuality);
        if(dropQuality > 0) {
            if(this.autoDisenchantDrops >= dropQuality) {
                this.giveAutoDisenchantRewards(item, dropQuality);
                [ item, quantity ] = this.getEssenceForItem(item, dropQuality, quantity);
            } else {
                item = this.createEnchantingItem(item, dropQuality);
            }
        } else if (this.autoDisenchantDrops > -1 && this.includeCommonDrops) {
            this.giveAutoDisenchantRewards(item, dropQuality);
            [ item, quantity ] = this.getEssenceForItem(item, dropQuality, quantity);
        }
        return { item, quantity };
    }

    makeUpgrades(item) {
        // Create Downgrade to base item
        let downgrade = new ItemUpgrade({
            itemCosts: [{
                id: item.id,
                quantity: 1
            }],
            gpCost: 0,
            scCost: 0,
            rootItemIDs: [item.id],
            upgradedItemID: item.item.id,
            isDowngrade: true,
            upgradedQuantity: 1
        }, game);

        // Add Downgrade
        downgrade.rootItems.forEach((root)=>{
            let upgradeArray = game.bank.itemUpgrades.get(root);
            if (upgradeArray === undefined) {
                upgradeArray = [];
                game.bank.itemUpgrades.set(root, upgradeArray);
            }
            upgradeArray.push(downgrade);
        });

        // Add Quality versions of Upgrades
        let itemUpgrades = game.bank.itemUpgrades.get(item.item);
        if(itemUpgrades !== undefined && itemUpgrades.length > 0) {
            itemUpgrades.forEach(itemUpgrade => {
                if(itemUpgrade.constructor !== EnchantingItemUpgrade) {
                    let upgrade = new EnchantingItemUpgrade(item, itemUpgrade);
                    upgrade.rootItems.forEach((root)=>{
                        let upgradeArray = game.bank.itemUpgrades.get(root);
                        if (upgradeArray === undefined) {
                            upgradeArray = [];
                            game.bank.itemUpgrades.set(root, upgradeArray);
                        }
                        upgradeArray.push(upgrade);
                    });
                }
            });
        }

        if(game.softDataRegQueue.length > 0) {
            game.softDataRegQueue.forEach(([data,object])=>object.registerSoftDependencies(data, game));
            game.softDataRegQueue = [];
        }
    }

    handleMissingObject(namespacedID) {
        let [ namespace, id ] = namespacedID.split(':');
        if(this.equipment.getObject(namespace, id) !== undefined)
            return this.equipment.getObject(namespace, id);
        
        let obj;
        switch (id[0]) {
            case "w":
                obj = new EnchantingWeaponItem({id}, this, this.game);
                break;
            case "e":
                obj = new EnchantingEquipmentItem({id}, this, this.game);
                break;
            default:
                break;
        }
        if(obj !== undefined) {
            this.equipment.registerObject(obj);
            this.game.items.registerObject(obj);
        }
        return obj;
    }

    specialCount(item, quality) {
        let counts = [0, 0, 0, 0, 0, 0];
        if(item.constructor === WeaponItem)
            counts = [0, 0, 1, 1, 2, 2];
        return counts[quality];
    }

    modCount(item, quality) {
        let counts = [0, 1, 2, 2, 3, 4];
        if(item.constructor === WeaponItem)
            counts = [0, 1, 1, 2, 2, 3];
        return counts[quality];
    }

    matchTags(item, tags) {
        for(let tag of tags) {
            switch (tag) {
                case 'melee':
                    if(item.equipRequirements.find((req) => req.type === 'SkillLevel' && [game.attack, game.strength, game.defense].includes(req.skill)) === undefined)
                        return false;
                    break;
                case 'ranged':
                    if(item.equipRequirements.find((req) => req.type === 'SkillLevel' && req.skill === game.ranged) === undefined)
                        return false;
                    break;
                case 'magic':
                    if(item.equipRequirements.find((req) => req.type === 'SkillLevel' && req.skill === game.altMagic) === undefined)
                        return false;
                    break;
                case 'armour':
                    if(item.constructor !== EquipmentItem)
                        return false;
                    break;
                case 'weapon':
                    if(item.constructor !== WeaponItem)
                        return false;
                    break;
                default:
                    break;
            }
        }
        return true;
    }

    getPossibleMods(item, quality) {
        return this.mods.filter(mod => this.level >= mod.level && quality >= mod.quality && this.matchTags(item, mod.tags));
    }

    rollMods(item, quality, rolledMods=new Set()) {
        let possibleMods = this.getPossibleMods(item, quality);
        let modCount = this.modCount(item, quality);
        while(rolledMods.size < modCount) {
            let rolledMod = possibleMods[rollInteger(0, possibleMods.length-1)];
            rolledMods.add(rolledMod);
        }
        return rolledMods;
    }

    getPossibleSpecials(item, quality) {
        return this.specials.filter(special => this.level >= special.level && quality >= special.quality && this.matchTags(item, special.tags));
    }

    rollSpecials(item, quality, rolledSpecials=new Set()) {
        let possibleSpecials = this.getPossibleSpecials(item, quality);
        let specialCount = this.specialCount(item, quality);
        while(rolledSpecials.size < specialCount) {
            let rolledSpecial = possibleSpecials[rollInteger(0, possibleSpecials.length-1)];
            rolledSpecials.add(rolledSpecial);
        }
        return rolledSpecials;
    }

    compareSets(set1, set2) {
        if(set1 === set2) return true;
        if(set1.size !== set2.size) return false;
        for (const value of set1) if (!set2.has(value)) return false;
        return true;
    }

    getExistingMelcraftItem(item, quality, rolledMods, rolledSpecials) {
        return this.equipment.find(equipment => {
            return  equipment.item === item &&
                    equipment.quality === quality &&
                    this.compareSets(rolledMods, equipment.extraModifiers) &&
                    (rolledSpecials === undefined || this.compareSets(rolledSpecials, equipment.extraSpecials));
        });
    }
    
    createEnchantingWeapon(item, quality=1, rolledMods=new Set(), rolledSpecials=new Set()) {
        if(!(item.constructor === WeaponItem))
            return item;
        rolledMods = this.rollMods(item, quality, rolledMods);
        rolledSpecials = this.rollSpecials(item, quality, rolledSpecials);
        let augmentedItem = this.getExistingMelcraftItem(item, quality, rolledMods, rolledSpecials);
        if(augmentedItem === undefined) {
            augmentedItem = new EnchantingWeaponItem({item, quality, rolledMods, rolledSpecials}, this, this.game);
            this.equipment.registerObject(augmentedItem);
            this.game.items.registerObject(augmentedItem);
            console.log("Created Weapon:", augmentedItem.id, augmentedItem.name);
            this.makeUpgrades(augmentedItem);
        }
        return augmentedItem;
    }

    createEnchantingArmour(item, quality=1, rolledMods=new Set()) {
        if(item.constructor !== EquipmentItem)
            return item;
        rolledMods = this.rollMods(item, quality, rolledMods);
        let augmentedItem = this.getExistingMelcraftItem(item, quality, rolledMods);
        if(augmentedItem === undefined) {
            augmentedItem = new EnchantingEquipmentItem({item, quality, rolledMods}, this, this.game);
            this.equipment.registerObject(augmentedItem);
            this.game.items.registerObject(augmentedItem);
            console.log("Created Armour:", augmentedItem.id, augmentedItem.name);
            this.makeUpgrades(augmentedItem);
        }
        return augmentedItem;
    }

    createEnchantingItem(item, quality=rollInteger(1, 5), rolledMods=new Set(), rolledSpecials=new Set()) {
        if(!this.canAugmentItem(item))
            return item;
        if(item.constructor === WeaponItem) {
            return this.createEnchantingWeapon(item, quality, rolledMods, rolledSpecials);
        } else if (item.constructor === EquipmentItem) {
            return this.createEnchantingArmour(item, quality, rolledMods);
        }
    }

    canAugmentItem(item) {
        const bannedSlots = ['Consumable', 'Summon1', 'Summon2', 'Gem', 'Quiver'];
        return (item.constructor === EquipmentItem || item.constructor === WeaponItem) && item !== game.emptyEquipmentItem && !item.validSlots.some(slot => bannedSlots.includes(slot))
    }

    isAugmentedItem(item) {
        return item.constructor === EnchantingEquipmentItem || item.constructor === EnchantingWeaponItem;
    }

    isAugmentedWeapon(item) {
        return item.constructor === EnchantingWeaponItem;
    }

    isAugmentedArmour(item) {
        return item.constructor === EnchantingEquipmentItem;
    }

    checkForItem(item) {
        const isItemOrProxied = (check) => (check === item || (check.item !== undefined && isItemOrProxied(check.item)));

        let isInCombatLoot = game.combat.loot.drops.filter(item => isItemOrProxied(item)).length > 0;
        let isInBank = this.game.bank.filterItems((bankItem) => isItemOrProxied(bankItem.item)).length > 0;
        let isInEquipment = this.game.combat.player.equipmentSets.some(({equipment})=> equipment.slotArray.some(slot => isItemOrProxied(slot.item)));
        return isInBank || isInEquipment || isInCombatLoot;
    }

    removeEnchantingItem(item) {
        if(!(item.constructor === EnchantingEquipmentItem || item.constructor === EnchantingWeaponItem))
            return;
        if(this.checkForItem(item))
            return;
        this.game.stats.Items.statsMap.delete(item);
        this.game.bank.glowingItems.delete(item);
        this.game.bank.lockedItems.delete(item);
        let sortIdx = this.game.bank.customSortOrder.indexOf(item);
        if(sortIdx > -1)
            this.game.bank.customSortOrder.splice(this.game.bank.customSortOrder.indexOf(item), 1);
        console.log("Removed Augmented Item:", item.id, item.name);
        this.equipment.registeredObjects.delete(item.id);
    }
    
    onCharacterLoaded() {
        this.equipment.filter(item => item._postLoadID !== undefined).forEach(item => {
            let itemID = item._postLoadID;
            delete item._postLoadID;
            console.log(`Looking for ${itemID}`);
            let postLoadItem = this.game.items.getObjectByID(itemID);
            if(postLoadItem !== undefined) {
                console.log(`Found ${postLoadItem.id}`)
                item.item = postLoadItem;
                let itemIcon = bankTabMenu.itemIcons.get(item)
                if(itemIcon !== undefined)
                    itemIcon.image.src = item.media;
                this.game.combat.player.renderQueue.equipment = true;
            } else {
                console.log(`Found nothing`);
                this.removeEnchantingItem(item);
            }
        });
        this.equipment.filter(item => item.item === game.emptyEquipmentItem || !this.checkForItem(item)).forEach(item => {
            console.log(`Empty Item ${item.id}`)
            this.removeEnchantingItem(item);
        });
        this.equipment.forEach(item => {
            if(item.occupiesSlots.length > 0) {
                game.combat.player.equipmentSets.forEach(({equipment}) => {
                    equipment.slotArray.forEach(slot => {
                        if(slot.item === item && slot.occupiedBy === 'None') {
                            slot.setEquipped(item, slot.quantity, item.occupiesSlots);
                            item.occupiesSlots.forEach((slotType)=>equipment.slots[slotType].setOccupied(item, slot.type));
                            this.game.combat.player.renderQueue.equipment = true;
                        }
                    });
                })
            }
            this.makeUpgrades(item);
        })
        game.combat.player.computeAllStats();
    }

    onInterfaceAvailable() {

    }

    initMenus() {
        this.menu = new EnchantingMenu();
        this.itemSelector = new EnchantingItemSelector();
    }

    registerData(namespace, data) {
        console.log("Invention registerData");
        super.registerData(namespace, data); // pets, rareDrops, minibar, customMilestones

        console.log("Loading Mods");
        data.mods.forEach(data => {
            let mod = new EnchantingMod(namespace, data, this, this.game);
            this.mods.registerObject(mod);
        });
        console.log("Loading Specials");
        data.specials.forEach(data => {
            let special = new EnchantingSpecial(namespace, data, this, this.game);
            this.specials.registerObject(special);
        });
        console.log("Loading Actions");
        data.actions.forEach(data => {
            let action = new EnchantingAction(namespace, data, this, this.game);
            this.actions.registerObject(action);
        });
    }

    encode(writer) {
        let start = writer.byteOffset;
        super.encode(writer); // Encode default skill data
        writer.writeUint32(this.version);
        writer.writeArray(this.equipment.allObjects.filter((item) => this.checkForItem(item)), (value, writer) => {
            writer.writeNamespacedObject(value);
            value.encode(writer);
        });
        this.actionTimer.encode(writer);
        writer.writeBoolean(this.selectedItem !== undefined);
        if (this.selectedItem !== undefined)
            writer.writeNamespacedObject(this.selectedItem);
        writer.writeNamespacedObject(this.currentAction);
        writer.writeBoolean(this.includeCommonDrops);
        writer.writeInt8(this.autoDisenchantDrops);
        writer.writeBoolean(this.includeCommonRewards);
        writer.writeInt8(this.autoDisenchantRewards);
        let end = writer.byteOffset;
        console.log(`Wrote ${end-start} bytes for Enchanting save`);
        return writer;
    }

    decode(reader, version) {
        console.log("Enchanting save decoding");
        let start = reader.byteOffset;
        reader.byteOffset -= Uint32Array.BYTES_PER_ELEMENT; // Let's back up a minute and get the size of our skill data
        let skillDataSize = reader.getUint32();

        try {
            super.decode(reader, version);
            this.saveVersion = reader.getUint32();
            
            console.log("Decoding Equipment");
            reader.getArray((reader) => {
                let value = reader.getNamespacedObject(this.equipment);
                console.log(`Got ${value.id}, decoding`);
                value.decode(reader);
                return value;
            });

            if(game.softDataRegQueue.length > 0) {
                game.softDataRegQueue.forEach(([data,object])=>object.registerSoftDependencies(data, game));
                game.softDataRegQueue = [];
            }

            this.actionTimer.decode(reader, version);
            if (reader.getBoolean()) {
                const selectedItem = reader.getNamespacedObject(this.game.items);
                if (typeof selectedItem === 'string' || (selectedItem.item !== undefined && selectedItem.item === game.emptyEquipmentItem))
                    this.shouldResetAction = true;
                else
                    this.selectedItem = selectedItem;
            }
            this.selectedAction = reader.getNamespacedObject(this.actions);
            this.includeCommonDrops = reader.getBoolean();
            this.autoDisenchantDrops = reader.getInt8();
            this.includeCommonRewards = reader.getBoolean();
            this.autoDisenchantRewards = reader.getInt8();
        } catch(e) { // Something's fucky, dump all progress and skip past the trash save data
            console.log(e);
            reader.byteOffset = start;
            reader.getFixedLengthBuffer(skillDataSize);
            this.shouldResetAction = true;
        }
        if (this.shouldResetAction)
            this.resetActionState();

        let end = reader.byteOffset;
        console.log(`Read ${end-start} bytes for Enchanting save`);
    }
}

export { Enchanting, EnchantingUpgradedWeaponItemWrapper, EnchantingUpgradedEquipmentItemWrapper, EnchantingItemUpgrade }