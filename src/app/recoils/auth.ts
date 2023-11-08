import { TOKEN_AUTH } from "@/utils/recoils";
import { atom, selector } from "recoil";

export const tokenAuthAtom = atom({
    key: 'tokenAuthAtom',
    default: ''
});
