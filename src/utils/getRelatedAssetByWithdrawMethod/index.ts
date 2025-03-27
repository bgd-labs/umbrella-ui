import { WithdrawalMethod } from "@/types/withdraw";
import { UmbrellaAssetsDictionary } from "@/types/addressesDictionary";

export const getRelatedAssetByWithdrawMethod = (
    relatedAssets?: UmbrellaAssetsDictionary,
    withdrawMethod?: WithdrawalMethod,
) => {
    if (!relatedAssets || !withdrawMethod) {
        return undefined;
    }
    switch (withdrawMethod) {
        case "withdrawToAave":
            return relatedAssets.aToken;
        case "withdrawToStata":
            return relatedAssets.stataToken;
        case "withdrawToUnderlying":
            return relatedAssets.underlying;
        default:
            return undefined;
    }
};

export const calculateSupportedWithdrawingMethods = (
    relatedAssets?: UmbrellaAssetsDictionary,
): WithdrawalMethod[] => {
    const supportedWithdrawingMethods: WithdrawalMethod[] = ["withdrawToUnderlying"];

    if (!relatedAssets) {
        return supportedWithdrawingMethods;
    }

    if (relatedAssets.stataToken) {
        supportedWithdrawingMethods.push("withdrawToStata");
    }

    if (relatedAssets.aToken) {
        supportedWithdrawingMethods.push("withdrawToAave");
    }

    return supportedWithdrawingMethods;
}; 