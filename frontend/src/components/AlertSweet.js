import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export function AlertSweet(message, icon = "error", time = 1700) {
  const Toast = Swal.mixin({
    title: message,
    icon,
    showConfirmButton: false,
    timer: time,
    toast: true,
    position: "top-end",
  });

  Toast.fire();
}
export function AlertLoading(
  message,
  submessage = "",
  icon = "success",
  time = 1700
) {
  const Toast = Swal.mixin({
    title: message,
    timer: time,
    timerProgressBar: true,
    didOpen: () => {
      Swal.showLoading();
    },
  });

  Toast.fire().then(() => {
    AlertSweet(submessage, icon);
  });
}
