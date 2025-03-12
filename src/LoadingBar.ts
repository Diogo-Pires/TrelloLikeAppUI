import NProgress from "nprogress";
import "nprogress/nprogress.css"; 

NProgress.configure({ showSpinner: false }); 

export const startLoading = () => NProgress.start();
export const stopLoading = () => NProgress.done();