import { balanceAtom } from "../atoms/balance.ts";
import { useRecoilValue } from "recoil"

export const useBalance = () => {
    const value = useRecoilValue(balanceAtom)
    return value;
}