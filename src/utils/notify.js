import { toast } from 'react-toastify';

export const notify = (mode, message) => {
  switch (mode) {
    case 'success':
      toast.success(message);
      break;
    case 'error':
      toast.error(message);
      break;
    case 'warning':
      toast.warning(message);
      break;
    case 'info':
      toast.info(message);
      break;
    default:
      toast(message);
      break;
  }
};
