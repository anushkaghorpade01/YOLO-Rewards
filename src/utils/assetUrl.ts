export const assetUrl = (relativePath: string) => {
  const normalized = relativePath.startsWith("/") ? relativePath.slice(1) : relativePath;
  return `${import.meta.env.BASE_URL}${normalized}`;
};
