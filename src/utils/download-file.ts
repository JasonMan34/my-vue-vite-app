export const downloadFile = (
  name: string,
  content: string,
  type = 'text/plain'
) => {
  const element = document.createElement('a');
  document.body.appendChild(element);
  element.setAttribute('style', 'display: none');

  const blob = new Blob([content], { type });
  const url = window.URL.createObjectURL(blob);

  element.href = url;
  element.download = name;
  element.click();
  window.URL.revokeObjectURL(url);

  document.body.removeChild(element);
};
