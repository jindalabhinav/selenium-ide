import browserEventListener from 'browser/helpers/EventListener'
import mainEventListener from 'main/helpers/EventListener'

/**
 * Shim from our shape to this event:
 * https://developer.chrome.com/docs/extensions/reference/windows/#event-onRemoved
 */

export type WindowsOnRemoved = [number]

export const browser = browserEventListener<WindowsOnRemoved>()
export const main = mainEventListener<WindowsOnRemoved>()
