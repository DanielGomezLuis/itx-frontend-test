function toStringArray(value) {
  if (value == null) return [];
  if (Array.isArray(value)) return value.map((v) => String(v));
  return [String(value)];
}

function safeString(value) {
  return value ?? "";
}

function toNumber(value) {
  const n = Number(value);
  return Number.isNaN(n) ? 0 : n;
}

export function normalizeProductListItem(apiProduct) {
  return {
    id: apiProduct.id,
    brand: safeString(apiProduct.brand),
    model: safeString(apiProduct.model),
    price: toNumber(apiProduct.price),
    imgUrl: safeString(apiProduct.imgUrl),
  };
}

export function normalizeProductDetail(apiProduct) {
  return {
    id: apiProduct.id,
    brand: apiProduct.brand ?? "",
    model: apiProduct.model ?? "",
    price: Number(apiProduct.price) || 0,
    imgUrl: apiProduct.imgUrl ?? "",

    cpu: apiProduct.cpu ?? "",
    ram: apiProduct.ram ?? "",
    os: apiProduct.os ?? "",

    displayResolution: apiProduct.displayResolution ?? "",
    displaySize: apiProduct.displaySize ?? "",

    battery: apiProduct.battery ?? "",

    primaryCamera: toStringArray(apiProduct.primaryCamera),
    secondaryCamera: apiProduct.secondaryCmera ?? "",
    dimensions: apiProduct.dimentions ?? "",
    weight: apiProduct.weight ?? "",

    options: {
      colors: apiProduct.options?.colors ?? [],
      storages: apiProduct.options?.storages ?? [],
    },
  };
}
