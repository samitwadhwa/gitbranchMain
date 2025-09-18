import { useEffect } from "react";
import { useRouter } from "next/router";
import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/global.css";
import "@/styles/login.css";
import "@/styles/sidebar.css";
import "@/styles/index.css";
import "@/styles/dashboard.css";
import "@/styles/reportone.css";
import "@/styles/adduser.css";
import "@/styles/allreport.css";
import "@/styles/settlement.css";
import "@/styles/transaction.css";
import "@/styles/report.css";
import "@/styles/Qrcode.css";
import "@/styles/accountsetting.css";
// import '@/styles/minereport.css';
import Toast from "../components/Toast";
import Head from "next/head";
import BootstrapJSLoader from "@/components/BootstrapJsLoader";
import "@fortawesome/fontawesome-svg-core/styles.css";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  useEffect(() => {
    if (router.isReady) {
      // set true in localStorage for the current path
      localStorage.setItem(router.pathname, "true");
    }
  }, [router.isReady, router.pathname]);
  return (
    <>
      <BootstrapJSLoader />
      <Toast />

      <Head>
        <link
          href="https://cdn.jsdelivr.net/npm/remixicon@2.5.0/fonts/remixicon.css"
          rel="stylesheet"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        {/* <link rel="preconnect" href="https://fonts.googleapis.com">
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin> */}
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
