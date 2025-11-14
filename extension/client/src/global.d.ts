interface Window {
  dataLayer: {
    push: (...args: any[]) => any;
    [key: string]: any;
  };
}