import * as React from "react"

const TOAST_LIMIT = 1
const TOAST_REMOVE_DELAY = 1000000 // Keep toasts visible until manually dismissed

let count = 0

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER
  return count
}

function reducer(state, action) {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      }

    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      }

    case "DISMISS_TOAST":
      const { toastId } = action

      // ! Side effects ! - Should use a queue for this
      if (toastId) {
        memoryState.toasts = state.toasts.map((t) =>
            t.id === toastId ? { ...t, open: false } : t
          )
      } else {
        memoryState.toasts = state.toasts.map((t) => ({ ...t, open: false }))
      }

      return { ...state, toasts: [] }

    case "REMOVE_TOAST":
      const { toastId: removeToastId } = action

      if (removeToastId) {
        return {
          ...state,
          toasts: state.toasts.filter((t) => t.id !== removeToastId),
        }
      } else {
        return { ...state, toasts: [] }
      }
    default:
      return state
  }
}

const listeners = []
let memoryState = { toasts: [] }

function dispatch(action) {
  memoryState = reducer(memoryState, action)
  listeners.forEach((listener) => {
    listener(memoryState)
  })
}

function useToast() {
  const [state, setState] = React.useState(memoryState)

  React.useEffect(() => {
    listeners.push(setState)
    return () => {
      const index = listeners.indexOf(setState)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }, [state])

  const toast = React.useCallback((props) => {
    const id = genId()

    const update = (props) =>
      dispatch({
        type: "UPDATE_TOAST",
        toast: { ...props, id },
      })
    const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id })

    dispatch({
      type: "ADD_TOAST",
      toast: {
        ...props,
        id,
        open: true,
        onOpenChange: (open) => {
          if (!open) dismiss()
        },
      },
    })

    return { id, update, dismiss }
  }, [])

  return {
    ...state,
    toast,
  }
}

export { useToast, reducer as toastReducer };
