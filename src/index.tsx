import React, { ReactNode } from 'react';
import { SandboxProvider as SandboxProviderComponent, useSandboxContext as useSandboxContextHook } from './components/sandbox';
import { LiorGameProvider as LiorGameProviderComponent, useLiorGame as useLiorGameHook } from './components/lior-game-provider';
import * as CustomUI from './components/custom_ui/index';
import SuccessAnimate from './components/utils/success-animate';

export const SandboxProvider: React.FC<{ children: ReactNode, gameState: any, desc: string }> = SandboxProviderComponent;
export const useSandboxContext: () => {
  componentRef: React.RefObject<HTMLDivElement> | null;
  sendAdminMessage?: (role: string, content: string) => Promise<void>;
} = useSandboxContextHook;

export const LiorGameProvider: React.FC<{ children: ReactNode, wsUrl?: string, gameState: any, desc: string }> = LiorGameProviderComponent;
export const useLiorGame: () => any = useLiorGameHook;

export const { 
  Button, 
  Card, 
  Slider, 
  Switch, 
  Select, 
  Accordion, 
  DropdownMenu, 
  ScrollArea, 
  Toggle, 
  ToggleGroup, 
  Progress, 
  Label 
} = CustomUI;

export const SuccessAnimation = SuccessAnimate;

export const CustomComponents = CustomUI;
