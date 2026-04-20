import { sql } from "@codemirror/lang-sql"
import { EditorView } from "@codemirror/view"

export const editorTheme = EditorView.theme({
  "&": {
    height: "100%",
    backgroundColor: "transparent",
  },
  ".cm-scroller": {
    fontFamily: "'Geist Variable', sans-serif",
    lineHeight: "1.65",
  },
  ".cm-gutters": {
    backgroundColor: "transparent",
    color: "rgba(255,255,255,0.28)",
    border: "none",
  },
  ".cm-activeLine": {
    backgroundColor: "rgba(255,255,255,0.04)",
  },
  ".cm-activeLineGutter": {
    backgroundColor: "transparent",
  },
  ".cm-selectionBackground, &.cm-focused .cm-selectionBackground": {
    backgroundColor: "rgba(255,255,255,0.16)",
  },
  ".cm-cursor, .cm-dropCursor": {
    borderLeftColor: "rgba(255,255,255,0.72)",
  },
  ".cm-content": {
    whiteSpace: "pre-wrap",
    overflowWrap: "anywhere",
  },
})

export const editorExtensions = [editorTheme, EditorView.lineWrapping]
export const sqlEditorExtensions = [editorTheme, EditorView.lineWrapping, sql()]
