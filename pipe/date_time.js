import { units } from "../utils.js";

export function relativeDateTime(date) {
  if (Intl && Intl.RelativeTimeFormat) {
    return getRelativeTime(date);
  }
  return new Date(date).toLocaleDateString('en-US', {timeZone: 'UTC'});
}

var getRelativeTime = (d1, d2 = new Date()) => {
  var elapsed = d1 - d2
  var rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' })

  // "Math.abs" accounts for both "past" & "future" scenarios
  for (var u in units)
    if (Math.abs(elapsed) > units[u] || u == 'second')
      return rtf.format(Math.round(elapsed/units[u]), u)
}
