import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeToggleButton } from './ThemeToggleButton';
import { useTheme } from 'next-themes';

vi.mock('next-themes', () => ({
    useTheme: vi.fn(),
}));

vi.mock('../../../public/images/sun.svg', () => ({
    default: () => <div data-testid="sun-icon" />,
}));

vi.mock('../../../public/images/moon.svg', () => ({
    default: () => <div data-testid="moon-icon" />,
}));

const mockedUseTheme = vi.mocked(useTheme, { partial: true });

describe('ThemeToggleButton', () => {
    const mockSetTheme = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();

        mockedUseTheme.mockReturnValue({
            setTheme: mockSetTheme,
        });
    });

    it('renders both light and dark mode buttons', () => {
        render(<ThemeToggleButton />);

        const buttons = screen.getAllByRole('button');
        expect(buttons).toHaveLength(2);
    });

    it('calls setTheme with "dark" when clicking sun icon', async () => {
        render(<ThemeToggleButton />);

        const sunButton = screen.getAllByRole('button')[0];
        await userEvent.click(sunButton);

        expect(mockSetTheme).toHaveBeenCalledWith('dark');
    });

    it('calls setTheme with "light" when clicking moon icon', async () => {
        render(<ThemeToggleButton />);

        const moonButton = screen.getAllByRole('button')[1];
        await userEvent.click(moonButton);

        expect(mockSetTheme).toHaveBeenCalledWith('light');
    });

    it('applies correct classes for visibility', () => {
        render(<ThemeToggleButton />);

        const sunButton = screen.getAllByRole('button')[0];
        const moonButton = screen.getAllByRole('button')[1];

        expect(sunButton).toHaveClass('dark:hidden');
        expect(moonButton).toHaveClass('hidden', 'dark:block');
    });
}); 