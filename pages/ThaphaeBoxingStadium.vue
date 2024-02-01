<template>

<section class="py-6">
<div class="p-4 font-sans">
    <div class="max-w-2xl mx-auto">
        <h1 class="text-2xl font-bold mb-4">Thaphae boxing stadium  Chiang Mai </h1>
        
        <div id="expandable-text" class="mb-2" :class="{ 'line-clamp-3': !isExpanded }" @click="isExpanded = !isExpanded">
            <p>Thaphae Stadium in Chiang Mai, Thailand, is a well-known venue for Muay Thai boxing, a traditional martial art that has grown into a popular sport both in Thailand and internationally. Muay Thai, often referred to as "The Art of Eight Limbs," utilizes a combination of fists, elbows, knees, and shins during fights, making it a distinct and dynamic combat sport.</p>

            <p>Thaphae Stadium holds regular Muay Thai events, attracting both local and international fighters. It's a place where Muay Thai enthusiasts and tourists alike can experience the excitement and intensity of live Muay Thai bouts. The atmosphere in the stadium during these events is often electric, with live commentary and a crowd passionately supporting their favorite fighters.</p>

            <p>The stadium is also known for its accessibility to tourists. Located in the heart of Chiang Mai, near the famous Thaphae Gate</p>
    </div>
        
        <div class="flex flex-col items-center justify-center mt-8">
            <img src="~/assets/ThaphaeBoxingStadium/chiangmaiboxing_thaphaestadium_0.webp" alt=">Thaphae Stadium in Chiang Mai" class="mb-4"/>
            <img src="~/assets/ThaphaeBoxingStadium/chiangmaiboxing_thaphaestadium_1.webp" alt="Thaiboxing traditional martial art " class="mb-4"/>
        </div>

       
        <up/>
    </div>

</div>

</section>


    
   
</template>




<script setup>

// definePageMeta({
//   layout: 'menuc'
// })
useHead({
  title: 'Thaphae boxing stadium in Chiang Mai',
  meta: [
    { charset: 'UTF-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
    { name: 'description', content: 'Explore the world of Muay Thai Chiang Mai, Experience authentic Thai boxing matches and training .' },
    { name: 'keywords', content: 'Muay Thai, Chiangmai, Thaphae, Thai Boxing, Cultural Immersion, Traditional Martial Art, Fight Nights, Muay Thai Training' }
  ]
});


const isExpanded = ref(false);



</script>

<style>
img {
  max-width: 100%;
  height: auto;
}

#floating-button {
position: fixed;
width: 100%;
bottom: 20px;
z-index: 100;
}

.button-container {
display: flex;
justify-content: center;
align-items: center;
}


.line-clamp-2 {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
}

.expanded {
    -webkit-line-clamp: unset;
}


</style>





