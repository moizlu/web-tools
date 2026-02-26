import type { ClassValue } from "svelte/elements";
import type { Component } from "svelte";

export type ToolName = 'pomodoro' | 'counter' | 'clock';

// export const toolsInfo: Readonly<Record<ToolName, { name: string }>> = {
//     'pomodoro': { name:"ポモドーロタイマー" }
// };

export const toolsInfo: Readonly<Record<ToolName, { id: ToolName; name: string }>> = {
    'pomodoro': { id: 'pomodoro', name: "ポモドーロタイマー" },
    'counter': { id: 'pomodoro', name: "カウンター" },
    'clock': { id: 'clock', name: "時計" }
};

export interface SvgComponentProps {
    size: number;
    class: ClassValue;
}

export type SvgComponent = Component<SvgComponentProps>;
