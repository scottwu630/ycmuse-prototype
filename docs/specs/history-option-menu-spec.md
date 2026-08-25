# History Page — Option Menu Spec

## More Button Visibility

Controlled by `data-status` on the row. `isDone` is derived from status, not the Done badge (which is removed from the DOM after the user first taps an item). Community items (`data-source="community"`) always show the More button.

| `data-status` | More Button |
|---|---|
| `proc` (Generating) | Hidden |
| `failed` | Shown |
| *(none — completed)* | Shown |

---

## Option Menu Content by Type × Status

| Type | Status | CTA Row | Options |
|---|---|---|---|
| **Community** | *(any — Liked tab only)* | — | Like / Unlike, Share |
| **MV** | Completed · Publish OFF | Edit MV | Like / Unlike, Share, Publish (toggle), Download, **Delete** |
| **MV** | Completed · Publish (Review) | Edit MV | Like / Unlike, Share, Publish (Review toggle ON), Download |
| **MV** | Completed · Publish ON | Edit MV | Like / Unlike, Share, Publish (toggle ON), Download |
| **MV** | Failed | — | Delete |
| **MV** | Generating | *(button hidden)* | — |
| **Song** | Completed · Publish OFF | Create MV | Like / Unlike, Share, Publish (toggle), Download, **Delete** |
| **Song** | Completed · Publish ON | Create MV | Like / Unlike, Share, Publish (toggle ON), Download *(Delete hidden)* |
| **Song** | Failed | — | Delete |
| **Song** | Generating | *(button hidden)* | — |
| **Storyboard** | Completed | Create MV | Delete |
| **Storyboard** | Failed | — | Delete |
| **Storyboard** | Generating | *(button hidden)* | — |

> **Publish ↔ Delete live sync:** When the Publish toggle is flipped inside the open menu, the Delete row shows/hides immediately without closing and reopening the menu.

> **MV Publish Confirmation dialog:** Tapping the Publish toggle on an MV (unpublished state) opens a modal — title "Ready to Go Public?", body "Once published, your creation is visible to the community and may be shared on our social channels." — with Cancel and Confirm buttons. Cancel dismisses with no change. Confirm enters the Review state.

> **MV Publish Review state:** Icon = timer, label = "Publish (Review)", toggle ON, Delete hidden. Once review resolves: icon = globe, label = "Publish", "Published success" toast. The menu stays open throughout; all updates happen in place.

---

## CTA Button Style

The CTA row now always renders a single full-width button (Get Proof was removed; see note below):

| CTA | Style |
|---|---|
| Edit MV | Secondary (white) |
| Create MV (Song) | Primary (gradient) |
| Create MV (Storyboard) | Primary (gradient) |

> **Get Proof removed:** The "Get Proof" CTA (MV and Song rows) was removed from the History page's row option menu. The CTA row now holds only Edit MV / Create MV, which fills the full row width since the row is a flex container (no layout change needed). "Get Proof" still exists elsewhere in the app (e.g. the player screen's own options sheet) — this change is scoped to the History page menu only.

---

## CTA Actions

| CTA | Destination |
|---|---|
| Edit MV | MV Edit screen |
| Create MV (Song) | MV Style Select screen |
| Create MV (Storyboard) | Edit Storyboard screen |

---

## Option Actions

| Option | Behaviour |
|---|---|
| Like | Marks row as liked; label switches to "Unlike" |
| Unlike | Removes liked state; label reverts to "Like" |
| Share | Closes menu (action TBD) |
| Publish (toggle) — Song | ON → "Published success" toast + hides Delete live; OFF → "Unpublished success" toast + shows Delete live |
| Publish (toggle) — MV | ON → opens Publish Confirmation dialog → Confirm: icon switches to timer, label becomes "Publish (Review)", Delete hidden; once review completes icon reverts to globe, label becomes "Publish", "Published success" toast. OFF → Delete shown, "Unpublished success" toast |
| Download | Closes menu (action TBD) |
| Delete | Opens confirmation dialog → confirm removes row from list |

---

## Tab Visibility (History Filter Tabs)

| Tab | Shows |
|---|---|
| All | MV, Song, Storyboard (excludes community items) |
| Music Videos | MV + Storyboard (excludes community items) |
| Songs | Song only (excludes community items) |
| Liked | Any type with `data-liked="true"` (includes community items) |
