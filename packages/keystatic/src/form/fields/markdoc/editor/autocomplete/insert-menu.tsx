import { matchSorter } from 'match-sorter';
import { NodeType } from 'prosemirror-model';
import { Command, EditorState } from 'prosemirror-state';
import { useMemo } from 'react';
import { weakMemoize } from '../utils';
import {
  addAutocompleteDecoration,
  removeAutocompleteDecoration,
  removeAutocompleteDecorationAndContent,
} from './decoration';
import {
  useEditorViewRef,
  useEditorSchema,
  useEditorState,
  useEditorDispatchCommand,
} from '../editor-view';
import { Item } from '../new-primitives';
import { InputRule } from '../inputrules/inputrules';
import { useEditorKeydownListener } from '../keydown';
import { EditorAutocomplete } from './autocomplete';

export type InsertMenuItemSpec = {
  label: string;
  description?: string;
  command: (type: NodeType) => Command;
};

export type WithInsertMenuNodeSpec = {
  insertMenu?: InsertMenuItemSpec[] | InsertMenuItemSpec;
};

export type InsertMenuItem = {
  id: string;
  label: string;
  description?: string;
  forToolbar?: true;
  command: Command;
};

export const insertMenuInputRule: InputRule = {
  pattern: /(?:^|\s)\/$/,
  handler(state, _match, _start, end) {
    return addAutocompleteDecoration(
      state.tr,
      InsertMenu,
      end - 1,
      end,
      undefined
    );
  },
};

const getStateWithoutAutocompleteDecoration = weakMemoize(
  (state: EditorState) => {
    const tr = removeAutocompleteDecorationAndContent(state);
    if (!tr) {
      return { state };
    }
    return { state: state.apply(tr), tr };
  }
);

function wrapInsertMenuCommand(command: Command): Command {
  return (stateWithInsertMenuText, dispatch, view): boolean => {
    const { state, tr } = getStateWithoutAutocompleteDecoration(
      stateWithInsertMenuText
    );
    if (!tr) return false;
    if (dispatch) dispatch(tr);
    return command(state, dispatch, view);
  };
}

function childRenderer(item: InsertMenuItem) {
  return (
    <Item key={item.id} textValue={item.label}>
      {item.label}
    </Item>
  );
}

function InsertMenu(props: { query: string; from: number; to: number }) {
  const viewRef = useEditorViewRef();
  const dispatchCommand = useEditorDispatchCommand();
  const schema = useEditorSchema();
  const editorState = useEditorState();

  const options = useMemo(
    () =>
      matchSorter(schema.insertMenuItems, props.query, {
        keys: ['label'],
      }).filter(option => option.command(editorState)),
    [editorState, schema.insertMenuItems, props.query]
  );

  useEditorKeydownListener(event => {
    if (event.key !== ' ') return false;
    if (options.length === 1) {
      dispatchCommand(wrapInsertMenuCommand(options[0].command));
      return true;
    }
    if (options.length === 0) {
      viewRef.current?.dispatch(removeAutocompleteDecoration(editorState.tr));
    }
    return false;
  });
  return (
    <EditorAutocomplete
      from={props.from}
      to={props.to}
      aria-label="Insert menu"
      items={options}
      children={childRenderer}
      onEscape={() => {
        viewRef.current?.dispatch(removeAutocompleteDecoration(editorState.tr));
      }}
      onAction={key => {
        const option = options.find(option => option.id === key);
        if (!option) return;
        dispatchCommand(wrapInsertMenuCommand(option.command));
      }}
    />
  );
}
