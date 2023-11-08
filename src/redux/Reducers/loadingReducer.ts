const inisialState = false

export const loadingReducer = (state = inisialState, action: any) =>{
  switch (action.type) {
    case 'SET_LOADING':
      return action.payload
    default:
      return state
  }
}