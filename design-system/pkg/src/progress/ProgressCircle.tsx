import { useProgressBar } from '@react-aria/progress';
import { clamp } from '@react-aria/utils';
import { warning } from 'emery';
import { ForwardedRef, forwardRef } from 'react';

import {
  classNames,
  css,
  keyframes,
  tokenSchema,
  transition,
  useStyleProps,
} from '@keystar/ui/style';
import { toDataAttributes } from '@keystar/ui/utils';

import { ProgressCircleProps } from './types';

/**
 * Progress circles show the progression of a system operation such as
 * downloading, uploading, processing, etc. in a visual way. They can represent
 * determinate or indeterminate progress.
 */
export const ProgressCircle = forwardRef(function ProgressCircle(
  props: ProgressCircleProps,
  forwardRef: ForwardedRef<HTMLDivElement>
) {
  let {
    value = 0,
    minValue = 0,
    maxValue = 100,
    size = 'medium',
    isIndeterminate,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledby,
    ...otherProps
  } = props;

  value = clamp(value, minValue, maxValue);
  let { progressBarProps } = useProgressBar({ ...props, value });
  let styleProps = useStyleProps(otherProps);

  warning(
    !!(ariaLabel || ariaLabelledby),
    'ProgressCircle requires an aria-label or aria-labelledby attribute for accessibility.'
  );

  return (
    <div
      {...styleProps}
      {...progressBarProps}
      ref={forwardRef}
      {...toDataAttributes({
        indeterminate: isIndeterminate ?? undefined,
        size: size === 'medium' ? undefined : size,
      })}
      className={classNames(
        css({
          height: 'var(--diameter)',
          width: 'var(--diameter)',

          '--PI': 3.14159,

          '--diameter': tokenSchema.size.element.regular,
          '--radius': 'calc(var(--diameter) / 2)',
          '--stroke-width': tokenSchema.size.scale[40], // TODO: component tokent
          '--offset-radius': 'calc(var(--radius) - var(--stroke-width) / 2)',
          '--circumference': `calc(var(--offset-radius) * var(--PI) * 2)`,

          ['&[data-size=small]']: {
            '--diameter': tokenSchema.size.element.xsmall,
            '--stroke-width': tokenSchema.size.border.medium,
          },
          ['&[data-size=large]']: {
            '--diameter': tokenSchema.size.element.xlarge,
            '--stroke-width': tokenSchema.size.border.large,
          },
        }),
        styleProps.className
      )}
      style={{
        // @ts-ignore
        '--percent': (value - minValue) / (maxValue - minValue),
        ...styleProps.style,
      }}
    >
      <svg
        role="presentation"
        tabIndex={-1}
        className={css({ height: 'var(--diameter)', width: 'var(--diameter)' })}
      >
        {/* track */}
        <circle
          className={circle({
            stroke: tokenSchema.color.border.muted,
          })}
        />

        {/* fill */}
        <circle
          {...toDataAttributes({ indeterminate: isIndeterminate ?? undefined })}
          className={circle({
            stroke: tokenSchema.color.background.accentEmphasis,
            strokeDasharray: 'var(--circumference)',
            strokeLinecap: 'round',

            transition: transition('stroke-dashoffset', {
              duration: 'regular',
            }),
            transform: 'rotate(-90deg)',
            transformOrigin: '50% 50%',

            '&[data-indeterminate]': {
              animation: `${indeterminateAnimation} ${tokenSchema.animation.duration.xlong} ${tokenSchema.animation.easing.easeInOut} infinite`,
            },
          })}
          style={{
            strokeDashoffset: `calc(var(--circumference) - var(--percent) * var(--circumference))`,
          }}
        />
      </svg>
    </div>
  );
});

// Utils
// -----------------------------------------------------------------------------

function circle(styles: Parameters<typeof css>[0]) {
  return css([
    {
      cx: 'var(--radius)',
      cy: 'var(--radius)',
      r: 'var(--offset-radius)',
      fill: 'transparent',
      strokeWidth: 'var(--stroke-width)',
    },
    styles,
  ]);
}

const indeterminateAnimation = keyframes({
  from: {
    transform: 'rotate(0deg)',
    strokeDashoffset: 'var(--circumference)',
  },
  to: {
    transform: 'rotate(360deg)',
    strokeDashoffset: 'calc(var(--circumference) * -1)',
  },
});
