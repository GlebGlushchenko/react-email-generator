export const downloadFile = (content: string, filename: string): void => {
  const element = document.createElement("a");
  element.href = URL.createObjectURL(
    new Blob([content], { type: "text/html" })
  );
  element.download = filename;

  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};
