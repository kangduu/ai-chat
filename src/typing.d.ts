declare global {
  interface Window {
    nosugar: {
      readonly [key: string]: any;
    };

  }
}
