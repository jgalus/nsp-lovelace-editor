/**
 * Ensure Home Assistant frontend components (like ha-entity-picker) are loaded.
 *
 * HA lazy-loads many web-components; custom panels need to trigger the load
 * explicitly.  `loadCardHelpers()` is the de-facto standard way custom
 * integrations achieve this.
 */
export async function loadHaComponents(): Promise<void> {
  // loadCardHelpers is injected by the HA frontend and triggers loading of
  // card-related web-components (entity-picker, icon-picker, etc.)
  if ((window as any).loadCardHelpers) {
    try {
      await (window as any).loadCardHelpers();
    } catch {
      // ignore – fallback picker will be used
    }
  }
}
