import FormItem from "../formitem.js";
import DataProxy from "../../data_proxy.js";
import GroupNavigation from "../../Tabs/group_navigation.js";

export default class StreamRow {
    constructor(index, tab) {
        this.index = index;
        this.tab = tab;
        this.page = this.tab.page;
        this.events = this.tab.events;
        this.stream = this.settings[this.index];
        this.data = new DataProxy(this.stream, this);
        this.debounceTime = 500; //ms
        this.groups = this.tab.groups;


        this.pathSettings = this.page.settings.path._.parent;
        this.options = this.pathSettings.options;
        this.fields = this.pathSettings.fields;

        this.render();
    }

    render() {
        if (this.element)
            this.destroy();

        // the box
        this.element = document.createElement("div");
        this.element.className = "path";

        // delete button
        const deleteButton = document.createElement("button");
        deleteButton.className = 'delete';
        deleteButton.innerHTML = `${this.page.icons.svg['list-minus']} Delete path`;
        deleteButton.onclick = () => this.delete();
        this.element.append(deleteButton);

        this.navigation = new GroupNavigation(this);
        this.navigation.render();

        this.groupsElement = this.renderGroup();
        this.element.append(this.groupsElement);

        return this.element;
    }

    renderGroup() {
        this.items = {};

        this.groupsElement ? this.groupsElement.remove() : null;
        const groupsElement = document.createElement("div");
        groupsElement.className = "groups";

        if (this.group.tabs) {
            this.group.tabs.forEach(tab => {
                const group = document.createElement("div");
                group.className = "group";
                group.innerHTML = `<h2>${tab.name}</h2>`;
                if (tab.fields) {
                    tab.fields.forEach(f => {
                        const item = new FormItem(this.data, f, {}, this);
                        group.append(item.element);
                        this.items[f] = item;
                    });
                }
                groupsElement.append(group);
            });

            /*this.listeners ? this.listeners.forEach(eject => eject()) : null;
            this.listeners = [
                this.settings.on('create', (prop, value) => this.updateItem(prop, value)),
                this.settings.on('update', (prop, value) => this.updateItem(prop, value))
            ];*/
        }

        return groupsElement;
    }

    /*render() {
        this.element = document.createElement("div");
        this.element.className = 'path';

        // delete button
        const deleteButton = document.createElement("button");
        deleteButton.className = 'delete';
        deleteButton.innerHTML = `${this.page.icons.svg['user-minus']} Delete user`;
        deleteButton.onclick = () => this.delete();
        this.element.append(deleteButton);

        const f1 = field('NAME', 'name');
        this.element.append(f1);

        this.pathName = document.createElement('input');
        this.pathName.value = this.data.name;
        this.pathName.type = 'text';
        this.pathName.onblur = e => this.data.name = e.target.value;
        this.pathName.onkeyup = e => e.key === 'Enter' ? this.data.name = e.target.value : null;
        f1.append(this.pathName);

        const groups = this.renderGroups();
        this.element.append(groups);

        return this.element;
    }

    renderGroups() {
        const element = document.createElement("div");
        element.className = 'groups';
        const group = this.groups.filter(g => g.slug === 'source')[0];

        group.tabs.forEach((tab) => {
            const element = document.createElement("div");
            element.className = 'groups';

            tab.fields.forEach((f) => {
                const f1 = field(splitCamelCase(f).toUpperCase());
                this.element.append(f1);
            })


        });

        return element;
    }*/
    destroy() {

    }

    delete() {
    }

    get group() {
        return this._group;
    }

    set group(val) {
        this._group = val;
        this.groupsElement = this.renderGroup();
        this.element.append(this.groupsElement);
    }

    get value() {
        return this.settings[this.index];
    }

    set value(value) {
        //
    }

    get settings() {
        return this.tab.settings;
    }

    set settings(value) {
        // do nothing
    }


    get settingsProxy() {
        return this.settings._.parent;
    }

    set settingsProxy(value) {
        // do nothing
    }
}

const field = (text, css) => {
    const element = document.createElement("div");
    element.className = `field ${css}`;
    element.append(label(text))
    return element;
}

const label = (text) => {
    const element = document.createElement("label");
    element.innerHTML = text;
    return element;
}
const splitCamelCase = (str) => {
    return str
        .replace(/([a-z])([A-Z])/g, '$1 $2')
        .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2');
}
