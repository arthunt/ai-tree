import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Dendrix.ai — AI Knowledge Tree',
    short_name: 'Dendrix',
    description: 'Learn AI concepts through an interactive tree of knowledge. From fundamentals to cutting-edge research.',
    start_url: '/et',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#3b82f6',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
