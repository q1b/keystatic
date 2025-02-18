import { useButton } from '@react-aria/button';
import { useHover } from '@react-aria/interactions';
import { filterDOMProps, mergeProps, useObjectRef } from '@react-aria/utils';
import { ForwardedRef, forwardRef, useMemo } from 'react';

import { useProviderProps } from '@keystar/ui/core';
import { useLinkComponent } from '@keystar/ui/link';
import { SlotProvider, useSlotProps } from '@keystar/ui/slots';
import { FocusRing } from '@keystar/ui/style';
import { Text } from '@keystar/ui/typography';
import { isReactText } from '@keystar/ui/utils';

import {
  ButtonElementProps,
  ButtonProps,
  CommonProps,
  LinkElementProps,
} from './types';
import { buttonClassList, useButtonStyles } from './useButtonStyles';

/**
 * Buttons are pressable elements that are used to trigger actions, their label
 * should express what action will occur when the user interacts with it.
 */
export const Button = forwardRef(function Button(
  props: ButtonProps,
  forwardedRef: ForwardedRef<HTMLAnchorElement | HTMLButtonElement>
) {
  props = useProviderProps(props);
  props = useSlotProps(props, 'button');
  const children = useButtonChildren(props);
  const domRef = useObjectRef(forwardedRef);
  // let hasLabel = useHasChild('.ksv-text', domRef);
  // let hasIcon = useHasChild('.ksv-icon', domRef);
  // let contents = hasIcon && hasLabel ? 'mixed' : hasLabel ? 'text' : 'icon';
  let contents = 'unknown';

  if ('href' in props) {
    return (
      <FocusRing autoFocus={props.autoFocus}>
        <LinkButton
          data-contents={contents}
          ref={domRef as ForwardedRef<HTMLAnchorElement>}
          {...props}
        >
          {children}
        </LinkButton>
      </FocusRing>
    );
  }

  return (
    <FocusRing autoFocus={props.autoFocus}>
      <BaseButton
        data-contents={contents}
        ref={domRef as ForwardedRef<HTMLButtonElement>}
        {...props}
      >
        {children}
      </BaseButton>
    </FocusRing>
  );
});

// Variants
// -----------------------------------------------------------------------------

/** @private Forked variant where an "href" is provided. */
const LinkButton = forwardRef(function Button(
  props: LinkElementProps,
  forwardedRef: ForwardedRef<HTMLAnchorElement>
) {
  const {
    children,
    isDisabled,
    // link specific
    download,
    href,
    hrefLang,
    ping,
    referrerPolicy,
    rel,
    target,
    ...otherProps
  } = props;

  const LinkComponent = useLinkComponent(forwardedRef);
  const domRef = useObjectRef(forwardedRef);
  const { buttonProps, isPressed } = useButton(
    { elementType: 'a', ...props },
    domRef
  );
  const { hoverProps, isHovered } = useHover({ isDisabled });
  const styleProps = useButtonStyles(props, { isHovered, isPressed });

  return (
    <LinkComponent
      {...filterDOMProps(otherProps)}
      {...mergeProps(buttonProps, hoverProps, styleProps)}
      ref={domRef}
      download={download}
      href={href}
      hrefLang={hrefLang}
      ping={ping}
      referrerPolicy={referrerPolicy}
      rel={rel}
      target={target}
    >
      {children}
    </LinkComponent>
  );
});

/** @private Forked variant where an "href" is NOT provided. */
const BaseButton = forwardRef(function Button(
  props: ButtonElementProps,
  forwardedRef: ForwardedRef<HTMLButtonElement>
) {
  const { children, isDisabled, ...otherProps } = props;

  const domRef = useObjectRef(forwardedRef);
  const { buttonProps, isPressed } = useButton(props, domRef);
  const { hoverProps, isHovered } = useHover({ isDisabled });
  const styleProps = useButtonStyles(props, { isHovered, isPressed });

  return (
    <button
      ref={domRef}
      {...styleProps}
      {...filterDOMProps(otherProps, { propNames: new Set(['form']) })}
      {...mergeProps(buttonProps, hoverProps)}
    >
      {children}
    </button>
  );
});

// Utils
// -----------------------------------------------------------------------------

export const useButtonChildren = (props: CommonProps) => {
  const { children } = props;

  // avoid unnecessary re-renders
  const slots = useMemo(() => {
    return {
      icon: {
        UNSAFE_className: buttonClassList.declare('icon'),
        strokeScaling: false, // bump up the stroke width to match the font-weight
      },
      text: {
        color: 'inherit',
        overflow: 'unset',
        trim: false,
        UNSAFE_className: buttonClassList.declare('text'),
      },
    } as const;
  }, []);

  return (
    <SlotProvider slots={slots}>
      {isReactText(children) ? <Text>{children}</Text> : children}
    </SlotProvider>
  );
};
