import { onCLS, onFCP, onFID, onLCP, onTTFB } from "web-vitals";

const reportWebVitals = (metric: any) => {
  console.log(metric);
};

onCLS(reportWebVitals);
onFCP(reportWebVitals);
onFID(reportWebVitals);
onLCP(reportWebVitals);
onTTFB(reportWebVitals);

export default reportWebVitals;
