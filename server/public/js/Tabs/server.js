import FormItem from "../Components/formitem.js";
import ServerGroups from './server_groups.js';
import GroupNavigation from "./group_navigation.js";
import Tab from "./tab.js";

export default class ServerTab extends Tab {
    constructor(page) {
        super(page);
        this.groups = ServerGroups;
    }

    render() {
        if (this.element)
            this.destroy();

        // the box
        this.element = document.createElement("div");
        this.element.className = "tab server";
        this.page.element.append(this.element);

        this.navigation = new GroupNavigation(this);
        this.navigation.render();

        this.propListenerCreate = this.settings.on('create', (prop, value) => this.updateItem(prop, value));
        this.propListenerUpdate = this.settings.on('update', (prop, value) => this.updateItem(prop, value));

        this.renderGroup();
    }

    renderGroup() {
        this.items = {};

        this.groupsElement ? this.groupsElement.remove() : null;
        this.groupsElement = document.createElement("div");
        this.groupsElement.className = "groups";
        this.element.append(this.groupsElement);

        if (this.group.tabs) {
            this.group.tabs.forEach(tab => {
                const group = document.createElement("div");
                group.className = "group";
                group.innerHTML = `<h2>${tab.name}</h2>`;
                if (tab.fields) {
                    tab.fields.forEach(field => {
                        const item = new FormItem(this.settings, field, {}, this);
                        group.append(item.element);
                        this.items[field] = item;
                    });
                }
                this.groupsElement.append(group);
            });
        }
    }

    updateItem(prop, value) {
        if(!this.items[prop])
            return;

        this.items[prop].setValue(value);
    }

    get settings() {
        return this.page.settings[this.group.slug];
    }

    set settings(value) {
        // do nothing
    }
}
