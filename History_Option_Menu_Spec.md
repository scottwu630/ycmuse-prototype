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
| **MV** | Completed · Publish OFF | Edit MV · Get Proof | Like / Unlike, Share, Publish (toggle), Download, **Delete** |
| **MV** | Completed · Publish (Review) | Edit MV · Get Proof | Like / Unlike, Share, Publish (Review toggle ON), Download |
| **MV** | Completed · Publish ON | Edit MV · Get Proof | Like / Unlike, Share, Publish (toggle ON), Download |
| **MV** | Failed | — | Delete |
| **MV** | Generating | *(button hidden)* | — |
| **Song** | Completed · Publish OFF | Create MV · Get Proof | Like / Unlike, Share, Publish (toggle), Download, **Delete** |
| **Song** | Completed · Publish ON | Create MV · Get Proof | Like / Unlike, Share, Publish (toggle ON), Download *(Delete hidden)* |
| **Song** | Failed | — | Delete |
| **Song** | Generating | *(button hidden)* | — |
| **Storyboard** | Completed | Create MV | Delete |
| **Storyboard** | Failed | — | Delete |
| **Storyboard** | Generating | *(button hidden)* | — |

> **Publish ↔ Delete live sync:** When the Publish toggle is flipped inside the open menu, the Delete row shows/hides immediately without closing and reopening the menu.

> **MV Publish Confirmation dialog:** Tapping the Publish toggle on an MV (unpublished state) opens a modal — "Publish works are public in the app. By publishing, you allow us to share them on social media." — with Cancel and Confirm buttons. Cancel dismisses with no change. Confirm enters the Review state.

> **MV Publish Review state:** Icon = timer, label = "Publish (Review)", toggle ON, Delete hidden. Once review resolves: icon = globe, label = "Publish", "Published success" toast. The menu stays open throughout; all updates happen in place.

---

## CTA Button Style

All CTA row buttons use the **secondary style** (white background, dark text/icon) unless noted:

| CTA | Style |
|---|---|
| Edit MV | Secondary (white) |
| Get Proof (MV) | Secondary (white) |

| Create MV (Song) | Primary (gradient) |
| Get Proof (Song) | Secondary (white) |
| Create MV (Storyboard) | Primary (gradient) |

---

## CTA Actions

| CTA | Destination |
|---|---|
| Edit MV | MV Edit screen |
| Create MV (Song) | MV Style Select screen |
| Create MV (Storyboard) | Edit Storyboard screen |
| Get Proof (MV) | Proof of Creation screen |
| Get Proof (Song) | Proof of Creation screen |

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
| All | All types |
| Music Videos | MV + Storyboard |
| Songs | Song only |
| Liked | Any type with `data-liked="true"` (includes community items) |
