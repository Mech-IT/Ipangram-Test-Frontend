
import state from "../../ValtioStore/store"
import { useSnapshot } from 'valtio';
import { hideToast } from "../../ValtioStore/utils"

const ToastExample = () => {

  const snap = useSnapshot(state)

  setTimeout(() => {
    hideToast()
  }, 3000);

  return (
    <>
      <div className={`position-fixed bottom-0 start-50 translate-middle-x p-3 `} style={{ zIndex: 11 }}>
        <div class={`toast align-items-center text-bg-${snap.toast.error ? "danger" : "success"} border-0 ${snap.toast.open ? "show" : ""}`} role="alert" aria-live="assertive" aria-atomic="true">
          <div class="d-flex">
            <div class="toast-body">
              {snap.toast.message}
            </div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close" onClick={() => hideToast()}></button>
          </div>
        </div>



      </div>
    </>
  );
}

export default ToastExample