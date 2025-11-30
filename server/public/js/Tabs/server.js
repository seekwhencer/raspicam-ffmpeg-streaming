import EventEmitter from '../event_emitter.js';
import FormItem from "../Components/formitem.js";
import ServerGroups from './server_groups.js';
import GroupNavigation from "./group_navigation.js";

export default class ServerTab extends EventEmitter {
    constructor(page) {
        super();
        this.page = page;
        this.groups = ServerGroups;
    }

    render() {
        if (this.element)
            this.destroy();

        this.deleteEventGroupChange = this.on('group', group => this.group = group);

        // the box
        this.element = document.createElement("div");
        this.element.className = "tab server";
        this.page.element.append(this.element);

        this.navigation = new GroupNavigation(this);
        this.navigation.render();

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
                        const item = new FormItem(this.page.settings[this.group.slug], field);
                        group.append(item.element);
                        this.items[field] = item;

                        /*this.settings.on(this.prop, (value, action) => {
                            this.item.element.value = JSON.stringify(value);
                            this.item.check();
                        });*/
                    });
                }
                this.groupsElement.append(group);
            });
        }


        /*this.settings.keys().forEach(prop => {
            const item = new FormItem(this.settings, prop);
            this.groupsElement.append(item.element);
            this.items[prop] = item;
        });*/
    }

    destroy() {
        this.deleteEventGroupChange ? this.deleteEventGroupChange() : null;
        this.items ? Object.keys(this.items).forEach(k => this.items[k].destroy()) : null;
        this.element ? this.element.remove() : null;
    }

    get settings() {
        return this.page.settings.general;
    }

    set settings(value) {
        // do nothing
    }

    get group() {
        return this._group;
    }

    set group(val) {
        this._group = val;
        this.renderGroup();
    }
}
