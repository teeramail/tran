<template>

<section class="py-6">
<div class="p-4 font-sans">
    <div class="max-w-2xl mx-auto">
        <h1 class="text-2xl font-bold mb-4">Loi Kroh Boxing Stadium  Chiang Mai </h1>
        
        <div id="expandable-text" class="mb-2" :class="{ 'line-clamp-3': !isExpanded }" @click="isExpanded = !isExpanded">
            <p>Apart from the fights, the stadium is surrounded by a bustling area filled with bars, restaurants, and street food vendors, making it a lively spot to spend an evening. Visitors can enjoy local Thai cuisine, grab a drink, and immerse themselves in the local culture.</p>

            <p>Loi Kroh Stadium in Chiang Mai, Thailand, is renowned for its vibrant and intense Muay Thai boxing events. Situated in the heart of Chiang Mai, it's a focal point for tourists and locals alike who are eager to experience the traditional martial art of Muay Thai in its homeland. This stadium is not only a venue for thrilling fights but also serves as a training ground for those looking to learn or refine their Muay Thai skills.</p>

            <p>Loi Kroh Stadium hosts fights several times a week, featuring both male and female fighters of various skill levels, from novices to seasoned professionals. The atmosphere on a fight night is electrifying, with crowds cheering on their favorites, accompanied by the rhythmic beating of drums and the melodic strains of the traditional sarama music, which escalates in intensity with the action in the ring.</p>

            <p>The experience of watching a Muay Thai fight at Loi Kroh Stadium is often highlighted as a must-do for anyone visiting Chiang Mai, offering a glimpse into the passion and dedication that defines this sport. Whether you're a Muay Thai enthusiast or just looking for an authentic Thai cultural experience, a visit to Loi Kroh Stadium promises an unforgettable night of entertainment and insight into the world of Thai boxing.</p>  
        
    </div>
        
        <div class="flex flex-col items-center justify-center mt-8">
            <img src="~/assets/LoiKrohStadium/loikroh_fightnight_0.webp" alt=">Loi Kroh Stadium in Chiang Mai" class="mb-4"/>
            <img src="~/assets/LoiKrohStadium/loikroh_Boxing_0.webp" alt="Thaiboxing traditional martial art at LoiKrohStadium " class="mb-4"/>
            <img src="~/assets/LoiKrohStadium/loikroh_bar.webp" alt="Visitors at Loi kroh stadium" class="mb-4"/>
        </div>

       
        <up/>
    </div>

</div>

</section>

    
   
</template>




<script setup>


useHead({
  title: 'Loi Kroh Stadium in Chiang Mai',
  meta: [
    { charset: 'UTF-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
    { name: 'description', content: 'the world of Muay Thai Chiang Mai, Experience authentic Thai boxing matches and training .' },
    { name: 'keywords', content: 'Muay Thai, Chiangmai, Loi Kroh, Thai Boxing, Cultural Immersion, Traditional Martial Art, Fight Nights, Muay Thai Training' }
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





