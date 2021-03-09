const preload = (href: string, as: string, type: string) => {
  const link: HTMLLinkElement = document.createElement('link');
  link.rel = 'preload';
  link.href = href;
  link.as = as;
  link.type = type;
  link.crossOrigin = 'anonymous';
  document.head.appendChild(link);
}

export default preload;