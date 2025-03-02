import { defaultKeymap, history, historyKeymap } from '@codemirror/commands'
import { type EditorSelection, EditorState } from '@codemirror/state'
import { keymap } from '@codemirror/view'
import { toCodeMirror } from './adapters/selections'
import { buildVendors } from '/src/extensions'
import { blockquote } from '/src/vendor/extensions/blockquote'
import { code } from '/src/vendor/extensions/code'
import { ink } from '/src/vendor/extensions/ink'
import { lineWrapping } from '/src/vendor/extensions/line_wrapping'
import { theme } from '/src/vendor/extensions/theme'
import type * as Ink from '/types/ink'
import type InkInternal from '/types/internal'

const toVendorSelection = (selections: Ink.Editor.Selection[]): EditorSelection | undefined => {
  if (selections.length > 0)
    return toCodeMirror(selections)
}

export const makeState = ([state, setState]: InkInternal.Store): InkInternal.Vendor.State => {
  return EditorState.create({
    doc: state().options.doc,
    selection: toVendorSelection(state().options.selections),
    extensions: [
      keymap.of([
        ...defaultKeymap,
        ...historyKeymap,
      ]),
      blockquote(),
      code(),
      history(),
      ink(),
      lineWrapping(),
      theme(),
      ...buildVendors([state, setState]),
    ],
  })
}
