import { getTrendingGifs } from '@/services/giphyService';
import GifGrid from '@/components/GifGrid';

async function getInitialGifs() {
  try {
    const response = await getTrendingGifs(0);
    return response.data;
  } catch (error) {
    console.error('Error fetching initial GIFs:', error);
    return [];
  }
}

export default async function Home() {
  const initialGifs = await getInitialGifs();
  
  return <GifGrid initialGifs={initialGifs} />;
}
