<template>
  <div class="container mx-auto px-4 py-8 md:p-8">
    <h1 class="text-4xl font-bold mb-8 text-center">Explore Koh Tao Tours</h1>
    <div class="grid grid-cols-1 gap-6">
      <div v-for="tour in tours" :key="tour.id" class="bg-white shadow-lg rounded-lg">
        <img class="w-full h-64 object-cover rounded-t-lg" :src="tour.image" :alt="tour.title" />
        <div class="p-6">
          <h2 class="font-bold text-2xl mb-2">{{ tour.title }}</h2>
          <p class="text-gray-700 text-base">{{ tour.description }}</p>
          <button class="mt-4 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Book Now
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tours: [
        {
          id: 1,
          title: 'Tour Title 1',
          image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0c/a7/4c/45/koh-tao-thailand1-largejpg.jpg?w=1200&h=1200&s=1',
          description: 'This is the description for Tour 1.',
        },
        {
          id: 2,
          title: 'Tour Title 2',
          image: '/path/to/image2.jpg',
          description: 'This is the description for Tour 2.',
        },
        {
          id: 3,
          title: 'Tour Title 3',
          image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/29/68/e3/5c/caption.jpg?w=300&h=300&s=1',
          description: 'This is the description for Tour 3.',
        },
        {
          id: 4,
          title: 'Tour Title 4',
          image: '/path/to/image4.jpg',
          description: 'This is the description for Tour 4.',
        },
        {
          id: 5,
          title: 'Tour Title 5',
          image: '/path/to/image5.jpg',
          description: 'This is the description for Tour 5.',
        },
        {
          id: 6,
          title: 'Tour Title 6',
          image: '/path/to/image6.jpg',
          description: 'This is the description for Tour 6.',
        },
        {
          id: 7,
          title: 'Tour Title 7',
          image: '/path/to/image7.jpg',
          description: 'This is the description for Tour 7.',
        },
        {
          id: 8,
          title: 'Tour Title 8',
          image: '/path/to/image8.jpg',
          description: 'This is the description for Tour 8.',
        },
        {
          id: 9,
          title: 'Tour Title 9',
          image: '/path/to/image9.jpg',
          description: 'This is the description for Tour 9.',
        },
        {
          id: 10,
          title: 'Tour Title 10',
          image: '/path/to/image10.jpg',
          description: 'This is the description for Tour 10.',
        },
      ],
    };
  },
};
</script>
