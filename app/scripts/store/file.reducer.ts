import { FileActions } from '../actions/file.actions'

export interface IFile {
  name?: string,
  title?: string,
  path?: string,
  content?: string
}

export function fileReducer (state: IFile[], action) {
  switch (action.type) {
    case FileActions.RECEIVE_ROOT_FILES:
      return action.payload.files
    default:
      return state
  }
}
