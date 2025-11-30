import EventEmitter from "../event_emitter.js";

export default class GroupNavigation extends EventEmitter {
    constructor(tab) {
        super();
        this.tab = tab;
        this.page = this.tab.page;
        this.groups = this.tab.groups;

        this.on('select', () => {
            window.history.pushState({}, "", `#${this.page.tabNavigation.tab.slug}/${this.selected}`);
            this.buttons.forEach(b => b.classList.remove("active"));
            this.buttons.filter(b => b.slug === this.selected)[0].classList.add("active");
            this.tab.emit('group', this.group);
            this.page.emit('group', this.group);
        });

    }

    render() {
        this.element = document.createElement("div");
        this.element.className = "group-navigation";
        this.tab.element.append(this.element);

        this.buttons = [];
        this.groups.forEach(group => {
            const button = document.createElement("button");
            button.setAttribute("type", "button");
            button.innerHTML = group.icon ? `${this.icons.svg[group.icon]}${group.name}` : group.name;
            button.slug = group.slug; // custom prop
            button.onclick = () => this.selected = group.slug;
            this.element.append(button);
            this.buttons.push(button);
        });

        // open the first group
        if (!this.selected)
            this.selected = 'general';

    }

    get selected() {
        return this._selected;
    }

    set selected(val) {
        this._selected = val;
        this.emit('select', this.group);
    }

    get group() {
        return this.groups.filter(group => group.slug === this.selected)[0];
    }

    set group(val) {
        //
    }

    get icons() {
        return this.page.icons;
    }

    set icons(val) {
        //
    }
}