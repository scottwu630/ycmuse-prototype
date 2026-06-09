# History Page — Option Menu Spec

## More Button Visibility

The More button visibility is controlled by `data-status` on the row, not the Done badge. The Done badge is hidden after the user first opens an item (`histMarkPlayed`), but the underlying completed status is preserved in the DOM.

| `data-status` value | More Button |
|---|---|
| `proc` (Generating) | Hidden |
| `failed` | Shown |
| *(none — completed, with or without visible Done badge)* | Shown |

---

## Option Menu Content by Type × Status

"Done" below means the item has completed generation (badge-done present in DOM, even if visually hidden after first play).

| Type | Status | CTA Row | Options |
|---|---|---|---|
| **MV** | Completed (Done / Played) | — | Like / Unlike, Share, Download |
| **MV** | Failed | — | Delete |
| **MV** | Generating | *(button hidden)* | — |
| **Song** | Completed (Done / Played) | Create MV · Get Proof | Like / Unlike, Share, Publish (toggle), Download |
| **Song** | Failed | — | Delete |
| **Song** | Generating | *(button hidden)* | — |
| **Storyboard** | Completed (Done / Played) | Create MV | Delete |
| **Storyboard** | Failed | — | Delete |
| **Storyboard** | Generating | *(button hidden)* | — |

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
| Like | Marks row as liked; label changes to "Unlike" next open |
| Unlike | Removes liked state; label reverts to "Like" |
| Share | Closes menu (action TBD) |
| Publish (toggle) | Toggle ON → "Published success" toast; Toggle OFF → "Unpublished success" toast |
| Download | Closes menu (action TBD) |
| Delete | Opens confirmation dialog → confirm removes row |

---

## Tab Visibility (History Filter Tabs)

| Tab | Shows |
|---|---|
| All | All types |
| Music Videos | MV + Storyboard |
| Songs | Song only |
| Liked | Any type with liked = true |
