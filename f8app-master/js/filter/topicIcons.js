const TOPIC_ICONS = {
  default: [require("./img/default/1.png")],
  active: [
    require("./img/active/1.png"),
    require("./img/active/2.png"),
    require("./img/active/3.png"),
    require("./img/active/4.png"),
    require("./img/active/5.png"),
    require("./img/active/6.png"),
    require("./img/active/7.png"),
    require("./img/active/8.png"),
    require("./img/active/9.png"),
    require("./img/active/10.png")
  ]
};

/**
* ==============================================================================
* Get filter list item icons by index and active/default state
* ------------------------------------------------------------------------------
* @param {?string} state Whether to return default or active state icons
* @param {?number} idx Index for varied icons
* @return {number} RN Asset Source format
* ==============================================================================
*/
export function get(state = "default", idx = 0) {
  // sanitize input
  if (!TOPIC_ICONS[state]) {
    return TOPIC_ICONS.default[0];
  }
  // map provided index to the number of available options
  const mappedIndex = (idx + 1) % TOPIC_ICONS[state].length;
  return TOPIC_ICONS[state][mappedIndex];
}
