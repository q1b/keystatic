import { AriaModalOverlayProps, AriaPopoverProps } from '@react-aria/overlays';
import { OverlayTriggerState } from '@react-stately/overlays';
import { OverlayProps } from '@react-types/overlays';
import { HTMLAttributes, ReactNode } from 'react';

import { BaseStyleProps } from '@voussoir/style';

export type BlanketProps = {
  isOpen?: boolean;
  isTransparent?: boolean;
} & HTMLAttributes<HTMLDivElement>;

// Popover
// -----------------------------------------------------------------------------

export type PopoverProps = Omit<
  AriaPopoverProps,
  'popoverRef' | 'maxHeight'
> & {
  children: ReactNode;
  hideArrow?: boolean;
  state: OverlayTriggerState;
} & BaseStyleProps;

// Modal
// -----------------------------------------------------------------------------

export type ModalProps = {
  children: ReactNode;
  state: OverlayTriggerState;
  type?: 'modal' | 'fullscreen';
} & AriaModalOverlayProps &
  BaseStyleProps &
  OverlayProps;

// Tray
// -----------------------------------------------------------------------------

export type TrayProps = {
  children: ReactNode;
  state: OverlayTriggerState;
  isFixedHeight?: boolean;
} & AriaModalOverlayProps &
  BaseStyleProps &
  OverlayProps;