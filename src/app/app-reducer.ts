export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

//status === loading - show progress bar
//status === idle | succceeded | failed - hide progress bar

const initialState = {
    status: 'idle' as RequestStatusType
}

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        default:
            return state
    }
}

export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status } as const)

export type setAppStatusActionType = ReturnType<typeof setAppStatusAC>


type ActionsType = setAppStatusActionType