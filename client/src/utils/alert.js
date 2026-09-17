import Swal from "sweetalert2";

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

export const alertSuccess = (message) =>
  Toast.fire({ icon: "success", title: message });

export const alertError = (message) =>
  Toast.fire({ icon: "error", title: message });

export const alertInfo = (message) =>
  Toast.fire({ icon: "info", title: message });

export const alertWarning = (message) =>
  Toast.fire({ icon: "warning", title: message });

export const confirmDialog = async ({
  title = "Are you sure?",
  text = "This action cannot be undone.",
  confirmText = "Yes, do it",
  cancelText = "Cancel",
  danger = true,
} = {}) => {
  const result = await Swal.fire({
    title,
    text,
    icon: danger ? "warning" : "question",
    showCancelButton: true,
    confirmButtonColor: danger ? "#ef4444" : "#18A66A",
    cancelButtonColor: "#6b7280",
    confirmButtonText: confirmText,
    cancelButtonText: cancelText,
    reverseButtons: true,
  });
  return result.isConfirmed;
};

export const successModal = (title, html) =>
  Swal.fire({
    icon: "success",
    title,
    html,
    confirmButtonColor: "#18A66A",
  });

export const errorModal = (title, html) =>
  Swal.fire({
    icon: "error",
    title,
    html,
    confirmButtonColor: "#ef4444",
  });

export default Swal;
