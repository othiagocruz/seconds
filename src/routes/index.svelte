<script lang="ts">
  import { browser } from "$app/env";
  import { decreaser } from "$lib/transitions";
  import { onMount } from "svelte";
  $: counter = 175;
  $: counterRef = 175;
  let retract = false;
  let unique = {};
  let intervalId: ReturnType<typeof setInterval>;
  onMount(() => {
    unique = {};
    document.getElementById("seconds")?.focus();
    intervalId = setInterval(() => {
      if (counter > 0) {
        counter--;
      }
    }, 1000);
  });
  $: if (browser) {
    let element = document.getElementById("curtain");
    if (element)
      element.style.transform = `translateY(-${((counter * 100) / counterRef).toFixed(2)}%)`;
  }
</script>

{#key unique}
  <h1 in:decreaser>{counter}</h1>
{/key}
<div id="curtain" class:retract style:transition={retract ? "none" : null} />
<input
  type="text"
  id="seconds"
  bind:value={counter}
  on:keypress={(e) => {
    if (isNaN(parseInt(e.key)) && e.key !== "Backspace") e.preventDefault();
  }}
  on:keyup={(e) => {
    if (counter.toString().trim() === "" || (isNaN(parseInt(e.key)) && e.key !== "Backspace"))
      return false;
    retract = true;
    clearInterval(intervalId);
    counterRef = counter;
    intervalId = setInterval(() => {
      if (counter > 0) {
        counter--;
      }
      retract = false;
    }, 1000);
    unique = {};
  }}
/>
