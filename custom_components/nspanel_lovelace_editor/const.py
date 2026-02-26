"""Constants for the NSPanel Lovelace Editor integration."""
import logging

DOMAIN = "nspanel_lovelace_editor"
NAME = "NSPanel Lovelace Editor"
LOGGER = logging.getLogger(__package__)

CONF_APPDAEMON_PATH = "appdaemon_path"
DEFAULT_APPDAEMON_PATH = "/config/appdaemon/apps/apps.yaml"

# Candidate paths for auto-detecting AppDaemon apps.yaml across deployment modes
APPDAEMON_PATH_CANDIDATES = [
    # HA OS / Supervised addon (standard addon config path)
    "/addon_configs/a0d7b954_appdaemon/apps/apps.yaml",
    # HA OS / Supervised addon (legacy path)
    "/config/appdaemon/apps/apps.yaml",
    # Alternative HA config location
    "/homeassistant/appdaemon/apps/apps.yaml",
]

CARD_TYPES = [
    "cardEntities",
    "cardGrid",
    "cardThermo",
    "cardMedia",
    "cardAlarm",
    "cardQR",
    "cardPower",
]

MODELS = ["eu", "us-l", "us-p"]

UPDATE_MODES = ["auto", "auto-notify", "manual"]

BACKGROUND_COLORS = ["ha-dark", "black"]

SCREENSAVER_TYPES = ["screensaver", "screensaver2"]

# Entity domains supported by cardEntities and cardGrid
ENTITY_DOMAINS_CARD_ENTITIES = [
    "cover",
    "switch",
    "input_boolean",
    "binary_sensor",
    "sensor",
    "button",
    "number",
    "input_number",
    "scene",
    "script",
    "input_button",
    "light",
    "input_text",
    "input_select",
    "lock",
    "fan",
    "automation",
    "alarm_control_panel",
    "sun",
    "person",
    "climate",
]

# cardQR supports a reduced subset
ENTITY_DOMAINS_CARD_QR = [
    "switch",
    "input_boolean",
    "binary_sensor",
    "sensor",
    "button",
    "scene",
    "script",
    "input_button",
    "input_select",
    "light",
    "input_text",
    "lock",
    "automation",
]

# Screensaver theme color keys
SCREENSAVER_THEME_KEYS = [
    "background",
    "time",
    "timeAMPM",
    "date",
    "tMainText",
    "tForecast1",
    "tForecast2",
    "tForecast3",
    "tForecast4",
    "tForecast1Val",
    "tForecast2Val",
    "tForecast3Val",
    "tForecast4Val",
    "bar",
    "tMainTextAlt2",
    "tTimeAdd",
]

# Supported locales
LOCALES = [
    ("af_ZA", "Afrikaans"),
    ("ar_SY", "Arabic"),
    ("bg_BG", "Bulgarian"),
    ("ca_ES", "Catalan"),
    ("cs_CZ", "Czech"),
    ("da_DK", "Danish"),
    ("de_DE", "German"),
    ("el_GR", "Greek"),
    ("en_US", "English"),
    ("es_ES", "Spanish"),
    ("et_EE", "Estonian"),
    ("fa_IR", "Persian"),
    ("fi_FI", "Finnish"),
    ("fr_FR", "French"),
    ("he_IL", "Hebrew"),
    ("hr_xx", "Croatian"),
    ("hu_HU", "Hungarian"),
    ("hy_AM", "Armenian"),
    ("id_ID", "Indonesian"),
    ("is_IS", "Icelandic"),
    ("it_IT", "Italian"),
    ("lb_xx", "Luxembourgish"),
    ("lt_LT", "Lithuanian"),
    ("lv_LV", "Latvian"),
    ("nb_NO", "Norwegian"),
    ("nl_NL", "Dutch"),
    ("nn_NO", "Norwegian Nynorsk"),
    ("pl_PL", "Polish"),
    ("pt_PT", "Portuguese"),
    ("ro_RO", "Romanian"),
    ("ru_RU", "Russian"),
    ("sk_SK", "Slovak"),
    ("sl_SI", "Slovenian"),
    ("sv_SE", "Swedish"),
    ("th_TH", "Thai"),
    ("tr_TR", "Turkish"),
    ("uk_UA", "Ukrainian"),
    ("vi_VN", "Vietnamese"),
    ("zh_CN", "Simplified Chinese"),
    ("zh_TW", "Traditional Chinese"),
]
