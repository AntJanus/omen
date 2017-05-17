import { FileActions } from '../actions/file.actions'

export interface IFile {
  name?: string,
  title?: string,
  path?: string,
  content?: string,
  isFile?: boolean,
  children?: IFile[],
  openFolder?: boolean
}

const defaultState = {
  files: [],
  currentFile: {},
  savingCurrentFile: false
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
    case FileActions.SAVING_CURRENT_FILE:
      return Object.assign({}, state, {
        savingCurrentFile: true
      })
    case FileActions.SAVED_CURRENT_FILE:
      return Object.assign({}, state, {
        savingCurrentFile: false
      })
    case FileActions.RECEIVE_NEW_FILE:
      return Object.assign({}, state, {
        files: [...state.files, action.payload.data]
      })
    case FileActions.RECEIVE_DIR_FILES:
      var newState = receiveDirFiles(state, action)
      return newState
    default:
      return state
  }
}

export function receiveDirFiles(state, action) {
  var newState = Object.assign({}, state, {
    files: assignChildren(state.files, action.payload.files, action.payload.path)
  })

  console.log('new state', newState)

  return newState
}

export function parsePath(path) {
  return path.split('/')
}

export function assignChildren(files, payload, filePath) {
  var path = parsePath(filePath)
  var currentPath = path.shift()

  console.log('Current', currentPath)
  console.log('Path', path)
  console.log('files', files)
  console.log('payload', payload)
  console.log('filePath', filePath)

  return files.map((file) => {
    if (file.name ===  currentPath && !file.isFile) {
      console.log('Made it!', file);
      var children = file.children || []

      if (path.length > 0) {
        children = assignChildren(children, payload, path.join('/'))
      } else {
        children = payload
      }

      return Object.assign({}, file, { children: [
        ...children
      ]})
    }

    return file
  })
}
