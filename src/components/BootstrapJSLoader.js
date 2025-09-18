import { useEffect } from "react";

const BootstrapJSLoader = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      import("bootstrap/dist/js/bootstrap.bundle.min.js");
    }
  }, []);

  return null;
};

export default BootstrapJSLoader;
