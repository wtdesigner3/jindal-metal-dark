export default function sitemap() {
  const baseUrl = 'https://www.jindalmetals.com';
  
  // Static paths in the project
  const routes = ['', '/about', '/category', '/product', '/csr', '/infrastructure', '/blogs'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' : 'monthly',
    priority: route === '' ? 1.0 : 0.8,
  }));

  return [...routes];
}
