import { describe, it, expect } from 'vitest';
import { findMarketByChainId, findMarketById } from './markets';

describe('markets utils', () => {
    describe('findMarketByChainId', () => {
        it('should find market by chainId', () => {
            const market = findMarketByChainId(1);
            expect(market).toBeDefined();
            expect(market?.chainId).toBe(1);
            expect(market?.name).toBe('Ethereum');
        });

        it('should return undefined for non-existent chainId', () => {
            const market = findMarketByChainId(999);
            expect(market).toBeUndefined();
        });
    });

    describe('findMarketById', () => {
        it('should find market by id', () => {
            const market = findMarketById('1');
            expect(market).toBeDefined();
            expect(market?.id).toBe('1');
            expect(market?.name).toBe('Ethereum');
        });

        it('should return undefined for non-existent id', () => {
            const market = findMarketById('999');
            expect(market).toBeUndefined();
        });
    });
}); 