export class ToolBarButton {
    name: string;
    onClick: Function;

    constructor(name: string, onClick: Function) {
        this.name = name;
        this.onClick = onClick;
    }
}
