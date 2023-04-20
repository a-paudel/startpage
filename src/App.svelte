<script lang="ts">
  import { onMount } from "svelte";
  import { StoreImageFetchDate, StoreImageUrl } from "./stores";

  async function refetchImage() {
    let resp = await fetch("https://picsum.photos/1920/1080");
    let today = new Date(new Date().toISOString().substring(0, 10));
    $StoreImageUrl = resp.url;
    $StoreImageFetchDate = today.toISOString();
  }
  async function checkImage() {
    if ($StoreImageUrl === "") {
      refetchImage();
      return;
    }
    let fetchDate = new Date(
      new Date($StoreImageFetchDate).toISOString().substring(0, 10)
    );
    let today = new Date(new Date().toISOString().substring(0, 10));
    if (fetchDate < today) {
      refetchImage();
    }
  }
  let backgroundDiv: HTMLDivElement;
  $: {
    if (backgroundDiv) {
      backgroundDiv.style.backgroundImage = `url(${$StoreImageUrl})`;
    }
  }

  let searchTerm = "";
  function searchHandler() {
    let url =
      "https://www.google.com/search?q=" + encodeURIComponent(searchTerm);

    location.href = url;
  }

  onMount(() => {
    checkImage();
  });
</script>

<svelte:head>
  <title>Start Page</title>
  <!-- <link rel="stylesheet" href=""> -->
</svelte:head>

<div class="overflow-hidden fixed top-0 left-0 h-screen w-screen">
  <div
    bind:this={backgroundDiv}
    class="
    h-full w-full
      bg-dark
      blur scale-105
  "
  />
</div>

<div class="flex flex-col items-center h-screen justify-center">
  <div
    class="flex flex-col items-center justify-center bg-dark-1 w-3/4 hfit pb6 rounded-3xl z2 shadow-2xl"
  >
    <!-- svelte-ignore a11y-autofocus -->
    <h1 class="z2 text-6xl text-dark-4 select-none">Search</h1>
    <input
      autofocus
      type="text"
      class="p4 z2 rounded-xl w-3/4 bg-dark-3 border-none shadow-lg shadow-inset text-light focus:outline-none"
      bind:value={searchTerm}
      on:change={searchHandler}
    />
  </div>
</div>

<button
  class="
  bg-transparent fixed top-1 right-1 rounded-full aspect-square border-none p2
  hover:bg-dark-1 hover:text-light transition duration-500 cursor-pointer
  "
  title="refresh image"
  on:click={refetchImage}
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="currentColor"
    class="w-6 h-6"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
    />
  </svg>
</button>
