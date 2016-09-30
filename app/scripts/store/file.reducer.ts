import { FileActions } from '../actions/file.actions'

export interface IFile {
  name?: string,
  title?: string,
  path?: string,
  content?: string,
  isFile?: boolean
}

const defaultState = {
  files: []
}

export function fileReducer (state = defaultState, action) {
  switch (action.type) {
    case FileActions.RECEIVE_ROOT_FILES:
      return Object.assign({}, state, {
        files: action.payload.files
      })
    case FileActions.RECEIVE_CURRENT_FILE:
      return Object.assign({}, state, {
        currentFile: action.payload.data
      })
    default:
      return state
  }
}
