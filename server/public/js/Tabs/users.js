import Tab from "./tab.js";
import UserRow from "../Components/Users/user.js";

export default class UsersTab extends Tab {
    constructor(page) {
        super(page);
    }

    render() {
        if (this.element)
            this.destroy();

        // the box
        this.element = document.createElement("div");
        this.element.className = "tab users";
        this.page.element.append(this.element);

        this.renderRows();
    }

    renderRows() {
        this.items = {};

        this.settings.forEach((user, i) => {
            const row = this.renderRow(user, i);
            this.element.append(row);
        });

        this.listeners ? this.listeners.forEach(eject => eject()) : null;
        this.listeners = [
            this.settings.on('create', (index, user) => this.updateItem(index, user)),
            this.settings.on('update', (index, user) => this.updateItem(index, user))
        ];
    }

    renderRow(user, index) {
        this.items[index] = new UserRow(user, index, this);
        return this.items[index].element;
    }

    updateItem(index, user) {
        if (!this.items[index])
            return;

        console.log(this.label, '> UPDATE ITEM', index, user);
        this.items[index].setUser(user);
    }

    get settings() {
        return this.page.settings.users;
    }

    set settings(value) {
        // do nothing
    }
}