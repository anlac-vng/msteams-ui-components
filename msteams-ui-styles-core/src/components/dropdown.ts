import { baseStyle, iconTypes, iconWeights } from 'msteams-ui-icons-core';
import { classes, style } from 'typestyle';
import { chooseStyle, Context } from '../context';
import { fontSizes } from './font-sizes';
import { fontWeights } from './font-weights';

interface DropdownColors {
  mainButton: string;
  mainButtonBg: string;
  itemContainerBg: string;
  itemBg: string;
  item: string;
  itemHoverBg: string;
  itemHover: string;
  label: string;
}

function base(context: Context, colors: DropdownColors) {
  baseStyle(iconWeights.light);
  const { rem } = context;
  const sizes = fontSizes(context);
  const weights = fontWeights(context);

  const itemContainerClass = style({
    backgroundColor: colors.itemContainerBg,
    position: 'absolute',
    left: 0,
    top: '100%',
    zIndex: 1000,
    transform: 'scaleY(0)',
    transformOrigin: 'top',
    borderRadius: rem(0.3),
    display: 'inline-block',
    overflow: 'hidden',
    marginTop: rem(0.3),
  });

  return {
    container: style({
      position: 'relative',
      display: 'block',
    }),
    label: classes(style({
      padding: 0,
      margin: 0,
      border: 0,
      color: colors.label,
    }), sizes.caption, weights.regular),
    mainButton: style({
      height: rem(3.2),
      color: colors.mainButton,
      backgroundColor: colors.mainButtonBg,
      border: 0,
      padding: `${rem(0.4)} ${rem(1)} ${rem(0.4)} ${rem(1)}`,
      whiteSpace: 'nowrap',
      fontSize: rem(1.4),
      cursor: 'pointer',
      borderRadius: rem(0.3),
      width: '100%',
      textAlign: 'left',
      $nest: {
        '&:after': {
          fontFamily: 'MSTeamsIcons-Light',
          content: iconTypes.downCaret,
          position: 'absolute',
          bottom: rem(0.9),
          right: rem(0.4),
        },
      },
    }),
    itemContainer: itemContainerClass,
    itemContainerRight: style({
      $nest: {
        [`&.${itemContainerClass}`]: {
          right: 0,
          left: 'auto',
        },
      },
    }),
    showItems: style({
      $nest: {
        [`&.${itemContainerClass}`]: {
          minWidth: rem(10),
          transform: 'scaleY(1)',
          transition: 'transform 0.3s ease-in-out',
        },
      },
    }),
    item: style({
      width: '100%',
      position: 'relative',
      height: rem(3.2),
      border: 0,
      padding: `${rem(0.4)} ${rem(1)}`,
      textAlign: 'left',
      whiteSpace: 'nowrap',
      display: 'block',
      backgroundColor: colors.itemBg,
      color: colors.item,
      cursor: 'pointer',
      outline: 'none',
    }, {
        $nest: {
          '&:hover': {
            backgroundColor: colors.itemHoverBg,
            color: colors.itemHover,
          },
        },
      }),
  };
}

function light(context: Context) {
  const { colors } = context;
  return base(context, {
    mainButton: colors.light.black,
    mainButtonBg: colors.light.gray12,
    item: colors.light.black,
    itemBg: colors.light.gray12,
    itemContainerBg: colors.light.gray12,
    itemHover: colors.light.white,
    itemHoverBg: colors.light.brand00,
    label: colors.light.gray01,
  });
}

function dark(context: Context) {
  const { colors } = context;
  return base(context, {
    mainButton: colors.dark.white,
    mainButtonBg: colors.dark.black,
    itemBg: colors.dark.black,
    item: colors.dark.white,
    itemContainerBg: colors.dark.black,
    itemHover: colors.dark.white,
    itemHoverBg: colors.dark.brand00,
    label: colors.dark.white,
  });
}

function highContrast(context: Context) {
  const { colors } = context;
  return base(context, {
    mainButton: colors.white,
    mainButtonBg: colors.black,
    item: colors.white,
    itemBg: colors.black,
    itemContainerBg: colors.highContrast.yellow,
    itemHover: colors.white,
    itemHoverBg: colors.highContrast.green,
    label: colors.white,
  });
}

export function dropdown(context: Context) {
  return chooseStyle(context, light, dark, highContrast);
}