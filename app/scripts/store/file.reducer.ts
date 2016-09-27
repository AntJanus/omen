import { FileActions } from '../actions/file.actions'

export interface IFile {
  name?: string,
  title?: string,
  path?: string,
  content?: string
}

const defaultState: IFile[] = []

export function fileReducer (state = defaultState, action) {
  switch (action.type) {
    case FileActions.RECEIVE_ROOT_FILES:
      return action.payload.files
    default:
      return state
  }
}
