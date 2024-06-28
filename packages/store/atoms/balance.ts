import { atom, useRecoilValue } from "recoil"

export const balanceAtom = atom<number>({
    key: "balance",
    default: 0
});