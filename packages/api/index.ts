


export const FetchCategories = async() =>{
  const res = await fetch('/api/categories');
  if(!res.ok) throw new Error(" Failed load the Categories");
  return res.json;
}

export const FetchTags = async () => {
  const res = await fetch('/api/tags');
  if(!res.ok) throw new Error("Failed to load Tags");
  return res.json;
}



export const FetchBrands = async () => {
  const res = await fetch('/api/brands');
  if(!res.ok) throw new Error("Failed to load brands");
  return res.json;
}

export const fetchSubcategories = async (categoryId: string) => {
  const res = await fetch(`/api/categories/${categoryId}/subcategories`);
  if (!res.ok) throw new Error('Failed to load subcategories');
  return res.json();
};