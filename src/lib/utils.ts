
export const smoothScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, href: string) => {
  e.preventDefault();

  const targetId = href.replace(/^#/, "");

  const element = document.getElementById(targetId);
  if (element) {
    element.scrollIntoView({ 
      behavior: "smooth",
      block: "start"
    });
  }
};