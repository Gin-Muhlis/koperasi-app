"use client";
import Swal from 'sweetalert2';

import { useEffect } from 'react'

const SweetAlertPopup = ({status, message, resetState, confirmText}: {status: number | boolean, message: string, resetState: () => void, confirmText?: string}) => {
    useEffect(() => {
        Swal.fire({
          html: `<strong>${message}</strong>`,
          icon: status === 200 ? 'success' : 'error',
          showConfirmButton: true,
          confirmButtonText: confirmText ?? 'Oke'
        }).then((result) => {
          if (result.isConfirmed) {
            resetState()
          }
        });
      }, [status]);
    
      return null;
}

export default SweetAlertPopup