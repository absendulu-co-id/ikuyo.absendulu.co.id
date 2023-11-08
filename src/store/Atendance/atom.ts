import { DUMMY_RECOILS } from "@/utils/recoils";
import { atom } from "recoil";

export const dataDummyRecoils = atom<string>({
    key: DUMMY_RECOILS,
    default: ''
})