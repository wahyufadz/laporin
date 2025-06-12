import 'dotenv/config'
import { get } from "@vercel/edge-config";

export const getEdgeConfig = async (key: string) => {
    const value = await get(key);
    if (!value) {
        throw new Error(`Edge config key ${key} not found`);
    }
    return value;
}
