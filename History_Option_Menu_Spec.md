# History Page — Option Menu Spec

## More Button Visibility

Controlled by `data-status` on the row. `isDone` is derived from status, not the Done badge (which is removed from the DOM after the user first taps an item).

| `data-status` | More Button |
|---|---|
| `proc` (Generating) | Hidden |
| `failed` | Shown |
| *(none — completed)* | Shown |

---

## Option Menu Content by Type × Status

| Type | Status | CTA Row | Options |
|---|---|---|---|
| **MV** | Completed | — | Like / Unlike, Share, Download, **Delete** |
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

---

## CTA Actions

| CTA | Destination |
|---|---|
| Create MV (Song) | MV Style Select screen |
| Create MV (Storyboard) | Edit Storyboard screen |
| Get Proof | Proof of Creation screen |

---

## Option Actions

| Option | Behaviour |
|---|---|
| Like | Marks row as liked; label switches to "Unlike" |
| Unlike | Removes liked state; label reverts to "Like" |
| Share | Closes menu (action TBD) |
| Publish (toggle) | ON → "Published success" toast + hides Delete live; OFF → "Unpublished success" toast + shows Delete live |
| Download | Closes menu (action TBD) |
| Delete | Opens confirmation dialog → confirm removes row from list |

---

## Tab Visibility (History Filter Tabs)

| Tab | Shows |
|---|---|
| All | All types |
| Music Videos | MV + Storyboard |
| Songs | Song only |
| Liked | Any type with `data-liked="true"` |
