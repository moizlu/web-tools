import type { ClassValue } from "svelte/elements";
import type { Component } from "svelte";

export type ToolName = 'pomodoro' | 'counter';

// export const toolsInfo: Readonly<Record<ToolName, { name: string }>> = {
//     'pomodoro': { name:"ポモドーロタイマー" }
// };

export const toolsInfo: Readonly<Record<ToolName, { id: ToolName; name: string }>> = {
    'pomodoro': { id: 'pomodoro', name: "ポモドーロタイマー" },
    'counter': { id: 'pomodoro', name: "カウンター" }
};

export interface SvgComponentProps {
    size: number;
    class: ClassValue;
}

export type SvgComponent = Component<SvgComponentProps>;
