/**
 * TypeScript type definitions mirroring the backend schema.
 * See: custom_components/nspanel_lovelace_editor/schema.py and const.py
 */

// --- HA types ---

export interface HomeAssistant {
  states: Record<string, any>;
  callWS: (msg: Record<string, any>) => Promise<any>;
  connection: any;
  language: string;
  themes: any;
}

// --- Constants ---

export const CARD_TYPES = [
  "cardEntities",
  "cardGrid",
  "cardThermo",
  "cardMedia",
  "cardAlarm",
  "cardQR",
  "cardPower",
] as const;

export type CardType = (typeof CARD_TYPES)[number];

export const MODELS = ["eu", "us-l", "us-p"] as const;
export type Model = (typeof MODELS)[number];

export const UPDATE_MODES = ["auto", "auto-notify", "manual"] as const;
export type UpdateMode = (typeof UPDATE_MODES)[number];

export const BACKGROUND_COLORS = ["ha-dark", "black"] as const;
export type BackgroundColor = (typeof BACKGROUND_COLORS)[number];

export const SCREENSAVER_TYPES = ["screensaver", "screensaver2"] as const;

export const CLIMATE_MODES = [
  "off", "heat", "cool", "auto", "dry", "fan_only",
] as const;

export const ALARM_MODES = [
  "arm_home", "arm_away", "arm_night", "arm_vacation", "arm_custom_bypass",
] as const;

export const LOCALES: [string, string][] = [
  ["af_ZA", "Afrikaans"],
  ["ar_SY", "Arabic"],
  ["bg_BG", "Bulgarian"],
  ["ca_ES", "Catalan"],
  ["cs_CZ", "Czech"],
  ["da_DK", "Danish"],
  ["de_DE", "German"],
  ["el_GR", "Greek"],
  ["en_US", "English"],
  ["es_ES", "Spanish"],
  ["et_EE", "Estonian"],
  ["fa_IR", "Persian"],
  ["fi_FI", "Finnish"],
  ["fr_FR", "French"],
  ["he_IL", "Hebrew"],
  ["hr_xx", "Croatian"],
  ["hu_HU", "Hungarian"],
  ["hy_AM", "Armenian"],
  ["id_ID", "Indonesian"],
  ["is_IS", "Icelandic"],
  ["it_IT", "Italian"],
  ["lb_xx", "Luxembourgish"],
  ["lt_LT", "Lithuanian"],
  ["lv_LV", "Latvian"],
  ["nb_NO", "Norwegian"],
  ["nl_NL", "Dutch"],
  ["nn_NO", "Norwegian Nynorsk"],
  ["pl_PL", "Polish"],
  ["pt_PT", "Portuguese"],
  ["ro_RO", "Romanian"],
  ["ru_RU", "Russian"],
  ["sk_SK", "Slovak"],
  ["sl_SI", "Slovenian"],
  ["sv_SE", "Swedish"],
  ["th_TH", "Thai"],
  ["tr_TR", "Turkish"],
  ["uk_UA", "Ukrainian"],
  ["vi_VN", "Vietnamese"],
  ["zh_CN", "Simplified Chinese"],
  ["zh_TW", "Traditional Chinese"],
];

export const ENTITY_DOMAINS_CARD_ENTITIES = [
  "cover", "switch", "input_boolean", "binary_sensor", "sensor", "button",
  "number", "input_number", "scene", "script", "input_button", "light",
  "input_text", "input_select", "lock", "fan", "automation",
  "alarm_control_panel", "sun", "person", "climate",
];

export const ENTITY_DOMAINS_CARD_QR = [
  "switch", "input_boolean", "binary_sensor", "sensor", "button",
  "scene", "script", "input_button", "input_select", "light",
  "input_text", "lock", "automation",
];

// --- Entity config ---

export interface EntityConfig {
  entity: string;
  name?: string;
  value?: string;
  icon?: string | Record<string, string>;
  color?: number[] | Record<string, number[] | string> | string;
  speed?: number | string;
  state?: string;
  state_not?: string;
  state_template?: string;
  status?: string;
  assumed_state?: string;
  action_name?: string;
  font?: "small" | "medium-icon" | "medium";
  effectList?: string;
  data?: Record<string, any>;
  [key: string]: any;
}

// --- Card configs ---

interface CardBase {
  type: CardType;
  title?: string;
  key?: string;
}

export interface CardEntitiesConfig extends CardBase {
  type: "cardEntities";
  entities: EntityConfig[];
  navItem1?: EntityConfig;
  navItem2?: EntityConfig;
}

export interface CardGridConfig extends CardBase {
  type: "cardGrid";
  entities: EntityConfig[];
  navItem1?: EntityConfig;
  navItem2?: EntityConfig;
}

export interface CardThermoConfig extends CardBase {
  type: "cardThermo";
  entity: string;
  temperatureUnit?: "celsius" | "fahrenheit";
  supportedModes?: string[];
}

export interface CardMediaConfig extends CardBase {
  type: "cardMedia";
  entity: string;
  entities?: EntityConfig[];
  status?: string;
}

export interface CardAlarmConfig extends CardBase {
  type: "cardAlarm";
  entity: string;
  alarmControl?: Record<string, any>;
  supportedModes?: string[];
}

export interface CardQRConfig extends CardBase {
  type: "cardQR";
  qrCode: string;
  entities: EntityConfig[];
}

export interface CardPowerConfig extends CardBase {
  type: "cardPower";
  entities: EntityConfig[];
  cooldown?: number;
}

export type CardConfig =
  | CardEntitiesConfig
  | CardGridConfig
  | CardThermoConfig
  | CardMediaConfig
  | CardAlarmConfig
  | CardQRConfig
  | CardPowerConfig;

// --- Brightness ---

export interface BrightnessScheduleEntry {
  time: string;
  value: number;
}

export type BrightnessValue = number | string | BrightnessScheduleEntry[];

// --- Sleep override ---

export interface SleepOverride {
  entity: string;
  brightness: number;
}

// --- Screensaver ---

export interface ScreensaverEntityConfig {
  entity: string;
  type?: 0 | 1 | 2 | 3;
  name?: string;
  icon?: string | Record<string, string>;
  color?: number[] | Record<string, number[] | string> | string;
  value?: string;
  [key: string]: any;
}

export interface StatusIconConfig {
  entity: string;
  icon?: string | Record<string, string>;
  color?: number[] | Record<string, number[] | string> | string;
  altFont?: boolean;
}

export type RGBColor = [number, number, number];

export interface ScreensaverTheme {
  background?: RGBColor;
  time?: RGBColor;
  timeAMPM?: RGBColor;
  date?: RGBColor;
  tMainText?: RGBColor;
  tForecast1?: RGBColor;
  tForecast2?: RGBColor;
  tForecast3?: RGBColor;
  tForecast4?: RGBColor;
  tForecast1Val?: RGBColor;
  tForecast2Val?: RGBColor;
  tForecast3Val?: RGBColor;
  tForecast4Val?: RGBColor;
  bar?: RGBColor;
  tMainTextAlt2?: RGBColor;
  tTimeAdd?: RGBColor;
}

export interface ScreensaverConfig {
  entity?: string;
  entities?: ScreensaverEntityConfig[];
  statusIcon1?: StatusIconConfig;
  statusIcon2?: StatusIconConfig;
  doubleTapToUnlock?: boolean;
  theme?: ScreensaverTheme;
  defaultCard?: string;
  key?: string;
  type?: "screensaver" | "screensaver2";
  [key: string]: any;
}

// --- Panel config ---

export interface PanelConfig {
  panelRecvTopic: string;
  panelSendTopic: string;
  model?: Model;
  updateMode?: UpdateMode;
  sleepTimeout?: number;
  sleepBrightness?: BrightnessValue;
  screenBrightness?: BrightnessValue;
  sleepTracking?: string;
  sleepTrackingZones?: string[];
  sleepOverride?: SleepOverride;
  locale?: string;
  dateFormatBabel?: string;
  timeFormat?: string;
  dateFormat?: string;
  dateAdditionalTemplate?: string;
  timeAdditionalTemplate?: string;
  timezone?: string;
  defaultBackgroundColor?: BackgroundColor;
  "displayURL-EU"?: string;
  "displayURL-US-L"?: string;
  "displayURL-US-P"?: string;
  berryURL?: string;
  [key: string]: any;
}

// --- Full panel data (as returned by get_panel / sent to save_panel) ---

export interface PanelData {
  config: PanelConfig;
  cards: CardConfig[];
  hiddenCards: CardConfig[];
  screensaver: ScreensaverConfig;
}

// --- Panel summary (from list_panels) ---

export interface PanelSummary {
  model: string;
  card_count: number;
  hidden_card_count: number;
  has_screensaver: boolean;
}

// --- Helpers ---

export function getEntityDomainsForCard(cardType: CardType): string[] {
  switch (cardType) {
    case "cardQR":
      return ENTITY_DOMAINS_CARD_QR;
    case "cardPower":
      return ["sensor"];
    case "cardThermo":
      return ["climate"];
    case "cardMedia":
      return ["media_player"];
    case "cardAlarm":
      return ["alarm_control_panel"];
    default:
      return ENTITY_DOMAINS_CARD_ENTITIES;
  }
}

export function createDefaultCard(type: CardType): CardConfig {
  switch (type) {
    case "cardEntities":
      return { type, entities: [] };
    case "cardGrid":
      return { type, entities: [] };
    case "cardThermo":
      return { type, entity: "" };
    case "cardMedia":
      return { type, entity: "" };
    case "cardAlarm":
      return { type, entity: "" };
    case "cardQR":
      return { type, qrCode: "", entities: [] };
    case "cardPower":
      return { type, entities: [] };
  }
}

export function createDefaultEntity(): EntityConfig {
  return { entity: "" };
}

export function createDefaultPanelConfig(): PanelConfig {
  return {
    panelRecvTopic: "cmnd/tasmota_your_mqtt_topic/CustomSend",
    panelSendTopic: "tele/tasmota_your_mqtt_topic/RESULT",
    model: "eu",
    updateMode: "auto-notify",
    locale: "en_US",
  };
}

export function createDefaultPanelData(): PanelData {
  return {
    config: createDefaultPanelConfig(),
    cards: [],
    hiddenCards: [],
    screensaver: {},
  };
}
