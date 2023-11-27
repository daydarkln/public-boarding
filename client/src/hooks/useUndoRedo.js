import { useCallback, useState } from "react";

function useUndoRedo(initialState) {
  const [state, setState] = useState(initialState);
  const [undoStack, setUndoStack] = useState([]);
  const [redoStack, setRedoStack] = useState([]);

  const set = useCallback(
    (newState) => {
      setState(newState);
      setUndoStack((stack) => [state, ...stack]);
      setRedoStack([]);
    },
    [state]
  );

  const undo = useCallback(() => {
    if (undoStack.length === 0) return;

    const [previousState, ...rest] = undoStack;
    setState(previousState);
    setUndoStack(rest);
    setRedoStack((stack) => [state, ...stack]);
  }, [undoStack, state]);

  const redo = useCallback(() => {
    if (redoStack.length === 0) return;

    const [nextState, ...rest] = redoStack;
    setState(nextState);
    setRedoStack(rest);
    setUndoStack((stack) => [state, ...stack]);
  }, [redoStack, state]);

  return [state, set, undo, redo];
}

export default useUndoRedo;
