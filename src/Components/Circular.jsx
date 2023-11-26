import * as React from 'react';
import "./circular.css"
import state from "../../ValtioStore/store"
import { useSnapshot } from 'valtio';

const Circular = () => {
  
  const snap = useSnapshot(state)

  return (
    <>
      {snap.loader.open &&
        <div id="spinner">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>}
    </>
  )
}

export default Circular