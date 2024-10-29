<script lang="ts">
  import {
    logAnalyticsEvent,
    onAuthSuccessRedirectPathKey,
  } from "@/utils/index.ts";
  import { onMount } from "svelte";

  onMount(() => {
    logAnalyticsEvent("login/success");

    const redirectPath =
      localStorage.getItem(onAuthSuccessRedirectPathKey) ?? "/";
    localStorage.removeItem(onAuthSuccessRedirectPathKey);
    window.location.replace(redirectPath);
  });
</script>

<p>Redirecting...</p>
