import React, { ReactNode } from 'react';

import './app/globals.css';

import { 
  SandboxProvider as SandboxProviderComponent, 
  useSandboxContext as useSandboxContextHook 
} from './components/sandbox';
import { 
  LiorGameProvider as LiorGameProviderComponent, 
  useLiorGame as useLiorGameHook 
} from './components/lior-game-provider';
import * as CustomUI from './components/custom_ui/index';
import { SuccessAnimation as SuccessAnimationComponent } from './components/utils/success-animate';

export const SandboxProvider = (
  props: { children: ReactNode, gameState: any, desc: string }
) => <SandboxProviderComponent {...props} />;

export const useSandboxContext = () => {
  const context = useSandboxContextHook();
  return {
    ...context,
    sendAdminMessage: context.sendAdminMessage || (async (role: string, content: string) => {
      console.warn('sendAdminMessage not implemented');
    })
  };
};

export const LiorGameProvider = (
  props: { children: ReactNode, wsUrl: string, gameState: any, desc: string }
) => <LiorGameProviderComponent {...props} />;

export const useLiorGame = () => useLiorGameHook();

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

export const CustomComponents = CustomUI;
export const SuccessAnimation = SuccessAnimationComponent;