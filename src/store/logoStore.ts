import { create } from 'zustand';

export interface LogoConfig {
  leftText: string;
  rightText: string;
  fontSize: number;
  fontWeight: 'normal' | 'bold' | 'bolder';
  fontFamily: string;
  leftTextColor: string;
  rightTextColor: string;
  backgroundColor: string;
  overallBackgroundColor: string;
  logoSize: {
    width: number;
    height: number;
  };
  borderRadius: number;
  spacing: number;
  transparentBackground: boolean;
}

export interface LogoStore {
  config: LogoConfig;
  history: LogoConfig[];
  historyIndex: number;
  updateConfig: (updates: Partial<LogoConfig>) => void;
  resetConfig: () => void;
  undo: () => void;
  redo: () => void;
  canUndo: () => boolean;
  canRedo: () => boolean;
}

const defaultConfig: LogoConfig = {
  leftText: 'Pro',
  rightText: 'Hub',
  fontSize: 48,
  fontWeight: 'bold',
  fontFamily: 'Arial, sans-serif',
  leftTextColor: '#FFFFFF',
  rightTextColor: '#000000',
  backgroundColor: '#FF8C00',
  overallBackgroundColor: '#000000',
  logoSize: {
    width: 256,
    height: 256,
  },
  borderRadius: 8,
  spacing: 4,
  transparentBackground: false,
};

export const useLogoStore = create<LogoStore>((set, get) => ({
  config: defaultConfig,
  history: [defaultConfig],
  historyIndex: 0,

  updateConfig: (updates) => {
    const currentConfig = get().config;
    const newConfig = { ...currentConfig, ...updates };
    const history = get().history.slice(0, get().historyIndex + 1);
    
    set({
      config: newConfig,
      history: [...history, newConfig],
      historyIndex: history.length,
    });
  },

  resetConfig: () => {
    const history = get().history;
    set({
      config: defaultConfig,
      history: [...history, defaultConfig],
      historyIndex: history.length,
    });
  },

  undo: () => {
    const { historyIndex, history } = get();
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      set({
        config: history[newIndex],
        historyIndex: newIndex,
      });
    }
  },

  redo: () => {
    const { historyIndex, history } = get();
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      set({
        config: history[newIndex],
        historyIndex: newIndex,
      });
    }
  },

  canUndo: () => get().historyIndex > 0,
  canRedo: () => get().historyIndex < get().history.length - 1,
}));
