import type { ToolName } from "$lib/types"
import { z } from "zod"

export const loadSavedData = <T extends object>(name: ToolName, pageState: T, schema: z.ZodObject): T => {
    let resultState = { ...pageState };
    try {
        const savedData = localStorage.getItem(`${name}State`);
        if (savedData) {
            const validatedState = schema.parse(JSON.parse(savedData));
            resultState = validatedState as T;
        }
    } catch { /* 処理の必要がないため */ }

    return resultState;
}

export const copyExistsProps = <T extends object>(from: T, to: T) => {
    const result = { ...to };
    Object.entries(result).forEach((prop) => {
        if (prop[0] in from) {
            (result as Record<string, object>)[prop[0]] = (from as Record<string, object>)[prop[0]];
        }
    });

    return result;
}
