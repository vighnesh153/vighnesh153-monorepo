<script lang="ts">
  import PopupButton from './PopupButton.svelte';

  export let selectedColor: string;
</script>

<PopupButton buttonStyles={`background-color: ${selectedColor}`}></PopupButton>
