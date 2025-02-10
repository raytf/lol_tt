<script>
  import { grinOpen } from "$assets/emoji/round";
  import sub from "$assets/sprites/sub_old.jpg";
  import { Blackdrop } from "$components/ui";
  import { Lol } from "$components/text";
  import { gameApi } from "$apis";

  let blackdropOpacity = $state(0);

  function onProceed() {
    blackdropOpacity = 100;
    setTimeout(() => {
      $gameApi.fadeScene("/surface?start");
    }, 2222);
  }
</script>

<button onclick={onProceed} class="size-full py-2 px-8 font-serif">
  <div class="size-full bg-white text-black flex flex-col items-center">
    <div class="h-4 w-3/4 bg-red-500 m-2"></div>
    <Lol key="newspaper-heading" class="text-6xl m-2" />
    <Lol key="newspaper-subheading" class="text-4xl m-2" />
    <div class="grid grid-cols-2 gap-8">
      <div class="flex flex-col items-end gap-1">
        <div class="w-[300px] h-[300px] border border-black bg-blue-200 p-2">
          <img src={grinOpen} alt="missing" class="size-full" />
        </div>
      </div>
      <div class="flex justify-start overflow-scroll-y">
        <div class="max-w-[400px] flex flex-col gap-1 text-left">
          <Lol key="newspaper-text-1" />
          <Lol key="newspaper-text-2" />
          <div class="w-[111px] h-[111px] border border-black">
            <img src={sub} alt="missing" class="size-full" />
          </div>
          <Lol key="newspaper-text-3" />
          <!-- <p class="max-h-[150px] blur-[3px]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
            consequat neque est, nec ultrices nisl aliquam vitae. Cras fringilla
            tempor mauris nec pretium. Pellentesque nec cursus mauris. In
            blandit, elit nec tempor imperdiet, arcu enim consequat orci, non
            hendrerit libero erat sed ex. Praesent ultricies metus et porttitor
            dapibus. Nullam et egestas ante. Donec eget odio egestas, porttitor
            augue vel, pulvinar metus. Sed tristique ante vulputate, porttitor
            ligula eget, venenatis nisi. Nunc eget metus quis diam imperdiet
            aliquet maximus sit amet odio. Nulla vestibulum purus ipsum, vitae
            mollis quam feugiat a. Praesent gravida magna a ornare consequat.
            Praesent mollis eu ligula in laoreet. Integer quis lectus id nunc
            lacinia dignissim.
          </p> -->
        </div>
      </div>
    </div>
  </div>
</button>
<Blackdrop
  opacity={blackdropOpacity}
  transitionDuration={2.2}
  class="top-0 flex items-center justify-center pointer-events-none"
>
  <Lol key="years-later" class="text-4xl" />
</Blackdrop>
