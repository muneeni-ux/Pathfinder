import React from "react";
import toast from "react-hot-toast";
import { CheckCircle2, XCircle, Info, Loader2 } from "lucide-react";

const base = {
  duration: 4500,
};

export function success(message, opts = {}) {
  return toast.success(
    message,
    Object.assign(
      {
        icon: <CheckCircle2 className="w-5 h-5 text-white" />,
      },
      base,
      opts,
    ),
  );
}

export function error(message, opts = {}) {
  return toast.error(
    message,
    Object.assign(
      {
        icon: <XCircle className="w-5 h-5 text-white" />,
      },
      base,
      opts,
    ),
  );
}

export function info(message, opts = {}) {
  return toast(message, Object.assign({ icon: <Info className="w-5 h-5 text-white" /> }, base, opts));
}

export function loading(message = "Loading...", opts = {}) {
  return toast.loading(
    message,
    Object.assign(
      {
        icon: <Loader2 className="w-5 h-5 text-white animate-spin" />,
        duration: Infinity,
      },
      opts,
    ),
  );
}

export default { success, error, info, loading };
