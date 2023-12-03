export default class difference {
    constructor(oldOfficer, newOfficer, items) {
        this.oldOfficer = document.querySelector(oldOfficer);
        this.newOfficer = document.querySelector(newOfficer);
        this.oldItems = this.oldOfficer.querySelectorAll(items)
        this.newItems = this.newOfficer.querySelectorAll(items)
        this.items = items;
        this.oldCounter = 0;
        this.newCounter = 0;
    }

    bindTriggers(container, items, couter) {
        container.querySelector('.plus').addEventListener('click', () => {
            if (couter !==  items.length - 2) {
                 items[couter].style.display = 'flex';
                couter++;
            } else {
                 items[couter].style.display = 'flex';
                 items[items.length - 1].remove();
            }
        });
    }

    hideItems(items) {
        items.forEach((item, i, arr) => {
            if (i !== arr.length - 1) {
                item.style.display = 'none';
            }   
        });
    }
  

    init() {
        this.hideItems(this.oldItems);
        this.hideItems(this.newItems);
        this.bindTriggers(this.oldOfficer, this.oldItems, this.oldCounter);
        this.bindTriggers(this.newOfficer, this.newItems, this.newCounter);
    }
}