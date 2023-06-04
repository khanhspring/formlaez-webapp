import { RefObject, useEffect } from "react";

export type Options = {
  container?: RefObject<any>;
  maxWidth?: number;
  autoWidth?: boolean;
  autoHeight?: boolean;
};

const useAutoSizeTextarea = (
  textarea?: HTMLTextAreaElement | null,
  options: Options = {}
) => {
  const { container, maxWidth, autoWidth, autoHeight } = options;

  useEffect(() => {
    function detectSize() {
      if (!textarea) {
        return;
      }

      const span = createHiddenSpan();
      copyStyles(textarea, span);
      span.innerHTML = textarea.value || textarea.placeholder;
      textarea.style.height = "";
      textarea.style.overflow = "hidden";

      if (autoWidth) {
        const maxWidthVal = getMaxWidth(container, maxWidth);
        const spanWidth = span.offsetWidth;
        if (maxWidthVal && spanWidth > maxWidthVal) {
          textarea.style.minWidth = maxWidthVal + "px";
          textarea.style.width = maxWidthVal + "px";
        } else {
          textarea.style.minWidth = spanWidth + 1 + "px";
          textarea.style.width = spanWidth + 1 + "px";
        }
      }

      if (autoHeight) {
        const textareaContentHeight = textarea.scrollHeight;
        textarea.style.height = textareaContentHeight + "px";
      }

      span.parentNode?.removeChild(span);
    }

    document.addEventListener("input", detectSize);
    window.addEventListener("resize", detectSize);
    setTimeout(detectSize);

    return () => {
      document.removeEventListener("input", detectSize);
      window.removeEventListener("resize", detectSize);
    };
  }, [autoWidth, autoHeight, container, maxWidth, textarea]);
};

const getMaxWidth = (
  container?: RefObject<any>,
  maxWidth?: number
): number | undefined => {
  if (!maxWidth && !container) {
    return;
  }
  if (container) {
    return container.current.offsetWidth;
  }
  return maxWidth;
};

const createHiddenSpan = () => {
  const span = document.createElement("span");
  span.style.visibility = "hidden";
  span.style.position = "fixed";
  span.style.whiteSpace = "pre";
  document.body.appendChild(span);
  return span;
};

const copyStyles = (source: HTMLElement, target: HTMLElement) => {
  const styles = window.getComputedStyle(source);
  if (!styles) {
    return;
  }
  target.style.fontSize = styles.fontSize;
  target.style.fontFamily = styles.fontFamily;
  target.style.fontWeight = styles.fontWeight;
  target.style.fontStyle = styles.fontStyle;
  target.style.letterSpacing = styles.letterSpacing;
  target.style.textTransform = styles.textTransform;
  target.style.padding = styles.padding;
  target.style.border = styles.border;
};

export default useAutoSizeTextarea;
