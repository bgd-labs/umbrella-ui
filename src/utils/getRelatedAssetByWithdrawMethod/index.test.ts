import { describe, it, expect } from 'vitest';
import { getRelatedAssetByWithdrawMethod, calculateSupportedWithdrawingMethods } from './index';
import { WithdrawalMethod } from '@/types/withdraw';
import { UmbrellaAssetsDictionary } from '@/types/addressesDictionary';

describe('getRelatedAssetByWithdrawMethod', () => {
    const mockAssets: UmbrellaAssetsDictionary = {
        underlying: '0x123',
        aToken: '0x456',
        stataToken: '0x789',
    };

    it('should return undefined when no assets provided', () => {
        expect(getRelatedAssetByWithdrawMethod(undefined, 'withdrawToAave')).toBeUndefined();
    });

    it('should return undefined when no method provided', () => {
        expect(getRelatedAssetByWithdrawMethod(mockAssets, undefined)).toBeUndefined();
    });

    it('should return aToken for withdrawToAave method', () => {
        expect(getRelatedAssetByWithdrawMethod(mockAssets, 'withdrawToAave')).toBe('0x456');
    });

    it('should return stataToken for withdrawToStata method', () => {
        expect(getRelatedAssetByWithdrawMethod(mockAssets, 'withdrawToStata')).toBe('0x789');
    });

    it('should return underlying for withdrawToUnderlying method', () => {
        expect(getRelatedAssetByWithdrawMethod(mockAssets, 'withdrawToUnderlying')).toBe('0x123');
    });
});

describe('calculateSupportedWithdrawingMethods', () => {
    it('should return only withdrawToUnderlying when no assets provided', () => {
        expect(calculateSupportedWithdrawingMethods(undefined)).toEqual(['withdrawToUnderlying']);
    });

    it('should return only withdrawToUnderlying when no additional tokens available', () => {
        const assets: UmbrellaAssetsDictionary = {
            underlying: '0x123',
        };
        expect(calculateSupportedWithdrawingMethods(assets)).toEqual(['withdrawToUnderlying']);
    });

    it('should include withdrawToStata when stataToken is available', () => {
        const assets: UmbrellaAssetsDictionary = {
            underlying: '0x123',
            stataToken: '0x789',
        };
        expect(calculateSupportedWithdrawingMethods(assets)).toEqual([
            'withdrawToUnderlying',
            'withdrawToStata',
        ]);
    });

    it('should include withdrawToAave when aToken is available', () => {
        const assets: UmbrellaAssetsDictionary = {
            underlying: '0x123',
            aToken: '0x456',
        };
        expect(calculateSupportedWithdrawingMethods(assets)).toEqual([
            'withdrawToUnderlying',
            'withdrawToAave',
        ]);
    });

    it('should include all methods when all tokens are available', () => {
        const assets: UmbrellaAssetsDictionary = {
            underlying: '0x123',
            aToken: '0x456',
            stataToken: '0x789',
        };
        expect(calculateSupportedWithdrawingMethods(assets)).toEqual([
            'withdrawToUnderlying',
            'withdrawToStata',
            'withdrawToAave',
        ]);
    });
}); 