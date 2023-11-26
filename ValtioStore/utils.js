import state from "./store"

export const showToast = (message, error) => {
    state.toast = {
        open: true,
        error: error,
        message: message
    }
}

export const hideToast = () => {
    state.toast = {
        open: false,
        error: false,
        message: ""
    }
}

export const showLoader = () => {
    state.loader={
        open:true
    }
}

export const hideLoader = () => {
    state.loader={
        open:false
    }
}