/** @format */

const copyDataToClipboard = async (report: string) => {
  return navigator.clipboard.writeText(report);
};

export {copyDataToClipboard};
