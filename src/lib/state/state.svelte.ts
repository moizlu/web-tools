import type { ToolName } from "$lib/types";
import { toolsInfo } from "$lib/types";

export class ToolState {
    public constructor() { }

    public get current() { return this._toolName; }
    public get currentInfo() { return this.current ? toolsInfo[this.current] : undefined; }
    public set current(name: ToolName | undefined) { this._toolName = name; }

    private _toolName: ToolName | undefined = $state(undefined);
};

export const toolState = new ToolState();
