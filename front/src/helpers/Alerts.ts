import Swal from 'sweetalert2';

type Nullable<T> = T | null;

export function GenericErrorAlert(
  description: Nullable<string> = null,
  message: Nullable<string> = null,
) {
  Swal.fire({
    title: 'Error',
    text: message || 'An error has occurred',
    icon: 'error',
    confirmButtonText: 'Ok',
    footer: description || '',
  });
}
