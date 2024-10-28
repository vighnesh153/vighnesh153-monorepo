<script lang="ts">
  import { onAuthSuccessRedirectPathKey } from "@/utils/index.ts";
  import { onMount } from "svelte";

  onMount(() => {
    const redirectPath =
      localStorage.getItem(onAuthSuccessRedirectPathKey) ?? "/";
    localStorage.removeItem(onAuthSuccessRedirectPathKey);
    window.location.replace(redirectPath);
  });
</script>

<p>Redirecting...</p>
