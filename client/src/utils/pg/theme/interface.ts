import { StandardProperties } from "csstype";
import { ITerminalOptions as XtermOptions } from "xterm";

import { ButtonKind } from "../../../components/Button";
import { MenuKind } from "../../../components/Menu";
import { TextKind } from "../../../components/Text";
import { AllRequired, ChildRequired, NestedRequired } from "../types";

/** Playground theme */
export interface PgTheme {
  /** Whether the theme is a dark theme */
  isDark: boolean;

  /**
   * Colors of the theme.
   *
   * NOTE: Optional theme properties will be derived from the following colors
   * if they are not specified during creation.
   */
  colors: {
    /** Default colors */
    default: {
      primary: string;
      secondary: string;
      bgPrimary: string;
      bgSecondary: string;
      textPrimary: string;
      textSecondary: string;
      border: string;
    };

    /** State colors */
    state: {
      hover: StateColor;
      disabled: StateColor;
      error: StateColor;
      success: StateColor;
      warning: StateColor;
      info: StateColor;
    };
  };

  /** Default theme values */
  default?: {
    /** Default backdrop */
    backdrop?: DefaultStyles;

    /** Default border radius */
    borderRadius?: StandardProperties["borderRadius"];

    /** Default box shadow */
    boxShadow?: StandardProperties["boxShadow"];

    /** Default scrollbar */
    scrollbar?: {
      thumb: {
        color: Color;
        hoverColor: Color;
      };
    };

    /** Default transparency values as hex string(00-ff) */
    transparency?: {
      low: string;
      medium: string;
      high: string;
    };

    /** Default transition settings */
    transition?: {
      /** Timing function */
      type: StandardProperties["transitionTimingFunction"];
      /** Transition durations */
      duration: {
        [K in
          | "short"
          | "medium"
          | "long"]: StandardProperties["transitionDuration"];
      };
    };
  };

  /** Override the component defaults */
  components?: {
    /** Bottom bar component */
    bottom?: ExtendibleComponent<
      "connect" | "endpoint" | "address" | "balance"
    >;

    /** Button component */
    button?: OverrideableComponent<ButtonKind>;

    /** Editor component */
    editor?: {
      /** Editor defaults */
      default?: BgAndColor & {
        cursorColor?: Color;
        activeLine?: BgAndColor & Pick<StandardProperties, "borderColor">;
        selection?: BgAndColor;
        searchMatch?: BgAndColor & {
          selectedBg?: Bg;
          selectedColor?: Color;
        };
      } & Pick<StandardProperties, "fontFamily" | "fontSize">;

      /** Gutter component */
      gutter?: BgAndColor & {
        activeBg?: Bg;
        activeColor?: Color;
      } & Pick<StandardProperties, "borderRight">;

      /** Minimap component */
      minimap?: {
        bg?: Bg;
        selectionHighlight?: Color;
      };

      /** Peek view component */
      peekView?: {
        /** Peek view title */
        title?: {
          bg?: Bg;
          labelColor?: Color;
          descriptionColor?: Color;
        };
        /** Peek view editor */
        editor?: {
          bg?: Bg;
          matchHighlightBg?: Bg;
          gutterBg?: Bg;
        };
        /** Peek view result(right side) */
        result?: {
          bg?: Bg;
          lineColor?: Color;
          fileColor?: Color;
          selectionBg?: Bg;
          selectionColor?: Color;
          matchHighlightBg?: Bg;
        };
      } & Pick<StandardProperties, "borderColor">;

      /** Tooltip or widget component */
      tooltip?: BgAndColor & {
        selectedBg?: Bg;
        selectedColor?: Color;
      } & Pick<StandardProperties, "borderColor">;

      /** Editor wrapper component */
      wrapper?: DefaultComponent;
    };

    /** Input component */
    input?: DefaultComponent;

    /** MainView component */
    main?: ExtendibleComponent<{
      views?: {
        /** Home component */
        home?: ExtendibleComponent<{
          /** Playground title */
          title?: DefaultComponent;
          /** Resources section */
          resources?: ExtendibleComponent<{
            /** Resources title */
            title?: DefaultComponent;
            /** Resource card */
            card?: ExtendibleComponent<
              "image" | "title" | "description" | "button"
            >;
          }>;
          /** Tutorials section */
          tutorials?: ExtendibleComponent<"title" | "card">;
        }>;

        /** Tutorial component */
        tutorial?: ExtendibleComponent<"aboutPage" | "tutorialPage">;

        /** Tutorials page component */
        tutorials?: ExtendibleComponent<{
          /** Tutorial card component */
          card?: ExtendibleComponent<{
            /** Wrapper gradient */
            gradient?: DefaultComponent;
            /** Wrapper bottom section of the card */
            info?: ExtendibleComponent<"name" | "description" | "category">;
          }>;
        }>;
      };
    }>;

    /** Markdown component */
    markdown?: ExtendibleComponent<"code">;

    /** Menu component */
    menu?: OverrideableComponent<MenuKind>;

    /** Modal component */
    modal?: ExtendibleComponent<"backdrop" | "title" | "content" | "bottom">;

    /** Progress bar component */
    progressbar?: ExtendibleComponent<"indicator">;

    /** Select component */
    select?: ExtendibleComponent<
      | "control"
      | "menu"
      | "option"
      | "singleValue"
      | "input"
      | "groupHeading"
      | "dropdownIndicator"
      | "indicatorSeparator"
    >;

    /** Sidebar component */
    sidebar?: ExtendibleComponent<{
      /** Left side of the side panel(icon panel) */
      left?: ExtendibleComponent<{
        /** Left sidebar IconButton */
        iconButton?: ExtendibleComponent<"selected">;
      }>;

      /** Right side of the side panel */
      right?: ExtendibleComponent<
        "title",
        { otherBg?: Bg; initialWidth?: StandardProperties["width"] }
      >;
    }>;

    /** Skeleton component */
    skeleton?: DefaultComponent & {
      highlightColor?: Color;
    };

    /** Tabs component */
    tabs?: ExtendibleComponent<{
      tab?: ExtendibleComponent<"selected">;
    }>;

    /** Terminal component */
    terminal?: ExtendibleComponent<{
      xterm?: {
        [K in
          | "textPrimary"
          | "textSecondary"
          | "primary"
          | "secondary"
          | "success"
          | "error"
          | "warning"
          | "info"]?: Color;
      } & {
        selectionBg?: Bg;
        cursor?: {
          color?: Color;
          accentColor?: Color;
          blink?: XtermOptions["cursorBlink"];
          kind?: XtermOptions["cursorStyle"];
        };
      };
    }>;

    /** Text component */
    text?: OverrideableComponent<TextKind>;

    /** Notification toast component */
    toast?: ExtendibleComponent<"progress" | "closeButton">;

    /** Tooltip component */
    tooltip?: DefaultStyles & { bgSecondary?: Bg };

    /** Upload area component */
    uploadArea?: ExtendibleComponent<{
      /** Upload icon */
      icon?: DefaultComponent;
      /** Upload message */
      text?: ExtendibleComponent<"error" | "success">;
    }>;

    /** Wallet component */
    wallet?: ExtendibleComponent<{
      /** Top side of the wallet component */
      title?: ExtendibleComponent<"text">;
      /** Main side of the wallet component */
      main?: ExtendibleComponent<{
        /** Backdrop is made with `::after` pseudo class */
        backdrop?: DefaultStyles;
        /** Balance section */
        balance?: DefaultComponent;
        /** Send section */
        send?: ExtendibleComponent<{
          /** Send section foldable title text */
          title?: DefaultComponent;
          /** Expanded send component */
          expanded?: ExtendibleComponent<"input" | "sendButton">;
        }>;
        /** Transaction history section */
        transactions?: ExtendibleComponent<{
          /** Transactions title */
          title?: ExtendibleComponent<"text" | "refreshButton">;
          /** Transactions table */
          table?: ExtendibleComponent<{
            /** Transactions table header */
            header?: DefaultComponent;
            /** Transactions table row */
            row?: ExtendibleComponent<"signature" | "slot" | "time">;
          }>;
        }>;
      }>;
    }>;
  };

  /** Code highlight styles */
  highlight: PgHighlight;
}

/** Syntax highlighting styles */
export interface PgHighlight {
  // const x: _bool_ = true;
  typeName: HighlightToken;

  // let _x_: bool = true;
  variableName: HighlightToken;

  // _String_::new();
  namespace: HighlightToken;

  // _println!_()
  macroName: HighlightToken;

  // _myFn_()
  functionCall: HighlightToken;

  // a._to_lowercase_()
  functionDef: HighlightToken;

  // myFn(_arg_: bool)
  functionArg: HighlightToken;

  // const macro_rules struct union enum type fn impl trait let static
  definitionKeyword: HighlightToken;

  // mod use crate
  moduleKeyword: HighlightToken;

  // pub unsafe async mut extern default move
  modifier: HighlightToken;

  // for if else loop while match continue break return await
  controlKeyword: HighlightToken;

  // as in ref
  operatorKeyword: HighlightToken;

  // where crate super dyn
  keyword: HighlightToken;

  // self
  self: HighlightToken;

  // true
  bool: HighlightToken;

  // 5
  integer: HighlightToken;

  // 5.5
  literal: HighlightToken;

  // "" + b"" + r#""#
  string: HighlightToken;

  // '
  character: HighlightToken;

  // &
  operator: HighlightToken;

  // *
  derefOperator: HighlightToken;

  // Lifetime &_'a_
  specialVariable: HighlightToken;

  // Comment with //
  lineComment: HighlightToken;

  // Comment with /* */
  blockComment: HighlightToken;

  // #
  meta: HighlightToken;

  invalid: HighlightToken;

  /// Unused in Rust

  // const _x_: bool = true;
  constant: HighlightToken;

  regexp: HighlightToken;

  tagName: HighlightToken;

  attributeName: HighlightToken;

  attributeValue: HighlightToken;

  annotion: HighlightToken;
}

/** Syntax highlighting token */
type HighlightToken = Pick<StandardProperties, "color" | "fontStyle">;

/** Playground font */
export interface PgFont {
  family: NonNullable<StandardProperties["fontFamily"]>;
  size: {
    [K in "xsmall" | "small" | "medium" | "large" | "xlarge"]: NonNullable<
      StandardProperties["fontSize"]
    >;
  };
}

/** Importable(lazy) theme */
export interface ImportableTheme {
  /** Name of the theme that's displayed in theme settings */
  name: string;
  /** Import promise for the theme to lazy load */
  importTheme: () => Promise<{
    default: PgTheme;
  }>;
}

/** Components that use `DefaultComponent` type */
type DefaultComponents = "input" | "skeleton" | "tooltip";

/** Components that use `ExtendibleComponent` type */
type ExtendibleComponents =
  | "bottom"
  | "editor"
  | "main"
  | "markdown"
  | "modal"
  | "progressbar"
  | "select"
  | "sidebar"
  | "tabs"
  | "terminal"
  | "toast"
  | "uploadArea"
  | "wallet";

/** Components that use `OverrideableComponent` type */
type OverrideableComponents = "button" | "menu" | "text";

/** Theme to be used while setting the defaults internally */
export type PgThemeInternal = Partial<Pick<ImportableTheme, "name">> &
  PgTheme & {
    /** Default font */
    font?: {
      /** Code font */
      code?: PgFont;
      /** Any font other than code(e.g Markdown) */
      other?: PgFont;
    };
  };

/**
 * Ready to be used theme. Some of the optional properties will be overridden
 * with default values.
 */
export type PgThemeReady<
  T extends PgThemeInternal = PgThemeInternal,
  C extends NonNullable<T["components"]> = NonNullable<T["components"]>
> = NestedRequired<T> & {
  // Default components
  components: Pick<C, DefaultComponents>;
} & {
  // Extendible components
  components: AllRequired<Pick<C, ExtendibleComponents>>;
} & {
  // Overrideable components
  components: ChildRequired<
    Pick<C, OverrideableComponents>,
    OverrideableComponents,
    "default"
  >;
};

/** Properties that are allowed to be specified from theme objects */
type DefaultStyles = {
  bg?: Bg;
} & AnyProperty & { [key: string]: any };
// & StandardProperties
// FIXME: Using `StandardProperties` makes TypeScript extremely slow.

/** StandardProperties pseudo classes */
type PseudoClass =
  | "hover"
  | "active"
  | "focus"
  | "focusWithin"
  | "before"
  | "after";

/** Default component pseudo classes */
type DefaultComponentState<T extends PseudoClass = PseudoClass> = {
  [K in T]?: DefaultComponent;
};

/**
 * Specify any property that starts with `&`.
 *
 * NOTE: Usage of this should be avoided when possible because expressions such
 * as `& > div:nth-child(3)` will break if the layout of of the component changes
 * and TypeScript will not catch the error.
 */
type AnyProperty<T extends string = string> = {
  [K in `&${T}`]?: DefaultComponent;
};

/** Default component with pseudo classes */
export type DefaultComponent = DefaultStyles & DefaultComponentState;

/** Extendible component */
type ExtendibleComponent<
  T extends string | object,
  D = {},
  U = T extends string
    ? {
        [K in T]?: DefaultComponent;
      }
    : T
> = {
  default?: DefaultComponent & D;
} & (T extends string
  ? { [K in U extends any ? keyof U : never]?: DefaultComponent }
  : U);

/** A component with multiple kinds */
type OverrideableComponent<T extends string> = {
  /** Default StandardProperties values of the Button component */
  default?: DefaultComponent;
  /** Override the defaults with specificity */
  overrides?: {
    [K in T]?: DefaultComponent;
  };
};

/** StandardProperties background */
type Bg = string;

/** StandardProperties color */
type Color = NonNullable<StandardProperties["color"]>;

/** Optional background and color */
type BgAndColor = { bg?: Bg } & { color?: Color };

/** Required color, optional background */
type StateColor = {
  color: Color;
} & {
  bg?: Bg;
};
